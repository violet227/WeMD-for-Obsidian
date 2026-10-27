import { App, TFile, normalizePath } from "obsidian";
import {
  academicPaperTheme,
  basicTheme,
  clearGuideTheme,
  codeGithubDarkTheme,
  codeGithubTheme,
  customDefaultTheme,
  dataBlueprintTheme,
  easternNotesTheme,
  knowledgeBaseTheme,
  luxuryGoldTheme,
  modernEditorialTheme,
  morandiForestTheme,
  receiptTheme,
  sunsetFilmTheme,
  whitespaceGalleryTheme,
} from "./core";
import type { WemdSettings } from "./settings";

export const CODE_THEMES = {
  github: { name: "GitHub 亮色", css: codeGithubTheme },
  "github-dark": { name: "GitHub 暗色", css: codeGithubDarkTheme },
} as const;
export type CodeThemeId = keyof typeof CODE_THEMES;

export interface WemdTheme {
  id: string;
  name: string;
  css: string;
  isBuiltIn: boolean;
  /** 自定义主题对应的 vault 路径 */
  path?: string;
}

interface BuiltInDef {
  id: string;
  name: string;
  body: string;
  code: CodeThemeId;
}

// 与 WeMD apps/web/src/store/themes/builtInThemes.ts 中可选主题保持一致
const BUILT_IN_DEFS: BuiltInDef[] = [
  { id: "default", name: "默认主题", body: customDefaultTheme, code: "github" },
  { id: "data-blueprint", name: "数据蓝图", body: dataBlueprintTheme, code: "github-dark" },
  { id: "eastern-notes", name: "东方笺谱", body: easternNotesTheme, code: "github-dark" },
  { id: "clear-guide", name: "清晰指南", body: clearGuideTheme, code: "github-dark" },
  { id: "whitespace-gallery", name: "留白画册", body: whitespaceGalleryTheme, code: "github-dark" },
  { id: "academic-paper", name: "学术论文", body: academicPaperTheme, code: "github" },
  { id: "knowledge-base", name: "知识库", body: knowledgeBaseTheme, code: "github" },
  { id: "luxury-gold", name: "黑金奢华", body: luxuryGoldTheme, code: "github" },
  { id: "morandi-forest", name: "莫兰迪森林", body: morandiForestTheme, code: "github" },
  { id: "modern-editorial", name: "编辑部手记", body: modernEditorialTheme, code: "github-dark" },
  { id: "receipt", name: "购物小票", body: receiptTheme, code: "github" },
  { id: "sunset-film", name: "落日胶片", body: sunsetFilmTheme, code: "github" },
];

const BUILT_INS: WemdTheme[] = BUILT_IN_DEFS.map((d) => ({
  id: d.id,
  name: d.name,
  css: `${basicTheme}\n${d.body}\n${CODE_THEMES[d.code].css}`,
  isBuiltIn: true,
}));

const CUSTOM_PREFIX = "custom:";
const NAME_COMMENT = /^\s*\/\*\s*name\s*:\s*(.+?)\s*\*\//i;

export class ThemeManager {
  private customThemes: WemdTheme[] = [];

  constructor(
    private readonly app: App,
    private readonly getSettings: () => WemdSettings,
  ) {}

  builtIns(): WemdTheme[] {
    return BUILT_INS;
  }

  customs(): WemdTheme[] {
    return this.customThemes;
  }

  list(): WemdTheme[] {
    return [...BUILT_INS, ...this.customThemes];
  }

  get(id: string | undefined): WemdTheme {
    if (id) {
      const byId = this.list().find((t) => t.id === id);
      if (byId) return byId;
      // frontmatter 中允许直接写主题名称或自定义主题文件名
      const byName = this.list().find(
        (t) => t.name === id || t.id === CUSTOM_PREFIX + id,
      );
      if (byName) return byName;
    }
    return BUILT_INS[0];
  }

  idForFile(file: TFile): string {
    return CUSTOM_PREFIX + file.basename;
  }

  isThemeFile(path: string): boolean {
    const folder = normalizePath(this.getSettings().themeFolder);
    return path.startsWith(folder + "/") && path.endsWith(".css");
  }

  async reload(): Promise<void> {
    const settings = this.getSettings();
    const files = this.app.vault
      .getFiles()
      .filter((f) => this.isThemeFile(f.path))
      .sort((a, b) => a.basename.localeCompare(b.basename));

    const prefix = settings.customPrependBasic ? basicTheme + "\n" : "";
    const code = CODE_THEMES[settings.customCodeTheme]?.css ?? codeGithubTheme;

    this.customThemes = await Promise.all(
      files.map(async (file) => {
        const content = await this.app.vault.cachedRead(file);
        const name = content.match(NAME_COMMENT)?.[1] ?? file.basename;
        return {
          id: this.idForFile(file),
          name,
          css: `${prefix}${content}\n${code}`,
          isBuiltIn: false,
          path: file.path,
        };
      }),
    );
  }

  async createFromBuiltIn(baseId: string, name: string): Promise<TFile> {
    const base = BUILT_IN_DEFS.find((d) => d.id === baseId) ?? BUILT_IN_DEFS[0];
    const folder = normalizePath(this.getSettings().themeFolder);
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder);
    }
    const fileName = name.replace(/[\\/:*?"<>|]/g, "-");
    const path = normalizePath(`${folder}/${fileName}.css`);
    if (this.app.vault.getAbstractFileByPath(path)) {
      throw new Error(`${path} 已存在`);
    }
    const header =
      `/* name: ${name} */\n` +
      `/* 基于「${base.name}」。所有选择器以 #wemd 开头；` +
      `设置中开启「拼接 WeMD 基础样式」时，此处只需写覆盖部分。 */\n\n`;
    const file = await this.app.vault.create(path, header + base.body.trim() + "\n");
    await this.reload();
    return file;
  }
}
