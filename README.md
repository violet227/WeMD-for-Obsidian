<div align="center">

# WeMD for Obsidian

**在 Obsidian 里写，一键粘贴到微信公众号**

把公众号排版能力带进 Obsidian：<br>
边写边看手机端效果，12 套精选主题随手切换，也可以用 CSS 定制自己的主题。

[功能](#-功能) · [安装](#-安装) · [快速上手](#-快速上手) · [主题](#-主题) · [自定义主题](#-自定义主题) · [常见问题](#-常见问题)

<br>

![version](https://img.shields.io/badge/version-0.1.0-0e8a9e)
![obsidian](https://img.shields.io/badge/Obsidian-%E2%89%A5%201.4.0-7c3aed?logo=obsidian&logoColor=white)
![platform](https://img.shields.io/badge/platform-desktop-555)
![license](https://img.shields.io/badge/license-MIT-22c55e)

</div>

<!-- 截图：把预览面板的截图放到 docs/preview.png 后取消下一行注释 -->
<!-- <p align="center"><img src="docs/preview.png" width="860" alt="WeMD for Obsidian 预览"></p> -->

---

## ✨ 功能

- **实时预览**：右侧面板按手机阅读宽度显示公众号效果，跟随当前笔记，边编辑边刷新，编辑器滚动时预览同步滚动。
- **一键复制到公众号**：样式全部内联，在公众号后台编辑器直接 `Ctrl+V` 粘贴即可，不需要再调格式。
- **12 套内置主题**：来自 WeMD，涵盖简约、学术、杂志、复古等风格，可全局设置，也可按笔记单独指定。
- **自定义主题**：库里的一个 `.css` 文件就是一个主题，保存即生效；可以从任意内置主题复制一份开始改。
- **兼容 Obsidian 写法**：`![[图片]]`、双链、callout、`%%注释%%`、frontmatter 都能正确处理，本地图片复制时自动内嵌。
- **公式与图表**：支持 KaTeX 公式；Mermaid 图在复制时自动转成图片，公众号里也能正常显示。

## 📦 安装

> 插件目前只支持桌面版 Obsidian（Windows / macOS / Linux），版本需不低于 1.4.0。

### 方式一：手动安装

1. 在 [Releases](../../releases) 页面下载最新版本的 `main.js`、`manifest.json`、`styles.css`。
2. 在你的库里新建文件夹 `<你的库>/.obsidian/plugins/wemd/`，把这三个文件放进去。
3. 打开 Obsidian「设置 → 第三方插件」，关闭安全模式，刷新「已安装插件」列表，启用 **WeMD for Obsidian**。

### 方式二：BRAT

已安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 的话，选择「Add Beta plugin」，填入本仓库地址即可，之后有新版本会自动更新。

### 方式三：从源码构建

```bash
git clone https://github.com/violet227/WeMD-for-Obsidian.git
cd WeMD-for-Obsidian
npm install
npm run build        # 生成 main.js
```

然后按方式一的第 2、3 步把 `main.js`、`manifest.json`、`styles.css` 复制到插件目录。

## 🚀 快速上手

1. 点击左侧功能区的 💬 图标（或命令面板 `Ctrl+P` →「打开公众号预览」），右侧会出现预览面板。
2. 打开任意一篇笔记，预览会显示它排版到公众号的效果。
3. 用预览顶部的下拉框挑一个主题。
4. 点击 **复制到公众号**，提示「已复制」后，到公众号后台的文章编辑器里粘贴。

### 命令

| 命令 | 说明 |
| --- | --- |
| 打开公众号预览 | 在右侧边栏打开预览面板 |
| 复制当前笔记到公众号 | 复制带内联样式的富文本，用于粘贴到公众号后台 |
| 复制当前笔记的公众号 HTML 源码 | 复制 HTML 源码，用于其他编辑器或调试 |
| 切换主题 | 搜索并切换主题 |

## 🎨 主题

| 主题 | id | 主题 | id |
| --- | --- | --- | --- |
| 默认主题 | `default` | 知识库 | `knowledge-base` |
| 数据蓝图 | `data-blueprint` | 黑金奢华 | `luxury-gold` |
| 东方笺谱 | `eastern-notes` | 莫兰迪森林 | `morandi-forest` |
| 清晰指南 | `clear-guide` | 编辑部手记 | `modern-editorial` |
| 留白画册 | `whitespace-gallery` | 购物小票 | `receipt` |
| 学术论文 | `academic-paper` | 落日胶片 | `sunset-film` |

**全局默认主题**在插件设置里选择。某篇笔记想用别的主题，在 frontmatter 里加一行：

```yaml
---
wemd-theme: receipt
---
```

值可以是主题 id、中文名称，或自定义主题的文件名。笔记里已有 `wemd-theme` 时，在预览下拉框切换主题会直接改写这一项；没有的话，切换的是全局默认主题。

## 🖌 自定义主题

**从内置主题开始改（推荐）**

1. 打开「设置 → WeMD for Obsidian → 新建自定义主题」，选一个内置主题作为起点，输入名称。
2. 插件会在库里的 `wemd-themes/` 文件夹生成对应的 `.css` 文件并打开。
3. 修改并保存，预览马上更新。

**直接放 CSS 文件**

`wemd-themes/` 下的每个 `.css` 文件都会被识别为一个主题。示例：

```css
/* name: 我的蓝色主题 */

#wemd h2 {
  color: #1e6fd9;
  border-bottom: 2px solid #1e6fd9;
}

#wemd blockquote {
  border-left: 4px solid #1e6fd9;
  background: #f3f8ff;
}
```

几点规则：

- 所有选择器都要以 `#wemd` 开头，排版内容都在 `<section id="wemd">` 里。
- 首行的 `/* name: xxx */` 决定显示名称，不写就用文件名。
- 默认会在你的 CSS 前面拼上 WeMD 基础样式，所以只需写想改的部分；不需要的话可以在设置里关掉「拼接 WeMD 基础样式」。
- 公众号会过滤部分 CSS（如 `position`、动画、外部字体），写主题时尽量用颜色、边框、背景、间距这些基础属性。

## ⚙️ 设置项

| 设置 | 说明 |
| --- | --- |
| 默认主题 | 没有在 frontmatter 指定主题的笔记使用这个主题 |
| 代码块 Mac 风格标题栏 | 代码块顶部显示红黄绿三个圆点 |
| 链接转脚注 | 公众号正文里的外链无法点击，开启后链接会列在文末 |
| 表格单元格换行 | 关闭时宽表格横向滚动 |
| 滚动同步 | 预览随编辑器按比例滚动 |
| 主题文件夹 | 自定义主题所在的文件夹，默认 `wemd-themes` |
| 拼接 WeMD 基础样式 | 自定义主题是否叠加在基础样式之上 |
| 自定义主题代码高亮 | 自定义主题使用的代码配色：GitHub 亮色 / 暗色 |

## 📝 Obsidian 语法支持

| 写法 | 处理方式 |
| --- | --- |
| `![[图片.png]]`、`![[图片.png\|300]]` | 显示图片，支持指定宽度；复制时转成内嵌图片，粘贴后由公众号转存 |
| `![](相对路径.png)` | 同上；`http(s)` 外链图片保持原样 |
| `[[笔记]]`、`[[笔记\|别名]]` | 转成纯文本（公众号不支持站内链接） |
| `> [!note]` 等 callout | 映射为 NOTE / TIP / IMPORTANT / WARNING / CAUTION 五种提示框 |
| `%%注释%%` | 删除 |
| frontmatter | 不显示 |
| `$...$`、`$$...$$` | KaTeX 公式 |
| ` ```mermaid ` | 预览中渲染为图表，复制时转成图片 |

## ❓ 常见问题

**点击复制后，粘贴到公众号样式不对？**
请确认粘贴到的是公众号后台的文章编辑器，并且使用的是「复制到公众号」而不是「复制 HTML 源码」。如果某个主题的某种元素显示异常，欢迎提 Issue 并附上 Markdown 片段。

**本地图片粘贴后不显示？**
图片会以内嵌形式复制，公众号后台通常会自动转存。图片很大时转存可能失败，建议先压缩图片，或换成图床链接。

**有些公式显示成了源码？**
插件使用 KaTeX 渲染公式，`\color`、`\colorbox` 等 KaTeX 不支持的命令会原样显示。

**可以在手机版 Obsidian 上用吗？**
暂不支持，复制功能依赖桌面版的剪贴板接口。

## 🛠 开发

```bash
npm install
npm run dev     # 监听源码变化并重新构建 main.js
npm run build   # 类型检查 + 生产构建
```

开发时可以把仓库目录直接软链接到某个测试库的 `.obsidian/plugins/wemd/`，配合 [Hot Reload](https://github.com/pjeby/hot-reload) 插件自动重载。

目录结构：

```
src/
├── main.ts              # 插件入口：命令、设置、视图注册
├── view.ts              # 预览面板
├── copy.ts              # 复制到公众号的处理流程
├── themes.ts            # 内置主题与自定义主题管理
├── settings.ts          # 设置页
├── obsidianMarkdown.ts  # Obsidian 语法转换、本地图片处理
├── core/                # 来自 WeMD packages/core：解析器、markdown-it 插件、主题
└── wechat/              # 来自 WeMD apps/web：公众号兼容处理
```

`src/core/` 与 `src/wechat/` 基本保持 WeMD 原样，方便跟进上游更新。目前的本地改动：

- `wechat/wechatMermaidRenderer.ts`：主题配置改为参数传入，不再依赖 WeMD 的状态管理。
- `core/themes/receipt.ts`：列表符号 `[*]` 挂到列表项内部，修复它单独占一行的问题。

## 🔍 与 WeMD 的区别

本插件只移植了 WeMD 的排版与复制能力，以下功能暂未包含：

- 可视化主题设计器（可用 CSS 自定义主题代替）
- MathJax 公式兜底
- AI 辅助写作、图床上传、历史版本、长图导出

## 🙏 致谢

排版核心、内置主题和公众号兼容处理来自 [WeMD](https://github.com/tenngoxars/WeMD)，感谢 WeMD 团队的开源工作。WeMD 使用 MIT 许可证，原许可证见 [LICENSE.wemd](LICENSE.wemd)。

## 📄 许可证

[MIT](LICENSE)
