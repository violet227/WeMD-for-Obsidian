import {
  FuzzySuggestModal,
  MarkdownView,
  Notice,
  Plugin,
  TAbstractFile,
  TFile,
  debounce,
} from "obsidian";
import katexCss from "katex/dist/katex.min.css";
import { DEFAULT_SETTINGS, WemdSettingTab, type WemdSettings } from "./settings";
import { ThemeManager, type WemdTheme } from "./themes";
import { VIEW_TYPE_WEMD, WemdPreviewView } from "./view";
import { preprocessObsidianMarkdown, resolveAssets } from "./obsidianMarkdown";
import { copyHtmlSource, copyToWechat } from "./copy";

const FRONTMATTER_THEME_KEY = "wemd-theme";

class ThemeSuggestModal extends FuzzySuggestModal<WemdTheme> {
  constructor(
    private readonly plugin: WemdPlugin,
    private readonly file: TFile | null,
  ) {
    super(plugin.app);
    this.setPlaceholder("选择 WeMD 主题");
  }

  getItems() {
    return this.plugin.themes.list();
  }

  getItemText(theme: WemdTheme) {
    return theme.isBuiltIn ? theme.name : `${theme.name}（自定义）`;
  }

  onChooseItem(theme: WemdTheme) {
    void this.plugin.setThemeForFile(this.file, theme.id);
  }
}

export default class WemdPlugin extends Plugin {
  settings!: WemdSettings;
  themes!: ThemeManager;
  private fontStyleEl: HTMLStyleElement | null = null;

  async onload() {
    await this.loadSettings();
    this.themes = new ThemeManager(this.app, () => this.settings);

    // Shadow DOM 内的 @font-face 不生效，KaTeX 字体需在文档级注册
    this.fontStyleEl = document.head.createEl("style", {
      attr: { id: "wemd-katex-fonts" },
    });
    this.fontStyleEl.textContent = katexCss;

    this.registerView(VIEW_TYPE_WEMD, (leaf) => new WemdPreviewView(leaf, this));
    this.addSettingTab(new WemdSettingTab(this.app, this));

    this.addRibbonIcon("message-circle", "WeMD 公众号预览", () => {
      void this.activateView();
    });

    this.addCommand({
      id: "open-preview",
      name: "打开公众号预览",
      callback: () => void this.activateView(),
    });

    this.addCommand({
      id: "copy-to-wechat",
      name: "复制当前笔记到公众号",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) void this.copyFile(file, "wechat");
        return true;
      },
    });

    this.addCommand({
      id: "copy-html",
      name: "复制当前笔记的公众号 HTML 源码",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || file.extension !== "md") return false;
        if (!checking) void this.copyFile(file, "html");
        return true;
      },
    });

    this.addCommand({
      id: "switch-theme",
      name: "切换主题",
      callback: () => {
        new ThemeSuggestModal(this, this.app.workspace.getActiveFile()).open();
      },
    });

    const onThemeFileChange = (file: TAbstractFile, oldPath?: string) => {
      if (
        this.themes.isThemeFile(file.path) ||
        (oldPath && this.themes.isThemeFile(oldPath))
      ) {
        this.reloadThemesDebounced();
      }
    };
    this.app.workspace.onLayoutReady(async () => {
      await this.reloadThemes();
      this.registerEvent(this.app.vault.on("create", (f) => onThemeFileChange(f)));
      this.registerEvent(this.app.vault.on("modify", (f) => onThemeFileChange(f)));
      this.registerEvent(this.app.vault.on("delete", (f) => onThemeFileChange(f)));
      this.registerEvent(this.app.vault.on("rename", onThemeFileChange));
    });
  }

  onunload() {
    this.fontStyleEl?.remove();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async updateSettings(patch: Partial<WemdSettings>) {
    const themeAffecting =
      "themeFolder" in patch ||
      "customPrependBasic" in patch ||
      "customCodeTheme" in patch;
    Object.assign(this.settings, patch);
    await this.saveData(this.settings);
    if (themeAffecting) {
      await this.reloadThemes();
    } else {
      this.refreshViews();
    }
    if ("syncScroll" in patch) {
      this.views().forEach((v) => v.rebindScrollSync());
    }
  }

  private reloadThemesDebounced = debounce(() => void this.reloadThemes(), 300, true);

  async reloadThemes() {
    await this.themes.reload();
    this.refreshViews();
  }

  private views(): WemdPreviewView[] {
    return this.app.workspace
      .getLeavesOfType(VIEW_TYPE_WEMD)
      .map((l) => l.view)
      .filter((v): v is WemdPreviewView => v instanceof WemdPreviewView);
  }

  refreshViews() {
    this.views().forEach((v) => v.refresh());
  }

  /** 笔记 frontmatter wemd-theme 优先，其次全局默认 */
  themeIdForFile(file: TFile | null): string {
    if (file) {
      const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
      const value = fm?.[FRONTMATTER_THEME_KEY];
      if (typeof value === "string" && value.trim()) {
        return this.themes.get(value.trim()).id;
      }
    }
    return this.settings.themeId;
  }

  /** 若笔记已有 wemd-theme 则更新它，否则修改全局默认主题 */
  async setThemeForFile(file: TFile | null, themeId: string) {
    const fm = file
      ? this.app.metadataCache.getFileCache(file)?.frontmatter
      : undefined;
    if (file && fm && FRONTMATTER_THEME_KEY in fm) {
      await this.app.fileManager.processFrontMatter(file, (data) => {
        data[FRONTMATTER_THEME_KEY] = themeId;
      });
      // metadataCache 更新是异步的，稍后再刷新避免下拉框回跳
      window.setTimeout(() => this.refreshViews(), 200);
      return;
    }
    await this.updateSettings({ themeId });
  }

  async copyFile(file: TFile, kind: "wechat" | "html", markdown?: string) {
    let source = markdown;
    if (source === undefined) {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      source =
        view?.file === file
          ? view.editor.getValue()
          : await this.app.vault.cachedRead(file);
    }
    const css = this.themes.get(this.themeIdForFile(file)).css;
    const processed = preprocessObsidianMarkdown(this.app, source, file.path);
    const options = {
      showMacBar: this.settings.showMacBar,
      linkToFootnote: this.settings.linkToFootnote,
      tableWrap: this.settings.tableWrap,
      resolveImages: (container: HTMLElement) =>
        resolveAssets(this.app, container, "copy"),
    };
    try {
      if (kind === "wechat") await copyToWechat(processed, css, options);
      else await copyHtmlSource(processed, css, options);
    } catch (e) {
      console.error("[WeMD] 复制失败:", e);
      new Notice(`复制失败: ${e instanceof Error ? e.message : e}`);
    }
  }

  async activateView() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_WEMD)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new Notice("无法打开预览面板");
      return;
    }
    await leaf.setViewState({ type: VIEW_TYPE_WEMD, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
}
