export const customDefaultTheme = `/* 默认主题 · 翡翠刊读
 * 设计语言：深松墨承担标题层级（近黑而有绿魂），翡翠 #047857 作单一锚点强调，
 * 每级标题使用不同版式（刊头压线 / 章节底线 / 翡翠左锚 / 字距标签）建立编辑节奏；
 * 全程不用投影、外发光、渐变或伪元素装饰，保证复制到微信公众号后视觉稳定。
 * 所有颜色为字面值。
 */

/* 全局 */
#wemd {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  color: #242a26;
  line-height: 1.8;
  font-size: 16px;
  letter-spacing: 0.4px;
}

/* 段落 */
#wemd p {
  margin: 16px 0;
  font-size: 16px;
  color: #242a26;
  line-height: 1.8;
  letter-spacing: 0.4px;
}

/* 一级标题 · 刊头：翡翠压顶线 + 左对齐大字墨题 */
#wemd h1 {
  font-size: 30px;
  font-weight: 800;
  color: #12241c;
  text-align: left;
  margin: 10px 0 28px;
  padding-top: 18px;
  border-top: 3px solid #047857;
  line-height: 1.35;
  letter-spacing: -0.3px;
}

/* 二级标题 · 章节：深松墨 + 翡翠底线，形成栏目分节 */
#wemd h2 {
  font-size: 22px;
  font-weight: 700;
  color: #134034;
  margin: 42px 0 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #cfe4d9;
  line-height: 1.45;
  letter-spacing: 0.2px;
}

/* 三级标题 · 翡翠左锚 */
#wemd h3 {
  font-size: 18px;
  font-weight: 600;
  color: #134034;
  margin: 30px 0 12px;
  padding-left: 12px;
  border-left: 3px solid #047857;
  line-height: 1.5;
  letter-spacing: 0.2px;
}

/* 四级标题 · 翡翠字距标签 */
#wemd h4 {
  font-size: 14px;
  font-weight: 700;
  color: #047857;
  margin: 26px 0 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* 五级标题 */
#wemd h5 {
  font-size: 15px;
  font-weight: 600;
  color: #55605a;
  margin: 20px 0 8px;
  letter-spacing: 0.3px;
}

/* 六级标题:最次级墨灰,压深至对白底 ≥ AA 4.5:1 */
#wemd h6 {
  font-size: 14px;
  font-weight: 600;
  color: #606b64;
  margin: 18px 0 8px;
  letter-spacing: 0.5px;
}

/* 无序列表：翡翠符号 + 墨色内容 */
#wemd ul {
  padding-left: 24px;
  list-style-type: disc;
  color: #242a26;
}

#wemd ul li {
  padding-left: 6px;
  color: #047857;
}

#wemd ul li section {
  color: #242a26;
}

#wemd ul ul {
  list-style-type: circle;
}

#wemd ul ul ul {
  list-style-type: square;
}

/* 有序列表 */
#wemd ol {
  padding-left: 24px;
  list-style-type: decimal;
  color: #242a26;
}

#wemd ol li {
  padding-left: 6px;
  color: #047857;
}

#wemd li section {
  margin: 7px 0;
  line-height: 1.8;
  font-size: 16px;
  color: #242a26;
}

/* 一级引用：翡翠左锚 + 极浅翡翠底，右侧圆角 */
#wemd .multiquote-1 {
  border-left: 3px solid #047857;
  background: #f0f6f3;
  padding: 16px 20px;
  margin: 24px 0;
  color: #3f4a44;
  border-radius: 0 8px 8px 0;
  box-shadow: none;
}

#wemd .multiquote-1 p {
  margin: 0;
  font-size: 15.5px;
  color: #3f4a44;
  line-height: 1.8;
}

/* 二级引用（覆盖 basic 的投影） */
#wemd .multiquote-2 {
  border-left: 3px solid #065f46;
  background: #f6f8f7;
  padding: 14px 18px;
  margin: 18px 0;
  border-radius: 0 8px 8px 0;
  box-shadow: none;
}

#wemd .multiquote-2 p {
  margin: 0;
  font-size: 15px;
  color: #55605a;
  line-height: 1.75;
}

/* 三级引用（覆盖 basic 的投影） */
#wemd .multiquote-3 {
  border-left: 2px solid #86c9ae;
  background: #f6f8f7;
  padding: 12px 16px;
  margin: 14px 0;
  border-radius: 0 8px 8px 0;
  box-shadow: none;
}

#wemd .multiquote-3 p {
  margin: 0;
  font-size: 14px;
  color: #55605a;
}

/* 链接：翡翠 + 细下划线 */
#wemd a {
  color: #047857;
  text-decoration: none;
  border-bottom: 1px solid rgba(4, 120, 87, 0.4);
  font-weight: 500;
}

/* 加粗：墨色强调，不染色 */
#wemd strong {
  font-weight: 700;
  color: #12241c;
  letter-spacing: 0.2px;
}

/* 斜体：墨色 */
#wemd em {
  font-style: italic;
  color: #242a26;
}

/* 加粗斜体 */
#wemd em strong {
  font-weight: 700;
  font-style: italic;
  color: #12241c;
}

/* 删除线 */
#wemd del {
  text-decoration: line-through;
  color: #606b64;
}

/* 分隔线 · 居中短翡翠条 */
#wemd hr {
  border: none;
  height: 2px;
  width: 48px;
  background: #047857;
  margin: 34px auto;
}

/* 图片 */
#wemd img {
  display: block;
  margin: 24px auto;
  max-width: 100%;
  border-radius: 6px;
}

/* 图片描述 */
#wemd figcaption {
  text-align: center;
  font-size: 14px;
  color: #606b64;
  margin-top: 10px;
  letter-spacing: 0.2px;
}

/* 链接图片说明：覆盖基础主题的黑底悬浮样式 */
#wemd figure a + figcaption {
  margin-top: 10px;
  background: transparent;
  color: #606b64;
  line-height: 1.6;
}

/* 行内代码：浅翡翠底 + 翡翠墨字 */
#wemd p code, #wemd li code, #wemd td code, #wemd th code {
  background: #eef6f1;
  padding: 2px 6px;
  border-radius: 4px;
  color: #0f5c43;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 0.88em;
  margin: 0 2px;
  border: 1px solid #d4e8de;
}

/* 代码块容器：中性发丝边 */
#wemd pre code,
#wemd pre code.hljs {
  display: block;
  background: #f7f9f8;
  padding: 18px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 13.5px;
  line-height: 1.7;
  color: #334155;
  border: 1px solid #e4e9e6;
}

/* 表格 · 编辑式：去竖线，仅横向分隔，表头翡翠底线 */
#wemd table tr {
  border: none;
  background-color: transparent;
}

#wemd table tr th,
#wemd table tr td {
  border: none;
  border-bottom: 1px solid #e4e9e6;
  padding: 11px 14px;
  font-size: 15px;
  color: #242a26;
  line-height: 1.6;
  text-align: left;
}

#wemd table tr th {
  border-bottom: 2px solid #047857;
  background: transparent;
  color: #134034;
  font-weight: 700;
  letter-spacing: 0.3px;
}

#wemd table tr:nth-child(2n) {
  background-color: transparent;
}

#wemd table tr th:nth-of-type(n),
#wemd table tr td:nth-of-type(n){
  min-width: 100px;
}

/* 脚注 */
#wemd .footnote-word {
  color: #047857;
  font-weight: 500;
  border-bottom: 1px dashed rgba(4, 120, 87, 0.5);
}

#wemd .footnote-ref {
  color: #047857;
  font-weight: 600;
}

#wemd .footnotes-sep:before {
  content: "参考资料";
  font-weight: 700;
  margin-top: 38px;
  margin-bottom: 16px;
  display: block;
  font-size: 18px;
  color: #12241c;
  letter-spacing: 0.5px;
}

#wemd .footnote-num {
  display: inline-block;
  width: 24px;
  text-align: right;
  margin-right: 8px;
  color: #606b64;
  font-weight: 500;
}

#wemd .footnote-item p {
  display: inline;
  font-size: 14px;
  color: #55605a;
  line-height: 1.8;
}

#wemd .footnote-item p em {
  font-style: normal;
  color: #606b64;
  margin-left: 6px;
}

/* 行间公式 */
#wemd .block-equation > svg {
  display: block;
  margin: 20px auto;
  max-width: 300% !important;
}

/* 行内公式 */
#wemd .inline-equation > svg {
  vertical-align: middle;
}

/* Callout 提示块：扁平化，去投影渐变；语义色左边线由 basic 提供 */
#wemd .callout {
  margin: 26px 0;
  padding: 18px 20px;
  border-radius: 12px;
  box-shadow: none;
}

#wemd .callout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #12241c;
  font-size: 16px;
  letter-spacing: 0.03em;
}

#wemd .callout-icon {
  margin-right: 8px;
  font-size: 18px;
}

/* 提示类 callout 与主题强调色对齐，其余保持语义色 */
#wemd .callout-tip {
  border-left-color: #047857;
  background: #ecf6f1;
}

/* 高亮文本：柔和扁平 */
#wemd mark {
  background: #f6eec6;
  color: #1a1a1a;
  padding: 2px 5px;
  border-radius: 3px;
  font-weight: 500;
}

/* 上标 */
#wemd sup {
  font-size: 0.75em;
  vertical-align: super;
  color: #047857;
}

/* 下标 */
#wemd sub {
  font-size: 0.75em;
  vertical-align: sub;
  color: #047857;
}

/* Imageflow */
#wemd .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  border: 0px none;
  padding: 0px;
  overflow: hidden;
}

#wemd .imageflow-layer2 {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}

#wemd .imageflow-layer3 {
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  vertical-align: top;
  width: 80%;
  margin-right: 10px;
  flex-shrink: 0;
}

#wemd .imageflow-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
}

#wemd .imageflow-caption {
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  color: #888;
}
`;
