export const clearGuideTheme = `/* 清晰指南：教程与操作手册 */
#mp {
  max-width: 677px;
  margin: 0 auto;
  padding: 18px 24px;
  color: #263b3a;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 1.82;
  letter-spacing: 0.012em;
  word-break: break-word;
}

#mp p {
  margin: 0 0 21px;
  color: #263b3a;
  font-size: 16px;
  line-height: 1.82;
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
  margin: 24px 0 44px;
  padding: 0 0 18px;
  border: none;
  border-bottom: 8px solid #f0c94d;
  background: transparent;
}

#mp h1 .content {
  color: #172b29;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.4;
  text-wrap: balance;
}

#mp h2 {
  margin: 45px 0 23px;
  padding: 0 0 9px;
  border: none;
  border-bottom: 4px solid #172b29;
  background: transparent;
}

#mp h2 .content {
  color: #172b29;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 19px;
  font-weight: 750;
  text-wrap: balance;
}

#mp h3 {
  margin: 32px 0 16px;
  padding: 0;
  border-bottom: 1px dashed #8eb1ad;
}

#mp h3 .content {
  display: inline-block;
  padding: 0 0 6px;
  color: #075f58;
  background: transparent;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 17px;
  font-weight: 700;
  text-wrap: balance;
}

#mp h4,
#mp h5,
#mp h6 {
  margin: 27px 0 13px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #8eb1ad;
}

#mp h4 .content,
#mp h5 .content,
#mp h6 .content {
  color: #176c65;
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
  margin: 28px 0;
  padding: 18px 20px;
  border: 2px dashed #172b29;
  background: #fff7cf;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #31514f;
  font-size: 15px;
  line-height: 1.8;
}

#mp .multiquote-2,
#mp .multiquote-3,
#mp .multiquote-1 .multiquote-1 {
  margin: 12px 0 0;
  padding: 10px 0 0;
  border: none;
  border-top: 1px dashed #8eb1ad;
  background: transparent;
}

#mp ul,
#mp ol {
  margin: 20px 0 27px;
  padding-left: 25px;
  color: #087f75;
}

#mp li section {
  margin: 6px 0;
  color: #263b3a;
  line-height: 1.76;
}

#mp ol > li {
  margin: 14px 0;
  color: #087f75;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 20px;
  font-weight: 750;
}

#mp ol > li > section {
  padding: 2px 0 12px;
  border: none;
  border-bottom: 1px solid #b9d0cd;
  color: #263b3a;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  font-weight: 400;
}

#mp a {
  color: #06736a;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

#mp strong {
  color: #064c47;
  font-weight: 750;
}

#mp mark {
  padding: 1px 4px;
  color: #4f3a11;
  background: #f5dda1;
}

#mp hr {
  height: 1px;
  margin: 44px 0;
  border: none;
  background: #9bbdb9;
}

#mp figure {
  margin: 34px 0 39px;
  padding: 0;
  border: 2px solid #172b29;
  border-radius: 0;
  background: transparent;
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
}

#mp figcaption {
  margin-top: 0;
  padding: 9px 12px;
  color: #ffffff;
  background: #172b29;
  font-size: 12px;
  line-height: 1.65;
  text-align: left;
}

#mp p code,
#mp li code,
#mp td code,
#mp th code {
  padding: 2px 6px;
  border: 1px solid #b9d0cd;
  color: #075f58;
  background: #eaf3f2;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#mp pre {
  margin: 29px 0;
  border: 1px solid #183f3c;
  border-top: 6px solid #23a79b;
  background: #173330;
  overflow-x: auto;
}

#mp pre code,
#mp pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 19px 20px;
  color: #e8f4f2;
  background: #173330;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre;
}

#mp pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #365c58;
  background: #173330;
}

#mp .table-container {
  margin: 31px 0;
  overflow-x: auto;
}

#mp table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #172b29;
  color: #263b3a;
  background: #ffffff;
  text-align: left;
}

#mp table tr th,
#mp table tr td {
  min-width: 88px;
  padding: 10px;
  border: 1px solid #b9d0cd;
  font-size: 14px;
  line-height: 1.6;
}

#mp table tr th {
  color: #172b29;
  background: #f0c94d;
  font-weight: 700;
}

#mp table tr:nth-child(2n) {
  background: #eef6f5;
}

#mp .callout {
  margin: 29px 0;
  padding: 17px 18px;
  border: 2px solid #172b29;
  border-radius: 0;
  color: #263b3a;
  background: #ffffff;
  break-inside: avoid;
}

#mp .callout-warning {
  border-color: #8c6500;
  background: #fff6df;
}

#mp .callout-caution {
  border-color: #a43c31;
  background: #fff0ed;
}

#mp .callout-title {
  display: inline-block;
  margin-bottom: 9px;
  padding: 2px 7px;
  color: #ffffff;
  background: #172b29;
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
  color: #087f75;
  font-weight: 700;
}

#mp .footnotes-sep {
  margin-top: 47px;
  padding-top: 16px;
  border-top: 5px solid #087f75;
}

#mp .footnote-item {
  display: flex;
  margin-top: 9px;
}

#mp .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #087f75;
  font-weight: 700;
}

#mp .footnote-item p {
  margin: 0;
  color: #58716f;
  font-size: 13px;
}

#mp .block-equation {
  display: block;
  margin: 30px 0;
  padding: 18px 10px;
  border: 1px solid #b9d0cd;
  background: #f7faf9;
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
  border: 1px solid #93b8b4;
  border-top: 5px solid #087f75;
  background: #ffffff;
}

#mp .task-list-item {
  display: flex;
  align-items: flex-start;
  margin: 9px 0 9px -1.2em;
  padding: 9px 10px;
  border: 1px solid #c5d8d6;
  background: #f7faf9;
  list-style: none;
}

#mp .task-list-item input[type='checkbox'] {
  margin-top: 7px;
  margin-right: 8px;
  accent-color: #087f75;
  pointer-events: none;
}
`;
