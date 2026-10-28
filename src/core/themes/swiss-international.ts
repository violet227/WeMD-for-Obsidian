export const swissInternationalTheme = `/* 瑞士国际主义风格：无衬线、左对齐、粗线分隔、黑白红
 * 排版参数（一套参数，全篇统一）：
 *   正文 15px · 行距 1.75 倍 · 字距 1px · 小标题 18px 加粗
 *   正文深炭灰 #333333（白底对比度 12.6:1，比纯黑柔和） · 段落之间空一行 · 全篇左对齐
 * 用色比例：深炭灰做正文，浅灰做辅助，红色 #E3000F 只做强调（不超过约 5%）
 * 强调方式：只用「加粗」或「加粗 + 红色」，不放大字号、不单独换颜色或加底色
 */
#mp {
  max-width: 677px;
  margin: 0 auto;
  padding: 8px 20px;
  /* 透明背景兼容深色模式 */
  color: #333333;
  background-color: transparent;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 15px;
  line-height: 1.75;
  letter-spacing: 1px;
  text-align: left;
  word-break: break-word;
}

/* 段落：左对齐、右侧自然参差；段落之间空一行（间距约等于一行行高 15px × 1.75） */
#mp p {
  margin: 0 0 26px;
  color: #333333;
  font-size: 15px;
  line-height: 1.75;
  letter-spacing: 1px;
  text-align: left;
}

/* 标题：全部左对齐，用字号、字重和线条建立层级 */
#mp h1,
#mp h2,
#mp h3,
#mp h4,
#mp h5,
#mp h6 {
  padding: 0;
  color: #333333;
  text-align: left;
  font-weight: 700;
}

/* 一级标题：上方粗黑线 */
#mp h1 {
  margin: 8px 0 36px;
  padding-top: 14px;
  border-top: 6px solid #111111;
}

#mp h1 .content {
  color: #333333;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 1px;
}

/* 二级标题（小标题）：18px · 加粗 · 左对齐 · 深炭灰，左侧一条红色短竖条 */
#mp h2 {
  margin: 44px 0 20px;
  line-height: 1.4;
}

#mp h2 .content {
  display: block;
  padding-left: 10px;
  border-left: 4px solid #E3000F;
  color: #333333;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 1px;
}

/* 三级及以下标题：不再放大字号，只靠加粗区分（标题层级不靠颜色） */
#mp h3 {
  margin: 32px 0 12px;
}

#mp h3 .content {
  color: #333333;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

#mp h4 {
  margin: 26px 0 10px;
}

#mp h4 .content,
#mp h5 .content,
#mp h6 .content {
  color: #333333;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* 列表：深炭灰方块和数字，红色不用在列表符号上 */
#mp ul {
  list-style-type: square;
  margin: 0 0 26px;
  padding-left: 20px;
  color: #333333;
}

#mp ol {
  list-style-type: decimal;
  margin: 0 0 26px;
  padding-left: 22px;
  color: #333333;
  font-weight: 700;
}

#mp ul ul,
#mp ol ul {
  list-style-type: square;
  margin: 6px 0 0;
  color: #888888;
}

#mp ol ol,
#mp ul ol {
  list-style-type: lower-alpha;
  margin: 6px 0 0;
  color: #888888;
}

#mp li {
  margin-bottom: 8px;
}

#mp li section {
  margin: 0;
  color: #333333;
  font-size: 15px;
  font-weight: normal;
  line-height: 1.75;
  letter-spacing: 1px;
  text-align: left;
}

/* 引用：浅灰竖线 + 浅灰辅助色正文，属于辅助信息而不是强调 */
#mp .multiquote-1,
#mp .multiquote-2,
#mp .multiquote-3 {
  margin: 28px 0;
  /* basic 主题分别写了四个方向的 padding，这里也逐个覆盖 */
  padding-top: 2px;
  padding-right: 0;
  padding-bottom: 2px;
  padding-left: 16px;
  border: none;
  border-left: 3px solid #CCCCCC;
  color: #666666;
  font-size: 1em;
  background: transparent;
  box-shadow: none;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #666666;
  font-size: 15px;
  font-weight: normal;
  line-height: 1.75;
  letter-spacing: 1px;
  text-align: left;
}

/* 链接：深炭灰 + 浅灰下划线，不占用红色 */
#mp a {
  color: #333333;
  text-decoration: none;
  border-bottom: 1px solid #BBBBBB;
}

/* 强调只有两档：
 *   **加粗**           → 直接加粗（清晰克制）
 *   ***加粗斜体*** / ==高亮== → 加粗 + 强调红（最多到这一步）
 * 不放大字号、不单独换颜色、不加底色；中文斜体不美观，*斜体* 只保留正体加粗 */
#mp strong {
  color: #333333;
  font-weight: 700;
}

#mp em {
  color: #333333;
  font-style: normal;
  font-weight: 700;
}

#mp em strong,
#mp strong em {
  color: #E3000F;
  font-weight: 700;
}

#mp mark {
  padding: 0;
  color: #E3000F;
  background-color: transparent;
  font-weight: 700;
}

#mp del {
  color: #888888;
  text-decoration: line-through;
}

/* 分隔线：通栏黑线 */
#mp hr {
  height: 0;
  margin: 40px 0;
  border: none;
  border-top: 2px solid #111111;
}

/* 图片：方角、无阴影 */
#mp img {
  display: block;
  width: 100%;
  margin: 4px auto;
  border-radius: 0;
}

#mp figcaption {
  margin-top: 6px;
  color: #888888;
  font-size: 12px;
  text-align: left;
}

/* 行内代码 */
#mp p code,
#mp li code,
#mp td code,
#mp th code {
  margin: 0 2px;
  padding: 2px 5px;
  color: #333333;
  background: #F0F0F0;
  border-radius: 0;
  font-family: Menlo, Consolas, monospace;
  font-size: 13px;
  letter-spacing: 0;
}

/* 代码块 - 不设置 color，让语法高亮主题控制文字颜色 */
#mp pre code.hljs {
  display: block;
  padding: 16px;
  background: #F4F4F4;
  border-left: 3px solid #333333;
  border-radius: 0;
  font-family: Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: 0;
  overflow-x: auto;
  white-space: pre;
  min-width: max-content;
}

#mp pre code:not(.hljs) {
  color: #333333;
  background: #F4F4F4;
}

/* 表格：参照参数表——表头下一条深炭灰线，行之间浅灰细线，不用底色
 * 复制流程会把单元格设为居中，这里用 !important 保持全篇左对齐 */
#mp table {
  width: 100%;
  margin: 8px 0 26px;
  border-collapse: collapse;
  font-size: 14px;
}

/* 覆盖 basic 主题给 tr 加的灰色上边框和白底 */
#mp table tr {
  border: none;
  background-color: transparent;
}

#mp table tr th {
  padding: 10px 8px;
  font-size: 14px;
  color: #333333;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #333333;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: left !important;
}

#mp table tr td {
  padding: 12px 8px;
  font-size: 14px;
  color: #333333;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #E5E5E5;
  letter-spacing: 0.5px;
  text-align: left !important;
}

/* 脚注 */
#mp .footnote-word,
#mp .footnote-ref {
  color: #888888;
}

#mp .footnotes-sep {
  margin-top: 48px;
  padding-top: 12px;
  border-top: 2px solid #111111;
  color: #333333;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
}

#mp .footnote-num {
  margin-right: 4px;
  color: #888888;
  font-weight: 700;
}

#mp .footnote-item p {
  margin: 4px 0;
  color: #888888;
  font-size: 12px;
}

/* 公式 */
#mp .block-equation > svg {
  max-width: 100% !important;
}

#mp .inline-equation > svg {
  max-width: 100%;
  vertical-align: middle;
}

/* 提示块：浅灰底 + 左侧色条；只有「警示」类用红色 */
#mp .callout {
  margin: 28px 0;
  padding: 16px 18px;
  background: #F4F4F4;
  border: none;
  border-left: 4px solid #333333;
  border-radius: 0;
}

#mp .callout-title {
  margin-bottom: 8px;
  color: #333333;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
}

#mp .callout-icon {
  margin-right: 6px;
}

#mp .callout-note { border-left-color: #333333; }
#mp .callout-tip { border-left-color: #888888; }
#mp .callout-important { border-left-color: #333333; }
#mp .callout-warning { border-left-color: #888888; }
#mp .callout-caution { border-left-color: #E3000F; }

/* 目录 */
#mp .table-of-contents {
  margin: 24px 0;
  padding: 12px 0;
  border-top: 2px solid #111111;
  border-bottom: 1px solid #D9D9D9;
}

#mp .table-of-contents a {
  color: #333333;
  border-bottom: none;
}

/* 定义列表 */
#mp dt {
  color: #333333;
  font-weight: 700;
}

#mp dd {
  margin: 4px 0 16px;
  padding-left: 12px;
  border-left: 2px solid #CCCCCC;
}

/* Imageflow CSS */
#mp .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  border: 0px none;
  padding: 0px;
  overflow: hidden;
}

#mp .imageflow-layer2 {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}

#mp .imageflow-layer3 {
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  vertical-align: top;
  width: 80%;
  margin-right: 10px;
  flex-shrink: 0;
}

#mp .imageflow-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 0;
}

#mp .imageflow-caption {
  text-align: left;
  margin-top: 0px;
  padding-top: 0px;
  color: #888888;
}
`;
