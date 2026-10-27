import {
  ItemView,
  MarkdownView,
  TFile,
  WorkspaceLeaf,
  debounce,
  setIcon,
} from "obsidian";
import mermaid from "mermaid";
import katexCss from "katex/dist/katex.min.css";
import { createMarkdownParser, processHtml } from "./core";
import { convertLinksToFootnotes } from "./wechat/linkFootnote";
import { getMermaidConfig, getThemedMermaidDiagram } from "./wechat/mermaidConfig";
import { renderTableBlocksForPreview } from "./wechat/wechatTableRenderer";
import { preprocessObsidianMarkdown, resolveAssets } from "./obsidianMarkdown";
import type WemdPlugin from "./main";

export const VIEW_TYPE_WEMD = "wemd-preview";

// 预览外框：模拟手机阅读宽度，白底与公众号一致
const FRAME_CSS = `
:host { display: block; }
.wemd-frame {
  max-width: 420px;
  margin: 12px auto 40px;
  padding: 20px 0;
  background: #fff;
  color: #000;
  color-scheme: light;
  box-shadow: 0 2px 12px rgba(0,0,0,.12);
  border-radius: 8px;
  min-height: 200px;
}
.wemd-frame img { max-width: 100%; }
.wemd-empty { text-align: center; color: #999; padding: 40px 0; font-size: 14px; }
`;

let mermaidInitialized = false;

export class WemdPreviewView extends ItemView {
  private file: TFile | null = null;
  private shadow!: ShadowRoot;
  private themeStyleEl!: HTMLStyleElement;
  private frameEl!: HTMLDivElement;
  private themeSelect!: HTMLSelectElement;
  private renderToken = 0;
  private scrollCleanup: (() => void) | null = null;
  private scrollEl!: HTMLDivElement;

  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: WemdPlugin,
  ) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_WEMD;
  }

  getDisplayText() {
    return "WeMD 预览";
  }

  getIcon() {
    return "message-circle";
  }

  async onOpen() {
    const root = this.contentEl;
    root.empty();
    root.addClass("wemd-view");

    const toolbar = root.createDiv({ cls: "wemd-toolbar" });
    this.themeSelect = toolbar.createEl("select", { cls: "dropdown wemd-theme-select" });
    this.themeSelect.addEventListener("change", () => {
      void this.plugin.setThemeForFile(this.file, this.themeSelect.value);
    });

    const btn = (icon: string, label: string, onClick: () => void) => {
      const el = toolbar.createEl("button", { cls: "clickable-icon", attr: { "aria-label": label } });
      setIcon(el, icon);
      el.addEventListener("click", onClick);
      return el;
    };
    const copyBtn = toolbar.createEl("button", { cls: "mod-cta wemd-copy-btn", text: "复制到公众号" });
    copyBtn.addEventListener("click", () => void this.copy("wechat"));
    btn("code", "复制 HTML 源码", () => void this.copy("html"));
    btn("refresh-cw", "刷新", () => void this.plugin.reloadThemes());

    this.scrollEl = root.createDiv({ cls: "wemd-scroll" });
    const host = this.scrollEl.createDiv();
    this.shadow = host.attachShadow({ mode: "open" });
    const baseStyle = document.createElement("style");
    baseStyle.textContent = FRAME_CSS + "\n" + katexCss;
    this.themeStyleEl = document.createElement("style");
    this.frameEl = document.createElement("div");
    this.frameEl.className = "wemd-frame";
    this.shadow.append(baseStyle, this.themeStyleEl, this.frameEl);

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf?.view instanceof MarkdownView && leaf.view.file) {
          this.setFile(leaf.view.file);
        }
      }),
    );
    this.registerEvent(
      this.app.workspace.on("editor-change", (_editor, info) => {
        if (info.file && info.file === this.file) this.requestRender();
      }),
    );
    this.registerEvent(
      this.app.vault.on("modify", (f) => {
        if (f === this.file) this.requestRender();
      }),
    );
    this.registerEvent(
      this.app.metadataCache.on("changed", (f) => {
        if (f === this.file) this.refreshThemeSelect();
      }),
    );

    const active = this.app.workspace.getActiveViewOfType(MarkdownView);
    const initial = active?.file ?? this.app.workspace.getActiveFile();
    if (initial) this.setFile(initial);
    else this.refresh();
  }

  async onClose() {
    this.scrollCleanup?.();
  }

  private setFile(file: TFile) {
    if (file.extension !== "md") return;
    if (this.file === file) return;
    this.file = file;
    this.bindScrollSync();
    this.refresh();
  }

  private requestRender = debounce(() => void this.render(), 300, true);

  /** 主题 / 设置变化时由插件调用 */
  refresh() {
    this.refreshThemeSelect();
    void this.render();
  }

  private refreshThemeSelect() {
    const current = this.plugin.themeIdForFile(this.file);
    this.themeSelect.empty();
    const groups: [string, ReturnType<typeof this.plugin.themes.list>][] = [
      ["内置主题", this.plugin.themes.builtIns()],
      ["自定义主题", this.plugin.themes.customs()],
    ];
    for (const [label, themes] of groups) {
      if (themes.length === 0) continue;
      const group = this.themeSelect.createEl("optgroup", { attr: { label } });
      themes.forEach((t) => group.createEl("option", { value: t.id, text: t.name }));
    }
    this.themeSelect.value = this.plugin.themes.get(current).id;
  }

  private async readMarkdown(): Promise<string | null> {
    if (!this.file) return null;
    // 优先读编辑器中未保存的内容
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (view instanceof MarkdownView && view.file === this.file) {
        return view.editor.getValue();
      }
    }
    return this.app.vault.cachedRead(this.file);
  }

  private async render() {
    const token = ++this.renderToken;
    const markdown = await this.readMarkdown();
    if (token !== this.renderToken) return;
    if (markdown === null || !this.file) {
      this.frameEl.innerHTML = `<div class="wemd-empty">打开一篇 Markdown 笔记以预览</div>`;
      return;
    }

    const settings = this.plugin.settings;
    const theme = this.plugin.themes.get(this.plugin.themeIdForFile(this.file));
    const source = preprocessObsidianMarkdown(this.app, markdown, this.file.path);
    const parser = createMarkdownParser({
      showMacBar: settings.showMacBar,
      mathRenderer: "katex",
    });
    let html = parser.render(source);
    if (settings.linkToFootnote) html = convertLinksToFootnotes(html);
    // 预览不内联样式，直接注入 style（与 WeMD MarkdownPreview 一致）
    const styled = processHtml(html, theme.css, false);

    const scrollTop = this.scrollEl.scrollTop;
    this.themeStyleEl.textContent = theme.css;
    this.frameEl.innerHTML = styled;
    await resolveAssets(this.app, this.frameEl, "preview");
    renderTableBlocksForPreview(this.frameEl, settings.tableWrap);
    this.scrollEl.scrollTop = scrollTop;
    await this.renderMermaid(token);
  }

  private async renderMermaid(token: number) {
    const blocks = Array.from(this.frameEl.querySelectorAll<HTMLElement>("pre.mermaid"));
    if (blocks.length === 0) return;
    if (!mermaidInitialized) {
      mermaid.initialize({ startOnLoad: false });
      mermaidInitialized = true;
    }
    const config = getMermaidConfig(undefined);
    for (const [index, block] of blocks.entries()) {
      const diagram = block.textContent ?? "";
      if (!diagram.trim()) continue;
      try {
        const { svg } = await mermaid.render(
          `wemd-preview-${token}-${index}`,
          getThemedMermaidDiagram(diagram, config),
        );
        if (token !== this.renderToken) return;
        block.innerHTML = svg;
      } catch (e) {
        console.error("[WeMD] Mermaid render error:", e);
      }
    }
  }

  private async copy(kind: "wechat" | "html") {
    const markdown = await this.readMarkdown();
    if (markdown === null || !this.file) return;
    await this.plugin.copyFile(this.file, kind, markdown);
  }

  /** 编辑器滚动时按比例同步预览 */
  private bindScrollSync() {
    this.scrollCleanup?.();
    this.scrollCleanup = null;
    if (!this.plugin.settings.syncScroll || !this.file) return;
    const leaf = this.app.workspace
      .getLeavesOfType("markdown")
      .find((l) => l.view instanceof MarkdownView && l.view.file === this.file);
    const scroller = leaf?.view.containerEl.querySelector<HTMLElement>(
      ".cm-scroller, .markdown-preview-view",
    );
    if (!scroller) return;
    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const ratio = max > 0 ? scroller.scrollTop / max : 0;
      const target = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
      this.scrollEl.scrollTop = ratio * target;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    this.scrollCleanup = () => scroller.removeEventListener("scroll", onScroll);
  }

  rebindScrollSync() {
    this.bindScrollSync();
  }
}
