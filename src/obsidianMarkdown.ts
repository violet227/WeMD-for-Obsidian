import { App, TFile } from "obsidian";

/**
 * 把 Obsidian 特有语法转换成解析器认识的标准 Markdown。
 * 图片统一改写为 `mp-asset://<vault 路径>` 占位，渲染后再按预览 / 复制场景替换真实地址。
 */

export const ASSET_SCHEME = "mp-asset://";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i;

// Obsidian callout 类型 → github-alert 插件支持的五种
const CALLOUT_MAP: Record<string, string> = {
  note: "NOTE",
  info: "NOTE",
  abstract: "NOTE",
  summary: "NOTE",
  tldr: "NOTE",
  todo: "NOTE",
  quote: "NOTE",
  cite: "NOTE",
  example: "NOTE",
  tip: "TIP",
  hint: "TIP",
  success: "TIP",
  check: "TIP",
  done: "TIP",
  question: "TIP",
  help: "TIP",
  faq: "TIP",
  important: "IMPORTANT",
  warning: "WARNING",
  caution: "CAUTION",
  attention: "WARNING",
  failure: "CAUTION",
  fail: "CAUTION",
  missing: "CAUTION",
  danger: "CAUTION",
  error: "CAUTION",
  bug: "CAUTION",
};

const stripFrontmatter = (md: string): string =>
  md.replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/, "");

const encodeAsset = (path: string) => ASSET_SCHEME + encodeURI(path);

/** 对代码块 / 行内代码以外的文本应用 transform */
const transformOutsideCode = (
  md: string,
  transform: (text: string) => string,
): string => {
  const parts = md.split(/(^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)[ \t]*$)/m);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .split(/(`[^`\n]+`)/)
        .map((seg, j) => (j % 2 === 1 ? seg : transform(seg)))
        .join("");
    })
    .join("");
};

export function preprocessObsidianMarkdown(
  app: App,
  markdown: string,
  sourcePath: string,
): string {
  const resolve = (link: string): TFile | null =>
    app.metadataCache.getFirstLinkpathDest(link, sourcePath);

  const body = stripFrontmatter(markdown);

  return transformOutsideCode(body, (text) =>
    text
      // %% 注释 %%
      .replace(/%%[\s\S]*?%%/g, "")
      // ![[image.png|300]] / ![[image.png|300x200]] / ![[note]]（嵌入笔记不展开）
      .replace(/!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (m, link: string, opt?: string) => {
        const target = link.trim();
        const file = resolve(target);
        if (!file || !IMAGE_EXT.test(file.path)) {
          return file ? `**${file.basename}**` : m;
        }
        const size = opt?.trim().match(/^(\d+)(?:x(\d+))?$/);
        const alt = size ? "" : (opt?.trim() ?? "");
        // 尺寸放进 URL 片段，避免输出 <img> 触发 markdown-it 的 HTML 块吞掉后续行
        const sizeHash = size ? `#mp-size=${size[1]}x${size[2] ?? ""}` : "";
        return `![${alt}](${encodeAsset(file.path)}${sizeHash})`;
      })
      // ![alt](relative/path.png) —— 仅处理非 http / data 的本地路径
      .replace(/!\[([^\]]*)\]\(<?([^)\s>]+)>?((?:\s+"[^"]*")?)\)/g, (m, alt: string, url: string, title: string) => {
        if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith("data:")) return m;
        let decoded = url;
        try {
          decoded = decodeURI(url);
        } catch {
          // 保留原值
        }
        const file = resolve(decoded);
        return file ? `![${alt}](${encodeAsset(file.path)}${title})` : m;
      })
      // [[note|alias]] / [[note#heading]] → 纯文本
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, link: string, alias?: string) =>
        alias ? alias.trim() : link.replace(/#\^?/, " › ").trim(),
      )
      // > [!info]- 标题 → > [!NOTE] 标题
      .replace(/^(\s*>\s*)\[!([\w-]+)\][+-]?/gm, (m, lead: string, type: string) => {
        const mapped = CALLOUT_MAP[type.toLowerCase()];
        return mapped ? `${lead}[!${mapped}]` : `${lead}[!NOTE]`;
      }),
  );
}

/** 把渲染结果中的 mp-asset:// 占位替换为实际地址 */
export async function resolveAssets(
  app: App,
  root: ParentNode,
  mode: "preview" | "copy",
): Promise<void> {
  const images = Array.from(
    root.querySelectorAll<HTMLImageElement>(`img[src^="${ASSET_SCHEME}"]`),
  );
  await Promise.all(
    images.map(async (img) => {
      const [rawPath, hash = ""] = img
        .getAttribute("src")!
        .slice(ASSET_SCHEME.length)
        .split("#");
      const size = hash.match(/^mp-size=(\d+)x(\d*)$/);
      if (size) {
        // 主题 CSS 常写 width:100%，用内联样式覆盖
        img.style.setProperty("width", `${size[1]}px`);
        img.style.setProperty("max-width", "100%");
        img.style.setProperty(
          "height",
          size[2] ? `${size[2]}px` : "auto",
        );
      }
      const path = decodeURI(rawPath);
      const file = app.vault.getAbstractFileByPath(path);
      if (!(file instanceof TFile)) return;
      if (mode === "preview") {
        img.src = app.vault.getResourcePath(file);
        return;
      }
      const data = await app.vault.readBinary(file);
      img.src = `data:${mimeOf(file.extension)};base64,${arrayBufferToBase64(data)}`;
    }),
  );
}

const mimeOf = (ext: string): string => {
  const e = ext.toLowerCase();
  if (e === "jpg" || e === "jpeg") return "image/jpeg";
  if (e === "svg") return "image/svg+xml";
  return `image/${e}`;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};
