export const auroraGlassTheme = `/* 极光玻璃风格 */
#mp {
  padding: 5px 20px;
  max-width: 677px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  color: #333;
  /* 背景透明，兼容微信深色模式 */
  background-color: transparent;
  word-break: break-word;
}

/* 段落 - 增加呼吸感 */
#mp p {
  margin-top: 22px;
  margin-bottom: 22px;
  line-height: 1.9;
  letter-spacing: 0.6px;
  text-align: justify;
  color: #444;
  font-size: 16px;
}

/* 一级标题 - 极光色标题 */
#mp h1 {
  margin-top: 60px;
  margin-bottom: 50px;
  text-align: center;
}

#mp h1 .content {
  font-size: 26px;
  font-weight: 800;
  display: inline-block;
  color: #4158D0;
  line-height: 1.4;
  padding-bottom: 10px;
  /* 底部加一条极细的渐变线 */
  border-bottom: 2px solid #eee;
  border-image: linear-gradient(135deg, #4158D0 0%, #C850C0 100%) 1;
}

#mp h1 .prefix,
#mp h1 .suffix {
  display: none;
}

/* 二级标题 - 悬浮色块 */
#mp h2 {
  margin-top: 60px;
  margin-bottom: 30px;
  text-align: left;
}

#mp h2 .content {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  /* 白字 */
  background-color: #4158D0;
  padding: 8px 18px;
  border-radius: 20px 20px 20px 4px;
  /* 不对称圆角，更灵动 */
  box-shadow: 0 8px 16px rgba(200, 80, 192, 0.3);
  /* 彩色弥散投影 */
  line-height: 1.2;
}

#mp h2 .prefix,
#mp h2 .suffix {
  display: none;
}

/* 三级标题 - 半高下划线 */
#mp h3 {
  margin-top: 35px;
  margin-bottom: 15px;
}

#mp h3 .content {
  font-size: 17px;
  font-weight: 700;
  color: #333;
  display: inline-block;
  position: relative;
  box-shadow: inset 0 -0.4em rgba(65, 88, 208, 0.2);
  padding: 0 4px;
}

#mp h3 .prefix,
#mp h3 .suffix {
  display: none;
}

/* 
 * 四级标题 - 极简圆点
 */
#mp h4 {
  margin-top: 24px;
  margin-bottom: 12px;
  text-align: left;
}

#mp h4 .content {
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  color: #4158D0;
  background-color: #f0f2ff;
  padding: 4px 12px;
  border-radius: 12px;
  line-height: 1.4;
}

#mp h4 .prefix,
#mp h4 .suffix {
  display: none;
}

/* 
 * 列表 - 炫彩圆点
 */
#mp ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 20px 0;
  color: #C850C0;
  /* 列表符号粉紫色 */
}

#mp ul li {
  margin-bottom: 10px;
  line-height: 1.8;
}

#mp li section {
  color: #444;
  /* 正文深灰 */
  font-size: 16px;
}

/* 有序列表 - 渐变色数字 (通过颜色模拟) */
#mp ol {
  list-style-type: decimal;
  padding-left: 20px;
  margin: 20px 0;
  color: #4158D0;
  /* 数字深蓝 */
  font-weight: bold;
}

#mp ul ul {
  list-style-type: circle;
  color: #4158D0;
  margin-top: 8px;
}

#mp ol ol {
  list-style-type: lower-roman;
  color: #C850C0;
}

#mp ol li {
  margin-bottom: 10px;
  line-height: 1.8;
}

#mp ol li section {
  color: #444;
  font-weight: normal;
  font-size: 16px;
}

/* 
 * 引用 - 磨砂玻璃卡片
 * 白底 + 柔和彩色投影 + 细微边框
 */
#mp .multiquote-1,
#mp .multiquote-2,
#mp .multiquote-3 {
  margin: 36px 0;
  padding: 24px;
  background-color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.8);
  /* 关键：双重投影，一层白光，一层彩光 */
  box-shadow: -4px -4px 10px rgba(255, 255, 255, 0.8), 4px 4px 20px rgba(65, 88, 208, 0.1);
  border-radius: 16px;
  /* 顶部渐变装饰条 */
  border-top: 4px solid #C850C0;
  overflow: visible !important;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #555;
  font-size: 15px;
  line-height: 1.8;
}

/* 链接 - 渐变虚线 */
#mp a {
  color: #C850C0;
  text-decoration: none;
  border-bottom: 1px dashed #C850C0;
  font-weight: 600;
  padding-bottom: 1px;
}

/* 加粗 */
#mp strong {
  font-weight: 700;
  color: #4158D0;
  margin: 0 1px;
}

/* 斜体 */
#mp em {
  color: #C850C0;
  font-style: italic;
}

#mp em strong {
  color: #C850C0;
}

/* 高亮 */
#mp mark {
    background: rgba(65, 88, 208, 0.15);
    color: #4158D0;
    padding: 2px 4px;
    border-radius: 3px;
}

/* 删除线 - 渐变色 */
#mp del {
    text-decoration: line-through;
    color: #999;
    text-decoration-color: #C850C0;
}

/* 分隔线 - 渐变光束 */
#mp hr {
  margin: 60px auto;
  border: 0;
  height: 2px;
  background-image: linear-gradient(90deg, rgba(247, 249, 252, 0) 0%, #C850C0 50%, rgba(247, 249, 252, 0) 100%);
  width: 80%;
}

/* 图片 - 悬浮投影 */
#mp img {
  display: block;
  margin: 40px auto;
  width: 100%;
  border-radius: 12px;
  /* 柔和的彩色投影 */
  box-shadow: 0 15px 35px rgba(65, 88, 208, 0.12);
}

/* 行内代码 - 气泡风格 */
#mp p code,
#mp li code,
#mp td code,
#mp th code {
  color: #4158D0;
  background: #f0f2ff;
  border: 1px solid rgba(65, 88, 208, 0.1);
  padding: 3px 6px;
  margin: 0 4px;
  border-radius: 6px;
  font-size: 14px;
  font-family: sans-serif;
}

/* 代码块 - 极简深色圆角 */
/* 代码块 - 注意：不要设置 color，让语法高亮主题控制文字颜色 */
#mp pre code.hljs {
  display: block;
  padding: 20px;
  background: #282c34;
  /* 经典的 Atom One Dark */
  color: #abb2bf;
  /* 默认文字颜色 */
  font-size: 13px;
  line-height: 1.6;
  border-radius: 12px;
  font-family: sans-serif;
  overflow-x: auto;
  white-space: pre;
  min-width: max-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* 优化深色背景下的语法高亮颜色 */
#mp pre code.hljs .hljs-comment,
#mp pre code.hljs .hljs-quote {
  color: #5c6370;
}

#mp pre code.hljs .hljs-keyword,
#mp pre code.hljs .hljs-selector-tag {
  color: #c678dd;
  font-weight: bold;
}

#mp pre code.hljs .hljs-string,
#mp pre code.hljs .hljs-doctag {
  color: #98c379;
}

#mp pre code.hljs .hljs-number,
#mp pre code.hljs .hljs-literal {
  color: #d19a66;
}

#mp pre code.hljs .hljs-title,
#mp pre code.hljs .hljs-section {
  color: #61afef;
  font-weight: bold;
}

#mp pre code.hljs .hljs-built_in,
#mp pre code.hljs .hljs-builtin-name {
  color: #e06c75;
}

/* 如果没有语法高亮，设置默认灰色 */
#mp pre code:not(.hljs) {
  color: #abb2bf;
  background: #282c34;
}

/* 表格 - 清新风格 */
#mp table {
  width: 100%;
  border-collapse: collapse;
  margin: 40px 0;
  font-size: 14px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid #f0f0f0;
}

#mp table tr th {
  background: #f4f6f9;
  color: #4158D0;
  font-weight: 700;
  border: 1px solid #f0f0f0;
  padding: 12px 10px;
  text-align: left;
}

#mp table tr td {
  border: 1px solid #f0f0f0;
  padding: 12px 10px;
  color: #555;
  background: #fff;
}

/* 脚注 */
#mp .footnote-word,
#mp .footnote-ref {
  color: #4158D0;
}

#mp .footnotes-sep {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 60px;
  font-size: 12px;
  color: #ccc;
  text-align: center;
}

#mp .footnote-num {
  font-weight: bold;
  color: #fff;
  background: #C850C0;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  text-align: center;
  line-height: 16px;
  font-size: 11px;
  margin-right: 4px;
}

#mp .footnote-item p {
  color: #999;
  font-size: 12px;
  margin: 4px 0;
}

/* 公式 */
#mp .block-equation > svg {
  max-width: 100% !important;
}

#mp .inline-equation > svg {
  max-width: 100%;
  vertical-align: middle;
}

/* 提示块 - 极光玻璃风格 */
#mp .callout {
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 20px rgba(65, 88, 208, 0.1);
}

#mp .callout-title {
  font-weight: 700;
  margin-bottom: 10px;
  color: #4158D0;
  font-size: 16px;
}

#mp .callout-icon { margin-right: 8px;
  margin-right: 6px;
}

#mp .callout-note {
  border-left: 4px solid #6366f1;
}

#mp .callout-tip {
  border-left: 4px solid #C850C0;
}

#mp .callout-important {
  border-left: 4px solid #4158D0;
}

#mp .callout-warning {
  border-left: 4px solid #FFCC70;
}

#mp .callout-caution {
  border-left: 4px solid #ef4444;
}

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
