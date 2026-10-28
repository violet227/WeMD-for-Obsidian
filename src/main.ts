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
import { DEFAULT_SETTINGS, MpSettingTab, type MpSettings } from "./settings";
import { ThemeManager, type MpTheme } from "./themes";
import {
  LEGACY_FRONTMATTER_KEY,
  LEGACY_VIEW_TYPE,
  migrateThemeFolder,
  migrateThemeId,
} from "./legacy";
import { VIEW_TYPE_MP, MpPreviewView } from "./view";
import { preprocessObsidianMarkdown, resolveAssets } from "./obsidianMarkdown";
import { copyHtmlSource, copyToWechat } from "./copy";

const FRONTMATTER_THEME_KEY = "mp-theme";

class ThemeSuggestModal extends FuzzySuggestModal<MpTheme> {
  constructor(
    private readonly plugin: MpPlugin,
    private readonly file: TFile | null,
  ) {
    super(plugin.app);
    this.setPlaceholder("选择主题");
  }

  getItems() {
    return this.plugin.themes.list();
  }

  getItemText(theme: MpTheme) {
    return `${theme.name}（${theme.isBuiltIn ? theme.group : "自定义主题"}）`;
  }

  onChooseItem(theme: MpTheme) {
    void this.plugin.setThemeForFile(this.file, theme.id);
  }
}

export default class MpPlugin extends Plugin {
  settings!: MpSettings;
  themes!: ThemeManager;
  private fontStyleEl: HTMLStyleElement | null = null;

  async onload() {
    await this.loadSettings();
    this.themes = new ThemeManager(this.app, () => this.settings);

    // Shadow DOM 内的 @font-face 不生效，KaTeX 字体需在文档级注册
    this.fontStyleEl = document.head.createEl("style", {
      attr: { id: "mp-katex-fonts" },
    });
    this.fontStyleEl.textContent = katexCss;

    this.registerView(VIEW_TYPE_MP, (leaf) => new MpPreviewView(leaf, this));
    this.addSettingTab(new MpSettingTab(this.app, this));

    this.addRibbonIcon("message-circle", "公众号排版预览", () => {
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
      // 早期版本保存在工作区里的预览面板用的是旧类型，换成新类型，否则会显示成空白面板
      for (const leaf of this.app.workspace.getLeavesOfType(LEGACY_VIEW_TYPE)) {
        await leaf.setViewState({ type: VIEW_TYPE_MP, active: false });
      }
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
    // 早期版本的主题 id 带前缀、主题文件夹用旧名，读取时换成现在的值。
    // 库里已经有旧名文件夹的话保留原设置，避免已有的自定义主题找不到。
    const themeId = migrateThemeId(this.settings.themeId);
    // onload 时 vault 索引可能还没建好，直接查文件系统
    const themeFolder = await migrateThemeFolder(
      this.settings.themeFolder,
      DEFAULT_SETTINGS.themeFolder,
      (path) => this.app.vault.adapter.exists(path),
    );
    if (themeId !== this.settings.themeId || themeFolder !== this.settings.themeFolder) {
      this.settings.themeId = themeId;
      this.settings.themeFolder = themeFolder;
      await this.saveData(this.settings);
    }
  }

  async updateSettings(patch: Partial<MpSettings>) {
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

  private views(): MpPreviewView[] {
    return this.app.workspace
      .getLeavesOfType(VIEW_TYPE_MP)
      .map((l) => l.view)
      .filter((v): v is MpPreviewView => v instanceof MpPreviewView);
  }

  refreshViews() {
    this.views().forEach((v) => v.refresh());
  }

  /** 笔记 frontmatter mp-theme（或早期的旧字段名）优先，其次全局默认 */
  themeIdForFile(file: TFile | null): string {
    if (file) {
      const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
      const value = fm?.[FRONTMATTER_THEME_KEY] ?? fm?.[LEGACY_FRONTMATTER_KEY];
      if (typeof value === "string" && value.trim()) {
        return this.themes.get(value.trim()).id;
      }
    }
    return this.settings.themeId;
  }

  /** 若笔记已指定主题则更新它（旧字段名一并换成 mp-theme），否则修改全局默认主题 */
  async setThemeForFile(file: TFile | null, themeId: string) {
    const fm = file
      ? this.app.metadataCache.getFileCache(file)?.frontmatter
      : undefined;
    if (file && fm && (FRONTMATTER_THEME_KEY in fm || LEGACY_FRONTMATTER_KEY in fm)) {
      await this.app.fileManager.processFrontMatter(file, (data) => {
        delete data[LEGACY_FRONTMATTER_KEY];
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
      macDotsImageUrl: this.settings.macDotsImageUrl,
      linkToFootnote: this.settings.linkToFootnote,
      tableWrap: this.settings.tableWrap,
      resolveImages: (container: HTMLElement) =>
        resolveAssets(this.app, container, "copy"),
    };
    try {
      if (kind === "wechat") await copyToWechat(processed, css, options);
      else await copyHtmlSource(processed, css, options);
    } catch (e) {
      console.error("[mp] 复制失败:", e);
      new Notice(`复制失败: ${e instanceof Error ? e.message : e}`);
    }
  }

  async activateView() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_MP)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new Notice("无法打开预览面板");
      return;
    }
    await leaf.setViewState({ type: VIEW_TYPE_MP, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
}
