export const dataBlueprintTheme = `/* 数据蓝图：商业分析与数据复盘 */
#mp {
  max-width: 677px;
  margin: 0 auto;
  padding: 14px 20px;
  color: #203047;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 15px;
  line-height: 1.72;
  letter-spacing: 0.006em;
  font-variant-numeric: tabular-nums;
  word-break: break-word;
}

#mp p {
  margin: 0 0 18px;
  color: #203047;
  font-size: 15px;
  line-height: 1.72;
  text-align: left;
  text-wrap: pretty;
}

#mp h1,
#mp h2,
#mp h3,
#mp h4,
#mp h5,
#mp h6 {
  padding: 0;
  text-align: left;
}

#mp h1 {
  margin: 18px 0 34px;
  padding: 27px 24px 25px;
  border: none;
  background: #102b4e;
}

#mp h1 .content {
  color: #ffffff;
  font-size: 29px;
  font-weight: 800;
  line-height: 1.38;
  letter-spacing: 0.015em;
  text-wrap: balance;
}

#mp h2 {
  margin: 42px 0 20px;
  padding: 0 0 7px;
  border-bottom: 2px solid #173f7a;
  background: transparent;
}

#mp h2 .content {
  color: #173f7a;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
  text-wrap: balance;
}

#mp h3 {
  margin: 29px 0 14px;
  padding: 0;
  border: none;
}

#mp h3 .content {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #7790ac;
  color: #173f7a;
  background: #edf3f8;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 14px;
  font-weight: 700;
  text-wrap: balance;
}

#mp h4,
#mp h5,
#mp h6 {
  margin: 28px 0 13px;
}

#mp h4 .content,
#mp h5 .content,
#mp h6 .content {
  color: #365777;
  font-size: 16px;
  font-weight: 700;
}

#mp h1 .prefix,
#mp h1 .suffix,
#mp h2 .prefix,
#mp h2 .suffix,
#mp h3 .prefix,
#mp h3 .suffix,
#mp h4 .prefix,
#mp h4 .suffix,
#mp h5 .prefix,
#mp h5 .suffix,
#mp h6 .prefix,
#mp h6 .suffix {
  display: none;
}

#mp blockquote {
  border: none;
}

#mp .multiquote-1,
#mp .multiquote-2,
#mp .multiquote-3 {
  margin: 26px 0;
  padding: 15px 4px;
  border-top: 1px dashed #7790ac;
  border-bottom: 1px dashed #7790ac;
  background: transparent;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #314765;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 14px;
  line-height: 1.7;
}

#mp .multiquote-2,
#mp .multiquote-3,
#mp .multiquote-1 .multiquote-1 {
  margin: 10px 0 0;
  padding: 8px 0 0 12px;
  border-top: 1px dotted #aebdce;
  border-bottom: none;
}

#mp ul,
#mp ol {
  margin: 18px 0 24px;
  padding-left: 25px;
  color: #a84317;
}

#mp ul {
  list-style-type: square;
}

#mp ol {
  font-family: "SFMono-Regular", Consolas, monospace;
  list-style-type: decimal-leading-zero;
}

#mp li section {
  margin: 6px 0;
  color: #203047;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.68;
}

#mp ol > li > section {
  padding: 3px 0 9px;
  border-bottom: 1px dotted #aebdce;
}

#mp a {
  color: #175da8;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #8bb4df;
  text-underline-offset: 0.2em;
}

#mp strong {
  color: #142e55;
  font-weight: 750;
}

#mp mark {
  padding: 1px 4px;
  color: #633018;
  background: #f9d9c8;
}

#mp hr {
  height: 0;
  margin: 38px 0;
  border: none;
  border-top: 1px dashed #7790ac;
  background: transparent;
}

#mp figure {
  margin: 30px 0 36px;
  break-inside: avoid;
}

#mp figure a {
  border: none;
}

#mp img,
#mp figure a img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 5px;
  border: 1px solid #aebdce;
  background: #ffffff;
}

#mp figcaption {
  margin-top: 0;
  padding: 8px 10px;
  color: #536a84;
  background: #edf3f8;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  line-height: 1.6;
  text-align: left;
}

#mp p code,
#mp li code,
#mp td code,
#mp th code {
  padding: 2px 6px;
  border: 1px solid #c7d2df;
  color: #174f8f;
  background: #eef3f8;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#mp pre {
  margin: 30px 0;
  border: 1px solid #173f7a;
  border-top: 6px solid #a84317;
  background: #13233a;
  overflow-x: auto;
}

#mp pre code,
#mp pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 19px 20px;
  color: #eaf1f8;
  background: #13233a;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
}

#mp pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #35506e;
  background: #13233a;
}

#mp .table-container {
  margin: 32px 0;
  overflow-x: auto;
}

#mp table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #173f7a;
  color: #26354d;
  background: #ffffff;
  font-variant-numeric: tabular-nums;
  text-align: left;
}

#mp table tr th,
#mp table tr td {
  min-width: 88px;
  padding: 11px 10px;
  border: 1px solid #c9d4e0;
  font-size: 14px;
  line-height: 1.6;
}

#mp table tr th {
  color: #ffffff;
  background: #173f7a;
  font-weight: 700;
}

#mp table tr:nth-child(2n) {
  background: #f0f4f8;
}

#mp .callout {
  margin: 30px 0;
  padding: 17px 19px;
  border: 1px dashed #7790ac;
  border-radius: 0;
  color: #26354d;
  background: transparent;
  break-inside: avoid;
}

#mp .callout-warning,
#mp .callout-caution {
  border-color: #a84317;
  background: #fff0e8;
}

#mp .callout-title {
  margin-bottom: 7px;
  color: #173f7a;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  font-weight: 750;
}

#mp .callout p {
  margin: 0;
  font-size: 15px;
}

#mp .footnote-word,
#mp .footnote-ref {
  color: #175da8;
  font-weight: 700;
}

#mp .footnotes-sep {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 6px solid #173f7a;
}

#mp .footnote-item {
  display: flex;
  margin-top: 9px;
}

#mp .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #a84317;
  font-weight: 700;
}

#mp .footnote-item p {
  margin: 0;
  color: #5b6e85;
  font-size: 13px;
  text-align: left;
}

#mp .block-equation {
  display: block;
  margin: 30px 0;
  padding: 18px 10px;
  border: 1px solid #c9d4e0;
  background: #f7f9fb;
  text-align: center;
  overflow-x: auto;
}

#mp .block-equation > svg {
  max-width: 300% !important;
}

#mp .inline-equation > svg {
  vertical-align: middle;
}

#mp pre.mermaid {
  padding: 20px 10px;
  border: 1px solid #aebdce;
  border-top: 6px solid #173f7a;
  background: #ffffff;
}

#mp .task-list-item {
  display: flex;
  align-items: flex-start;
  margin-left: -1.2em;
  list-style: none;
}

#mp .task-list-item input[type='checkbox'] {
  margin-top: 7px;
  margin-right: 8px;
  accent-color: #173f7a;
  pointer-events: none;
}
`;
