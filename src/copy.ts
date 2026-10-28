/**
 * 微信公众号复制编排
 * 流水线：变量展开 → counter 物化 → 内联 → mermaid/表格 → 规范化 → 写剪贴板。
 */
import { Notice } from "obsidian";
import katexCss from "katex/dist/katex.min.css";
import { createMarkdownParser, processHtml } from "./core";
import { convertLinksToFootnotes } from "./wechat/linkFootnote";
import {
  applyLightRootVars,
  resolveInlineStyleVariablesForCopy,
} from "./wechat/inlineStyleVarResolver";
import {
  materializeCounterPseudoContent,
  stripCounterPseudoRules,
} from "./wechat/wechatCounterCompat";
import { expandCSSVariables } from "./wechat/cssVariableExpander";
import { normalizeCopyContainer } from "./wechat/wechatCopyNormalizer";
import { renderMermaidBlocks } from "./wechat/wechatMermaidRenderer";
import { renderTableBlocks } from "./wechat/wechatTableRenderer";

export interface WechatRenderOptions {
  showMacBar: boolean;
  /** Mac 风格代码栏圆点图片的外链地址；为空时复制不带圆点 */
  macDotsImageUrl: string;
  linkToFootnote: boolean;
  tableWrap: boolean;
  /** 在 HTML 写入容器后、后处理前替换本地图片地址 */
  resolveImages?: (container: HTMLElement) => Promise<void>;
}

// 复制用的 KaTeX CSS 去掉 @font-face：内联字体使 CSS 达到约 360KB，
// stripCounterPseudoRules 处理它要接近 2 秒，而公众号本来就不会加载这些字体
const katexCopyCss = katexCss.replace(/@font-face\{[^}]*\}/g, "");

const buildCopyCss = (themeCss: string) =>
  `${expandCSSVariables(themeCss)}\n${katexCopyCss}`;

// Mac 风格代码栏的三个圆点：公众号保存草稿时会丢弃 45×13 这类小尺寸 data: URI，
// 也会过滤圆点 span 的样式，所以复制时换成用户在设置里填写的外链 SVG。
// 没有填写地址时去掉圆点，只保留代码栏的留白。
const renderMacSignDotsToImages = (container: HTMLElement, imageUrl: string): void => {
  container.querySelectorAll<HTMLElement>(".mac-sign").forEach((macSign) => {
    if (!imageUrl) {
      macSign.replaceChildren();
      return;
    }
    const dots = Array.from(macSign.querySelectorAll<HTMLElement>(".mac-dot"));
    if (dots.length === 0) return;

    const dotMetrics = dots.map((dot) => ({
      height: Number.parseFloat(dot.style.height),
      marginRight: Number.parseFloat(dot.style.marginRight) || 0,
      marginTop: Number.parseFloat(dot.style.marginTop) || 0,
      width: Number.parseFloat(dot.style.width),
    }));
    const width = dotMetrics.reduce(
      (total, dot) => total + dot.width + dot.marginRight,
      0,
    );
    const height =
      Number.parseFloat(macSign.style.height) ||
      Math.max(...dotMetrics.map((dot) => dot.marginTop + dot.height));
    if (!width || !height) return;

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "";
    image.width = width;
    image.height = height;
    image.style.display = "block";
    image.style.setProperty("width", `${width}px`, "important");
    image.style.setProperty("height", `${height}px`, "important");
    image.style.setProperty("max-width", `${width}px`, "important");
    image.style.setProperty("max-height", `${height}px`, "important");

    macSign.removeAttribute("aria-hidden");
    macSign.replaceChildren(image);
  });
};

/** 微信公众号会过滤 <input>，checkbox 转为 emoji */
const convertCheckboxesToEmoji = (html: string): string =>
  html
    .replace(/<input[^>]*checked[^>]*>/gi, "✅&nbsp;")
    .replace(/<input[^>]*type=["']checkbox["'][^>]*>/gi, "⬜&nbsp;");

const getRenderedPlainText = (container: HTMLElement): string => {
  const innerText = container.innerText;
  if (typeof innerText === "string" && innerText.trim().length > 0) {
    return innerText;
  }
  return container.textContent || "";
};

const copyViaNativeExecCommand = (
  container: HTMLElement,
  exactHtmlTransport: boolean,
): boolean => {
  const html = exactHtmlTransport ? container.innerHTML : "";
  const text = exactHtmlTransport ? getRenderedPlainText(container) : "";
  const selection = window.getSelection();
  if (!selection) return false;

  const previousActiveElement =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  let payloadWritten = false;
  let copyEventObserved = false;
  const handleCopy = (event: ClipboardEvent) => {
    copyEventObserved = true;
    if (!exactHtmlTransport || !event.clipboardData) return;
    try {
      event.clipboardData.setData("text/html", html);
      event.clipboardData.setData("text/plain", text);
      event.preventDefault();
      payloadWritten = true;
    } catch {
      payloadWritten = false;
    }
  };

  document.addEventListener("copy", handleCopy, true);
  try {
    const range = document.createRange();
    range.selectNodeContents(container);
    selection.removeAllRanges();
    selection.addRange(range);
    // 普通主题沿用浏览器选区序列化；连续背景只认 copy handler 的精确写入结果
    const commandSucceeded = document.execCommand("copy");
    return exactHtmlTransport
      ? payloadWritten
      : commandSucceeded && copyEventObserved;
  } catch {
    return false;
  } finally {
    document.removeEventListener("copy", handleCopy, true);
    selection.removeAllRanges();
    if (previousActiveElement?.isConnected) {
      previousActiveElement.focus({ preventScroll: true });
    }
  }
};

type ElectronClipboard = {
  clear(): void;
  readHTML(): string;
  write(data: { html?: string; text?: string }): void;
};

const getElectronClipboard = (): ElectronClipboard | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return (require("electron") as { clipboard?: ElectronClipboard }).clipboard ?? null;
  } catch {
    return null;
  }
};

/** execCommand 在选区为空时也会返回 true，这里核实剪贴板里确实有 HTML */
const clipboardHasHtml = (): boolean => {
  const clipboard = getElectronClipboard();
  if (!clipboard) return true;
  try {
    return clipboard.readHTML().trim().length > 0;
  } catch {
    return true;
  }
};

const copyViaElectronClipboard = (container: HTMLElement): boolean => {
  const clipboard = getElectronClipboard();
  if (!clipboard) return false;
  try {
    clipboard.write({
      html: container.innerHTML,
      text: getRenderedPlainText(container),
    });
    return true;
  } catch (e) {
    console.error("[mp] Electron 剪贴板写入失败:", e);
    return false;
  }
};

/**
 * 渲染最终的微信 HTML 容器（已挂到 body、离屏、强制亮色）。
 * 调用方负责用完后移除 container。
 */
export async function renderWechatContainer(
  markdown: string,
  css: string,
  options: WechatRenderOptions,
): Promise<{ container: HTMLDivElement; requiresExactHtmlTransport: boolean }> {
  const container = document.createElement("div");
  container.addClass("mp-copy-host");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "760px";
  container.style.opacity = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "-1";
  container.style.contain = "layout style paint";
  // Obsidian 在 body 上设置了 user-select:none，不覆盖的话选区为空、复制不到内容
  container.style.userSelect = "text";
  container.style.setProperty("-webkit-user-select", "text");
  // 强制亮色，防止 Obsidian 暗色主题下选区序列化出亮色文字
  container.style.colorScheme = "light";
  container.style.color = "#000000";
  applyLightRootVars(container);
  document.body.appendChild(container);

  try {
    const parser = createMarkdownParser({
      mathRenderer: "katex",
      showMacBar: options.showMacBar,
    });
    const rawHtml = parser.render(markdown);
    const themedCss = buildCopyCss(css);
    const sanitizedCss = stripCounterPseudoRules(themedCss);
    const sourceHtml = options.linkToFootnote
      ? convertLinksToFootnotes(rawHtml)
      : rawHtml;
    const materializedHtml = materializeCounterPseudoContent(
      sourceHtml,
      themedCss,
    );
    const styledHtml = processHtml(materializedHtml, sanitizedCss, true, true);
    const resolvedHtml = resolveInlineStyleVariablesForCopy(styledHtml);
    container.innerHTML = convertCheckboxesToEmoji(resolvedHtml);

    await options.resolveImages?.(container);
    await renderMermaidBlocks(container);
    await renderTableBlocks(container, options.tableWrap);
    renderMacSignDotsToImages(container, options.macDotsImageUrl.trim());
    const { requiresExactHtmlTransport } = normalizeCopyContainer(container);
    return { container, requiresExactHtmlTransport };
  } catch (error) {
    container.remove();
    throw error;
  }
}

export async function copyToWechat(
  markdown: string,
  css: string,
  options: WechatRenderOptions,
): Promise<void> {
  let container: HTMLDivElement | null = null;
  try {
    const rendered = await renderWechatContainer(markdown, css, options);
    container = rendered.container;

    // 先清空，避免把剪贴板里的旧 HTML 误判为本次复制成功
    getElectronClipboard()?.clear();
    // 一律走精确 HTML 传输（直接写入 container.innerHTML），不再依赖浏览器
    // 选区序列化。否则 Chromium 在序列化选区时会把文档级样式表里残留的
    // text-align:start/end 一并写进剪贴板 <style> 块，触发微信「内容结构检测」
    // 关于 start/end 的对齐异常告警。
    let copied =
      copyViaNativeExecCommand(container, true) && clipboardHasHtml();

    if (!copied) {
      console.warn("[mp] 选区复制未写入 HTML，改用 Electron 剪贴板");
      copied = copyViaElectronClipboard(container);
    }

    if (!copied && navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([container.innerHTML], { type: "text/html" }),
          "text/plain": new Blob([getRenderedPlainText(container)], {
            type: "text/plain",
          }),
        }),
      ]);
      copied = true;
    }

    if (!copied) throw new Error("剪贴板写入失败");
    new Notice("已复制", 2000);
  } catch (error) {
    console.error("[mp] 复制失败:", error);
    new Notice(`复制失败: ${error instanceof Error ? error.message : error}`);
  } finally {
    container?.remove();
  }
}

/** 复制内联样式后的 HTML 源码（用于其它编辑器或调试） */
export async function copyHtmlSource(
  markdown: string,
  css: string,
  options: WechatRenderOptions,
): Promise<void> {
  let container: HTMLDivElement | null = null;
  try {
    const rendered = await renderWechatContainer(markdown, css, options);
    container = rendered.container;
    const html = rendered.container.innerHTML;
    const clipboard = getElectronClipboard();
    if (clipboard) clipboard.write({ text: html });
    else await navigator.clipboard.writeText(html);
    new Notice("已复制 HTML", 2000);
  } catch (error) {
    console.error("[mp] 复制 HTML 失败:", error);
    new Notice(`复制 HTML 失败: ${error instanceof Error ? error.message : error}`);
  } finally {
    container?.remove();
  }
}
