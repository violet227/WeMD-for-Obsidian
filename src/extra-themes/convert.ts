/**
 * 把「元素样式表」格式的主题（见 ./types.ts，来源与许可见 THIRD_PARTY_NOTICES）转成 #mp CSS。
 *
 * 这类主题是「元素 → 内联样式声明」的映射，原本在渲染时逐个元素写进 style。
 * 这里把每个元素映射到对应的 #mp 选择器，复用插件的预览与复制流水线：
 * - 所有声明加 !important：与原项目复制到公众号时的做法一致，同时盖过 basicTheme 的默认样式。
 * - 本插件的标题文字在 .content 里、列表项文字在 li > section 里，需要让它们继承主题的颜色和字号。
 * - previewBackground 不是白色时（深色/有底色的主题），写到 #mp 根容器上，复制后文章带底色。
 * - customCss 只在原项目的网页预览生效（公众号不支持），这里同样不使用。
 */
import type { Theme, ThemeCategory } from "./types";

import { theme as minimalWhite } from "./themes/minimal-white";
import { theme as wechatGreen } from "./themes/wechat-green";
import { theme as github } from "./themes/github";
import { theme as medium } from "./themes/medium";
import { theme as smartisanNote } from "./themes/smartisan-note";
import { theme as highlight } from "./themes/highlight";
import { theme as cardFlow } from "./themes/card-flow";
import { theme as financeBlue } from "./themes/finance-blue";
import { theme as classicBlue } from "./themes/classic-blue";
import { theme as bauhaus } from "./themes/bauhaus";
import { theme as warmOrange } from "./themes/warm-orange";
import { theme as autumnGlow } from "./themes/autumn-glow";
import { theme as cyanPastel } from "./themes/cyan-pastel";
import { theme as rosePurple } from "./themes/rose-purple";
import { theme as xiaohongshu } from "./themes/xiaohongshu";
import { theme as ecomRed } from "./themes/ecom-red";
import { theme as handlog } from "./themes/handlog";
import { theme as holographic } from "./themes/holographic";
import { theme as memphis } from "./themes/memphis";
import { theme as claudeOat } from "./themes/claude-oat";
import { theme as nytPaper } from "./themes/nyt-paper";
import { theme as retroParchment } from "./themes/retro-parchment";
import { theme as inkWash } from "./themes/ink-wash";
import { theme as neoChinese } from "./themes/neo-chinese";
import { theme as morandi } from "./themes/morandi";
import { theme as forbiddenCity } from "./themes/forbidden-city";
import { theme as magazine } from "./themes/magazine";
import { theme as darkNight } from "./themes/dark-night";
import { theme as linearDark } from "./themes/linear-dark";
import { theme as minimalBlack } from "./themes/minimal-black";
import { theme as terminal } from "./themes/terminal";
import { theme as cyberNeon } from "./themes/cyber-neon";

// 与原项目 registry.ts 的顺序一致
const EXTRA_THEMES: Theme[] = [
  minimalWhite, wechatGreen, github, medium, smartisanNote, highlight, cardFlow, financeBlue,
  classicBlue, bauhaus, warmOrange, autumnGlow, cyanPastel, rosePurple, xiaohongshu, ecomRed,
  handlog, holographic, memphis,
  claudeOat, nytPaper, retroParchment, inkWash, neoChinese, morandi, forbiddenCity, magazine,
  darkNight, linearDark, minimalBlack, terminal, cyberNeon,
];

export const CATEGORY_LABELS: Record<Exclude<ThemeCategory, "ai">, string> = {
  daily: "日常写作",
  expressive: "个性撞色",
  narrative: "文艺叙事",
  dark: "深色沉浸",
};

/** 元素样式键 → #mp 下的选择器 */
const SELECTORS: Record<string, string[]> = {
  root: ["#mp"],
  p: ["#mp p"],
  a: ["#mp a"],
  strong: ["#mp strong"],
  em: ["#mp em"],
  // 解析器把删除线渲染为 <s>
  del: ["#mp del", "#mp s"],
  ul: ["#mp ul"],
  ol: ["#mp ol"],
  li: ["#mp li"],
  // 引用带 multiquote-N 类，basicTheme 也是按类写的样式
  blockquote: ["#mp blockquote", "#mp .multiquote-1", "#mp .multiquote-2", "#mp .multiquote-3"],
  code: ["#mp p code", "#mp li code", "#mp td code", "#mp th code"],
  // codeBlockWrapper 对应 <pre>，codeBlock 对应其中的 <code>
  codeBlockWrapper: ["#mp pre", "#mp pre.custom"],
  codeBlock: ["#mp pre code", "#mp pre code.hljs"],
  table: ["#mp table"],
  thead: ["#mp thead"],
  tr: ["#mp table tr"],
  th: ["#mp table tr th"],
  td: ["#mp table tr td"],
  img: ["#mp img"],
  hr: ["#mp hr"],
};
for (const h of ["h1", "h2", "h3", "h4", "h5", "h6"]) SELECTORS[h] = [`#mp ${h}`];

const isWhite = (color: string) => /^#(?:fff|ffffff)$/i.test(color.trim());

const important = (decls: string): string =>
  decls
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => (/!important\s*$/i.test(d) ? d : `${d} !important`))
    .join("; ");

const rule = (selectors: string[], decls: string): string =>
  decls.trim() ? `${selectors.join(",\n")} {\n  ${important(decls)};\n}\n` : "";

/** hljs token 映射（如 'hljs-title.function_'）→ #mp 代码高亮规则 */
const hljsCss = (map: Record<string, string>): string =>
  Object.entries(map)
    .map(([cls, decls]) => rule([`#mp .${cls}`], decls))
    .join("");

export function elementThemeToCss(theme: Theme): string {
  const { styles } = theme;
  let css = `/* 主题：${theme.name}（${theme.description}） */\n`;

  // basicTheme 里的这些默认值会和这类主题冲突，先统一复位：
  // 段落/列表的固定 26px 行高、近黑色文字、标题统一 #000、表格隔行底色
  css += rule(
    ["#mp p", "#mp li section", "#mp .multiquote-1 p", "#mp .footnote-item p"],
    "line-height: inherit; color: inherit; font-size: inherit; font-weight: inherit",
  );
  css += rule(
    ["#mp h1", "#mp h2", "#mp h3", "#mp h4", "#mp h5", "#mp h6"],
    "color: inherit",
  );
  css += rule(["#mp table tr", "#mp table tr:nth-child(2n)"], "background-color: transparent; border-top: none");
  css += rule(["#mp strong", "#mp em", "#mp em strong", "#mp del", "#mp s"], "color: inherit");
  // 列表符号颜色：basicTheme 写死了 #000000，深色主题上会是一个个黑点
  css += rule(["#mp ul", "#mp ol"], "color: inherit");
  css += rule(["#mp pre code span"], "line-height: inherit");

  for (const [key, decls] of Object.entries(styles)) {
    const selectors = SELECTORS[key];
    if (selectors) css += rule(selectors, decls);
  }

  // 有底色的主题：底色铺到正文区，复制后文章保留这层底色
  if (!isWhite(theme.previewBackground)) {
    css += rule(["#mp"], `background-color: ${theme.previewBackground}; padding: 16px 14px`);
  }

  // 标题的 .content、列表项的 section 继承主题设置
  css += rule(
    ["#mp h1 .content", "#mp h2 .content", "#mp h3 .content", "#mp h4 .content", "#mp h5 .content", "#mp h6 .content"],
    "color: inherit; font-size: inherit; font-weight: inherit; letter-spacing: inherit",
  );

  css += hljsCss(theme.hljsStyleMap);
  return css;
}

export interface ExtraThemeEntry {
  id: string;
  name: string;
  description: string;
  group: string;
  /** 主题 CSS，不含 basicTheme；使用时叠在 basicTheme 之上 */
  body: string;
}

export const EXTRA_THEME_ENTRIES: ExtraThemeEntry[] = EXTRA_THEMES.map((t) => ({
  // 直接沿用原 id：与精选风格主题没有重名（core/themes 里的 bauhaus 不在可选列表里）
  id: t.id,
  name: t.name,
  description: t.description,
  group: CATEGORY_LABELS[t.category as Exclude<ThemeCategory, "ai">] ?? "日常写作",
  // 不拼 core 的代码高亮主题：代码配色来自主题自带的 hljsStyleMap
  body: elementThemeToCss(t),
}));
