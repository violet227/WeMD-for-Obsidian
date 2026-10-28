export const receiptTheme = `/* 购物小票风格 */
#mp {
    padding: 5px 20px;
    max-width: 677px;
    margin: 0 auto;
    /* 强制等宽/衬线字体，模拟打印机 */
    font-family: "Courier New", "SimSun", "Songti SC", monospace;
    color: #111;
    background-color: transparent;
    /* 透明背景，兼容微信深色模式 */
    /* 顶部撕纸效果 */
    border-top: 5px dashed #111;
    border-bottom: 5px dashed #111;
    word-break: break-word;
}

/* 正文 */
#mp p {
    margin: 18px 0;
    line-height: 1.6;
    text-align: justify;
    color: #222;
    font-size: 15px;
}

/* 
 * 一级标题 - 店铺招牌风格
 * 改为：上下双虚线包裹，居中，加大字重
 */
#mp h1 {
    margin: 40px 0 30px;
    text-align: center;
    border-top: 2px dashed #000;
    border-bottom: 2px dashed #000;
    padding: 15px 0;
}

#mp h1 .content {
    font-size: 26px;
    font-weight: 900;
    color: #000;
    letter-spacing: 2px;
    display: block;
    /* 占满整行 */
    border: none;
    /* 去除之前的下划线 */
}

#mp h1 .prefix,
#mp h1 .suffix {
    display: none;
}

/* 二级标题 - 分类栏 */
#mp h2 {
    margin: 30px 0 20px;
    text-align: center;
}

#mp h2 .content {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    /* 反白文字 */
    background: #000;
    /* 黑色背景条 */
    padding: 8px;
}

#mp h2 .prefix,
#mp h2 .suffix {
    display: none;
}

/* 三级标题 - 加粗项目 */
#mp h3 {
    margin: 25px 0 10px;
}

#mp h3 .content {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid #000;
    padding-bottom: 2px;
    display: inline-block;
}

#mp h3 .prefix,
#mp h3 .suffix {
    display: none;
}

/* 四级标题 - 简单标签 */
#mp h4 {
    margin: 20px 0 10px;
    text-align: left;
}

#mp h4 .content {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    text-decoration: underline;
}

#mp h4 .prefix,
#mp h4 .suffix {
    display: none;
}

/* 引用 - 备注框 */
#mp .multiquote-1 {
    margin: 25px 0;
    padding: 15px;
    border: 1px dotted #000;
    /* 点状边框 */
    font-size: 14px;
    text-align: left;
    background: #f8f8f8;
}

#mp .multiquote-1 p {
    font-family: monospace;
    color: #444;
}

#mp .multiquote-2 {
    margin: 22px 0;
    padding: 13px;
    border: 1px dashed #000;
    background: #fafafa;
}

#mp .multiquote-2 p {
    font-family: monospace;
    color: #444;
}

#mp .multiquote-3 {
    margin: 20px 0;
    padding: 11px;
    border: 1px dotted #666;
    background: #fcfcfc;
}

#mp .multiquote-3 p {
    font-family: monospace;
    color: #444;
}

/* 列表 */
#mp ul {
    list-style: none;
    padding-left: 10px;
    margin: 20px 0;
}

#mp ul li {
    margin-bottom: 8px;
    border-bottom: 1px dotted #ccc;
    /* 下划线辅助阅读 */
    padding-bottom: 4px;
}

/* 伪元素挂在 li 内的 section 上：markdown-it-li 会把内容包进块级 section，
   挂在 li 上会让 [*] 单独占一行 */
#mp ul li > section::before {
    content: "[*] ";
    /* 模拟字符列表 */
    font-weight: bold;
    margin-right: 5px;
}

#mp ol {
    list-style: decimal;
    padding-left: 25px;
    margin: 20px 0;
    font-weight: bold;
}

#mp li section {
    font-weight: normal;
    color: #222;
}

#mp ul ul {
    list-style: none;
    margin-top: 6px;
}

#mp ul ul li > section::before {
    content: "[-] ";
    font-weight: bold;
}

#mp ol ol {
    list-style-type: lower-alpha;
}

/* 链接 */
#mp a {
    color: #000;
    text-decoration: underline;
    font-weight: bold;
}

/* 加粗 */
#mp strong {
    font-weight: 900;
    background: #ddd;
    /* 模拟灰色高亮打印 */
    padding: 0 4px;
}

/* 斜体 */
#mp em {
    font-style: italic;
    color: #000;
}

/* 加粗斜体 */
#mp em strong {
    font-weight: 900;
    font-style: italic;
}

/* 高亮 - 灰色背景 */
#mp mark {
    background: #ddd;
    color: #000;
    padding: 0 4px;
}

/* 删除线 */
#mp del {
    text-decoration: line-through;
    color: #666;
}

/* 分割线 - 虚线 */
#mp hr {
    margin: 30px 0;
    border: none;
    border-top: 2px dashed #000;
}

/* 行内代码 - 反色打印块 */
#mp p code,
#mp li code,
#mp td code,
#mp th code {
    background: #000;
    color: #fff;
    font-family: monospace;
    padding: 2px 6px;
    margin: 0 4px;
    font-size: 14px;
    border-radius: 0;
}

/* 图片 - 抖动边框 */
#mp img {
    display: block;
    margin: 30px auto;
    width: 100%;
    border: 2px dashed #000;
    padding: 8px;
    background: #fff;
}

#mp figcaption {
    margin-top: 8px;
    text-align: center;
    color: #000;
    font-size: 13px;
    font-family: monospace;
    border-top: 1px dashed #000;
    padding-top: 6px;
}

/* 
 * 代码块 - 暴力修复版
 * 1. !important 强制覆盖编辑器的深色主题
 * 2. 去除圆角和阴影
 * 3. 模拟虚线纸张
 */
/* 代码块 - 注意：不要设置 color，让语法高亮主题控制文字颜色 */
#mp pre code.hljs {
    background: #f4f4f4 !important;
    /* 强制浅灰背景 */
    /* color 由 .hljs 语法高亮主题控制 */
    border: 2px dashed #000 !important;
    /* 强制虚线框 */
    border-radius: 0 !important;
    /* 强制直角 */
    box-shadow: none !important;
    /* 去掉立体阴影 */
    font-family: "Courier New", monospace;
    font-size: 13px;
    padding: 15px;
    line-height: 1.5;
}

/* 如果没有语法高亮，设置默认黑色 */
#mp pre code:not(.hljs) {
    color: #000 !important;
    background: #f4f4f4 !important;
    border: 2px dashed #000 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
}

/* 尝试隐藏 Mac 红绿灯 (如果编辑器是用伪元素实现的) */
#mp pre code::before {
    content: "" !important;
    display: none !important;
}

/* 表格 - 价格单 */
#mp table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
    font-family: monospace;
}

#mp table tr th {
    border-bottom: 2px dashed #000;
    padding: 8px 5px;
    text-align: right;
    font-weight: 900;
    text-transform: uppercase;
}

#mp table tr th:first-child {
    text-align: left;
}

#mp table tr td {
    border-bottom: 1px dotted #000;
    padding: 8px 5px;
    text-align: right;
    color: #000;
}

#mp table tr td:first-child {
    text-align: left;
}

/* 脚注 */
#mp .footnote-word,
#mp .footnote-ref {
    color: #000;
    text-decoration: underline;
}

#mp .footnotes-sep {
    border-top: 2px dashed #000;
    margin-top: 30px;
    padding-top: 15px;
}

#mp .footnote-num {
    font-weight: bold;
    color: #000;
    margin-right: 4px;
}

#mp .footnote-item p {
    color: #444;
    font-size: 13px;
    font-family: monospace;
}

/* 提示块 - 购物小票风格 */
#mp .callout {
    margin: 25px 0;
    padding: 15px;
    border: 1px dotted #000;
    background: #f8f8f8;
    border-radius: 0;
}

#mp .callout-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #000;
    font-family: monospace;
    text-transform: uppercase;
    font-size: 14px;
}

#mp .callout-icon { margin-right: 8px;
    margin-right: 6px;
}

#mp .callout-note { border-left: 2px dashed #000; }
#mp .callout-tip { border-left: 2px dashed #000; }
#mp .callout-important { border-left: 2px dashed #000; }
#mp .callout-warning { border-left: 2px dashed #000; }
#mp .callout-caution { border-left: 2px dashed #000; }

/* Imageflow CSS */
#mp .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  /* white-space: normal; */
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
  border-radius: 4px;
}

#mp .imageflow-caption {
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  color: #888;
}
`;
