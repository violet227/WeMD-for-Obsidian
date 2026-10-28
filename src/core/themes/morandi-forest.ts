export const morandiForestTheme = `/* 莫兰迪森林风格 */
#mp {
  padding: 5px 22px;
  max-width: 677px;
  margin: 0 auto;
  font-family: "Optima", "Georgia", "PingFang SC", "Microsoft YaHei", serif;
  color: #2F3E32;
  background-color: transparent;
  /* 透明背景，兼容微信深色模式 */
  word-break: break-word;
}

/* 段落：自身外边距归零，段落间距由 p + p 显式给出（26px）。
   这样文字↔图片、文字↔表格的间距可直接归零，且不受公众号剥离 figure / .table-container
   包裹层的影响——此前用「包裹层负边距抵消段落 26px 下边距」的做法在公众号里会失效：
   公众号粘贴时会剥离包裹层，负边距随之丢失，只剩段落 26px 下边距，于是在公众号里出现大段
   空白（预览却正常）。 */
#mp p {
  margin: 0;
  line-height: 2.0;
  letter-spacing: 0.5px;
  text-align: justify;
  color: #3A4D39;
  font-size: 16px;
}

#mp p + p {
  margin-top: 26px;
}

/* 包裹层不额外增加间距（防御：无论公众号保留还是剥离包裹层，文字↔媒体都为 0） */
#mp figure,
#mp .table-container {
  margin: 0;
}

/* 图片、表格与后续段落之间也不留空白 */
#mp figure + p,
#mp .table-container + p,
#mp img + p,
#mp table + p {
  margin-top: 0;
}

/* 一级标题 */
#mp h1 {
  margin-top: 60px;
  margin-bottom: 50px;
  text-align: center;
}

#mp h1 .content {
  display: inline-block;
  font-size: 24px;
  font-weight: normal;
  color: #1A261D;
  padding: 12px 24px;
  border: 1px solid #739072;
  border-radius: 2px;
  background-color: #F1F4F0;
  letter-spacing: 2px;
}

#mp h1 .prefix,
#mp h1 .suffix {
  display: none;
}

/* 二级标题 */
#mp h2 {
  margin-top: 50px;
  margin-bottom: 24px;
  text-align: left;
  border-bottom: 1px solid #E8EBE9;
  padding-bottom: 10px;
}

#mp h2 .content {
  display: inline-block;
  font-size: 19px;
  font-weight: 700;
  color: #4F6F52;
  padding-left: 12px;
  border-left: 5px solid #4F6F52;
  line-height: 1.2;
  letter-spacing: 1px;
}

#mp h2 .prefix,
#mp h2 .suffix {
  display: none;
}

/* 三级标题 */
#mp h3 {
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
}

#mp h3 .content {
  font-size: 17px;
  font-weight: bold;
  color: #739072;
  display: inline-block;
  border-bottom: 2px dotted #739072;
  padding-bottom: 4px;
}

#mp h3 .prefix,
#mp h3 .suffix {
  display: none;
}

/* 四级标题 */
#mp h4 {
  margin-top: 30px;
  margin-bottom: 15px;
  text-align: left;
}

#mp h4 .content {
  display: inline-block;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background-color: #86A789;
  padding: 4px 10px;
  border-radius: 4px;
  line-height: 1.4;
}

#mp h4 .prefix,
#mp h4 .suffix {
  display: none;
}

/* 列表 */
#mp ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 20px 0;
  color: #86A789;
}

#mp ul li {
  margin-bottom: 12px;
  line-height: 1.8;
}

#mp li section {
  color: #3A4D39;
  font-size: 16px;
}

/* 有序列表 */
#mp ol {
  list-style-type: decimal;
  padding-left: 20px;
  margin: 20px 0;
  color: #4F6F52;
  font-weight: bold;
}

#mp ul ul {
  list-style-type: circle;
  color: #4F6F52;
  margin-top: 8px;
}

#mp ol ol {
  list-style-type: lower-alpha;
  color: #739072;
}

#mp ol li {
  margin-bottom: 12px;
  line-height: 1.8;
}

#mp ol li section {
  color: #3A4D39;
  font-weight: normal;
  font-size: 16px;
}

/* 引用 */
#mp .multiquote-1,
#mp .multiquote-2,
#mp .multiquote-3 {
  margin: 36px 0;
  padding: 24px;
  background-color: #F6F8F6;
  border: 1px dashed #739072;
  border-radius: 8px;
  overflow: visible !important;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #556B58;
  font-size: 15px;
  line-height: 1.8;
  font-family: "KaiTi", "STKaiti", serif;
}

/* 引用框内部段落不受全局 p + p 规则影响，避免框内多出 26px 间距 */
#mp .multiquote-1 p + p,
#mp .multiquote-2 p + p,
#mp .multiquote-3 p + p {
  margin-top: 0;
}

/* 链接 */
#mp a {
  color: #4F6F52;
  text-decoration: none;
  border-bottom: 1px solid #4F6F52;
  font-weight: 600;
  padding-bottom: 0px;
}

/* 加粗 */
#mp strong {
  color: #1A261D;
  font-weight: 700;
  /* 公众号深色模式不允许文字背景用渐变（darkmode-no-gradient），改用纯色底 + 下边框 */
  background-color: #E4EBE2;
  border-bottom: 2px solid #A9C0AA;
  margin: 0 2px;
  padding: 0 2px;
}

/* 斜体 */
#mp em {
  color: #739072;
  font-style: italic;
}

#mp em strong {
  color: #4F6F52;
}

/* 高亮 - 浅绿背景 */
#mp mark {
  background-color: #E9EFE7;
  color: #1A261D;
  padding: 0 2px;
}

/* 删除线 */
#mp del {
  text-decoration: line-through;
  color: #889E8B;
}

/* 
 * 分隔线 
 * 修复了这里无效的颜色代码 #D2DSD4
 */
#mp hr {
  margin: 60px auto;
  border: 0;
  height: 1px;
  background-color: #D2D4D4;
  /* 已修正 */
  width: 60%;
}

/* 图片 */
#mp img {
  display: block;
  margin: 0 auto;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 8px 20px rgba(79, 111, 82, 0.15);
  padding: 6px;
  background: #fff;
  border: 1px solid #eee;
}

#mp figcaption {
  font-size: 13px;
  color: #889E8B;
  margin-top: 10px;
  font-family: serif;
}

/* 行内代码 */
#mp p code,
#mp li code,
#mp td code,
#mp th code {
  color: #4F6F52;
  background: #EDF1EE;
  border: none;
  padding: 3px 6px;
  margin: 0 4px;
  border-radius: 4px;
  font-size: 14px;
  font-family: sans-serif;
}

/* 代码块 */
/* 代码块 - 注意：不要设置 color，让语法高亮主题控制文字颜色 */
#mp pre code.hljs {
  display: block;
  padding: 20px;
  background: #F0F2F0;
  /* color 由 .hljs 语法高亮主题控制 */
  font-size: 13px;
  line-height: 1.6;
  border-radius: 6px;
  font-family: sans-serif;
  overflow-x: auto;
  white-space: pre;
  min-width: max-content;
  border: 1px solid #DCE3DD;
}

/* 如果没有语法高亮，设置默认深绿色 */
#mp pre code:not(.hljs) {
  color: #3A4D39;
  background: #F0F2F0;
  border: 1px solid #DCE3DD;
}

/* 
 * 表格 
 * 修复了这里无效的颜色代码 #D2DSD4
 */
#mp table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 14px;
  border: 1px solid #D2D4D4;
  /* 已修正 */
}

#mp table tr th {
  background: #EDF1EE;
  color: #4F6F52;
  font-weight: 700;
  border: 1px solid #D2D4D4;
  /* 已修正 */
  padding: 12px 10px;
  text-align: left;
}

#mp table tr td {
  border: 1px solid #D2D4D4;
  /* 已修正 */
  padding: 12px 10px;
  color: #555;
  background: #fff;
}

/* 脚注 */
#mp .footnote-word,
#mp .footnote-ref {
  color: #4F6F52;
}

#mp .footnotes-sep {
  border-top: 1px solid #E8EBE9;
  padding-top: 20px;
  margin-top: 60px;
  font-size: 12px;
  color: #B0BEB3;
  text-align: center;
}

#mp .footnote-num {
  font-weight: bold;
  color: #739072;
  margin-right: 4px;
}

#mp .footnote-item p {
  color: #889E8B;
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

/* 提示块 - 莫兰迪森林风格 */
#mp .callout {
  margin: 30px 0;
  padding: 20px;
  background: #F6F8F6;
  border: 1px dashed #739072;
  border-radius: 8px;
}

#mp .callout-title {
  font-weight: 700;
  margin-bottom: 10px;
  color: #4F6F52;
  font-size: 15px;
}

#mp .callout-icon { margin-right: 8px;
  margin-right: 6px;
}

#mp .callout-note { border-left: 4px solid #739072; }
#mp .callout-tip { border-left: 4px solid #86A789; }
#mp .callout-important { border-left: 4px solid #4F6F52; }
#mp .callout-warning { border-left: 4px solid #D98C45; }
#mp .callout-caution { border-left: 4px solid #B33D25; }

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
