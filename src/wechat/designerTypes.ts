// Obsidian 插件不包含可视化主题设计器；仅保留 mermaidConfig 用到的字段类型。
export interface DesignerVariables {
  fontFamily?: string;
  primaryColor?: string;
  paragraphColor?: string;
  mermaidTheme?: string;
  [key: string]: unknown;
}
