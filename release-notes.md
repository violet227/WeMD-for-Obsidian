# 公众号排版 v0.1.0

首个公开版本。把 Obsidian 笔记一键排版成微信公众号图文：内置 45 套主题实时预览，复制即可粘贴到公众号后台，样式不丢。

## 功能亮点
- **45 套精选主题**：莫兰迪、瑞士国际、黑金奢华、赛博朋克、小红书、NYT 报刊……总有一款适合你，实时预览所见即所得。
- **一键复制为公众号兼容内联 HTML**：基于 markdown-it + juice 内联，粘贴到公众号编辑器不丢样式、不弹结构告警。
- **原生兼容**：自动处理深色模式、代码高亮、表格、数学公式（KaTeX）、Mermaid 图。
- **免费图床联动**：配合 PicGo + GitHub，图片随写随传。
- 桌面端专用（调用本地 Node 能力）。

## 安装
- **方式一（手动）**：在本页 Releases 下载 `main.js` / `manifest.json` / `styles.css`，放入 `你的库/.obsidian/plugins/mp-formatter/`，到 Obsidian 设置 → 第三方插件中启用。
- **方式二（BRAT）**：已装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 的话，选「Add Beta plugin」，填入本仓库地址，后续自动更新。

## 本版本包含的资产
- `manifest.json` — 插件元信息（id: `mp-formatter`）
- `main.js` — 编译后的插件主体
- `styles.css` — 插件界面样式

欢迎 Star / 提 Issue / 发 PR 🙌
