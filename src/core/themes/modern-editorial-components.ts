export const modernEditorialComponentsTheme = `/* 代码块 */
#mp pre {
  margin: 32px 0;
  border-top: 5px solid #c76237;
  border-radius: 1px;
  background: #23251f;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

#mp pre.custom {
  overflow: hidden;
  overflow-x: auto;
}

#mp pre code,
#mp pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 20px 21px;
  border-radius: 0;
  color: #e8e6dd;
  background: #23251f;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 13px;
  line-height: 1.72;
  white-space: pre;
}

#mp pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #3d4037;
  background: #23251f;
}

#mp pre code.hljs .hljs-comment,
#mp pre code.hljs .hljs-quote {
  color: #999c90;
}

#mp pre code.hljs .hljs-keyword,
#mp pre code.hljs .hljs-selector-tag,
#mp pre code.hljs .hljs-meta {
  color: #f09a6d;
}

#mp pre code.hljs .hljs-string,
#mp pre code.hljs .hljs-doctag,
#mp pre code.hljs .hljs-regexp {
  color: #afc89f;
}

#mp pre code.hljs .hljs-number,
#mp pre code.hljs .hljs-literal,
#mp pre code.hljs .hljs-symbol {
  color: #dfbe76;
}

#mp pre code.hljs .hljs-title,
#mp pre code.hljs .hljs-section,
#mp pre code.hljs .hljs-type {
  color: #91bec8;
}

/* 数据表 */
#mp .table-container {
  margin: 34px 0;
  border-top: 5px solid #c76237;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

#mp table {
  width: 100%;
  border-collapse: collapse;
  color: #34362f;
  background: #f7f6f0;
  text-align: left;
}

#mp table tr {
  border: none;
  background: transparent;
}

#mp table tr th,
#mp table tr td {
  min-width: 88px;
  padding: 12px 11px;
  border: none;
  border-bottom: 1px solid #d3d3c8;
  color: #41443a;
  background: transparent;
  font-size: 14px;
  line-height: 1.62;
  text-align: left;
}

#mp table tr th {
  color: #f2f0e7;
  background: #34372f;
  font-weight: 700;
  letter-spacing: 0.035em;
}

#mp table tr:nth-child(2n) {
  background: #ecebe3;
}

/* 编辑部提示 */
#mp .callout {
  margin: 32px 0;
  padding: 19px 21px;
  border: 1px solid #cecec3;
  border-left: 5px solid #626754;
  border-radius: 1px;
  color: #41443a;
  background: #f1f0e9;
  box-shadow: none;
}

#mp .callout-title {
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  color: #34372f;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.055em;
}

#mp .callout-icon {
  margin-right: 8px;
  font-size: 15px;
}

#mp .callout p {
  margin: 0;
  color: #505348;
  font-size: 15px;
  line-height: 1.8;
}

#mp .callout-warning,
#mp .callout-caution {
  border-left-color: #c76237;
  background: #f5ebe4;
}

/* 参考资料 */
#mp .footnote-word,
#mp .footnote-ref {
  color: #9f4828;
  font-weight: 600;
}

#mp .footnotes-sep {
  margin-top: 52px;
  padding-top: 20px;
  border-top: 5px solid #34372f;
}

#mp .footnotes-sep:before {
  display: block;
  content: "参考资料";
  color: #34372f;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.045em;
}

#mp .footnote-item {
  display: flex;
  margin-top: 10px;
}

#mp .footnote-num {
  width: 31px;
  flex-shrink: 0;
  color: #c76237;
  font-size: 13px;
  line-height: 1.75;
}

#mp .footnote-item p {
  width: auto;
  margin: 0;
  color: #74776d;
  font-size: 13px;
  line-height: 1.75;
  text-align: left;
}

/* 公式、图表和任务列表 */
#mp .block-equation {
  display: block;
  margin: 34px 0;
  padding: 20px 10px;
  border-top: 1px solid #cecec3;
  border-bottom: 1px solid #cecec3;
  text-align: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

#mp .block-equation > svg {
  max-width: 300% !important;
}

#mp .inline-equation {
  display: inline;
}

#mp .inline-equation > svg {
  vertical-align: middle;
}

#mp pre.mermaid {
  padding: 22px 12px;
  border: 1px solid #cecec3;
  border-top: 5px solid #626754;
  background: #f7f6f0;
}

#mp .task-list-item {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-left: -1.2em;
  list-style: none;
}

#mp .task-list-item input[type='checkbox'] {
  margin-top: 7px;
  margin-right: 8px;
  pointer-events: none;
}
`;
