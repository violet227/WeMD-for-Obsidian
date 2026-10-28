export const easternNotesTheme = `/* 东方笺谱：现代人文长文 */
#mp {
  max-width: 677px;
  margin: 0 auto;
  padding: 24px 28px;
  color: #36322f;
  background-color: transparent;
  font-family: "Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif;
  font-size: 17px;
  line-height: 2.06;
  letter-spacing: 0.045em;
  word-break: break-word;
}

#mp p {
  margin: 0 0 29px;
  color: #36322f;
  font-size: 17px;
  line-height: 2.06;
  text-align: justify;
  text-wrap: pretty;
}

#mp h1,
#mp h2,
#mp h3,
#mp h4,
#mp h5,
#mp h6 {
  text-align: left;
}

#mp h1 {
  max-width: 7em;
  margin: 38px 0 72px auto;
  padding: 0 8px 0 0;
  border: none;
  text-align: right;
}

#mp h1::after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  margin: 24px 0 0 auto;
  background: #a33a2b;
}

#mp h1 .content {
  display: inline-block;
  max-width: 100%;
  color: #282522;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.18em;
  text-wrap: balance;
}

#mp h2 {
  margin: 58px 0 30px;
  padding: 0 8px 0 0;
  border: none;
  text-align: right;
}

#mp h2::before {
  content: "◆";
  display: block;
  margin-bottom: 8px;
  color: #a33a2b;
  font-size: 9px;
  text-align: right;
}

#mp h2 .content {
  color: #a33a2b;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-wrap: balance;
}

#mp h3 {
  margin: 40px 0 21px 2em;
}

#mp h3 .content {
  display: inline;
  padding: 0;
  color: #a33a2b;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.1em;
  text-wrap: balance;
}

#mp h4,
#mp h5,
#mp h6 {
  margin: 29px 0 14px;
  padding: 0;
  border: none;
}

#mp h4 .content,
#mp h5 .content,
#mp h6 .content {
  color: #514841;
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
  margin: 46px 8px;
  padding: 8px 24px;
  border: none;
  background: transparent;
}

#mp .multiquote-1::before {
  content: "“";
  display: block;
  color: #a33a2b;
  font-size: 42px;
  line-height: 0.8;
  text-align: center;
}

#mp .multiquote-1 p,
#mp .multiquote-2 p,
#mp .multiquote-3 p {
  margin: 0;
  color: #564c45;
  font-size: 18px;
  line-height: 2;
  text-align: center;
}

#mp .multiquote-2,
#mp .multiquote-3,
#mp .multiquote-1 .multiquote-1 {
  margin: 12px 0 0;
  padding: 8px 0 0;
  border: none;
}

#mp .multiquote-1 .multiquote-1::before {
  display: none;
}

#mp ul,
#mp ol {
  margin: 22px 0 28px;
  padding-left: 25px;
  color: #a33a2b;
}

#mp li section {
  margin: 7px 0;
  color: #36322f;
  line-height: 1.88;
}

#mp ol > li > section {
  padding: 3px 0 9px;
  border: none;
  border-bottom: 1px dotted #bfb4aa;
  background: transparent;
}

#mp a {
  color: #8c3025;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #c99087;
  text-underline-offset: 0.22em;
}

#mp strong {
  color: #272320;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #d9aaa2;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
}

#mp mark {
  padding: 1px 4px;
  color: #4f2822;
  background: #efd9d4;
}

#mp hr {
  width: 8px;
  height: 8px;
  margin: 64px auto;
  border: none;
  background: #a33a2b;
}

#mp figure {
  margin: 48px 0 54px;
  padding: 0;
  border: none;
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
  margin-top: 12px;
  color: #746860;
  font-size: 12px;
  line-height: 1.8;
  letter-spacing: 0.08em;
  text-align: right;
}

#mp p code,
#mp li code,
#mp td code,
#mp th code {
  padding: 2px 6px;
  border: 1px solid #d4cbc3;
  color: #8c3025;
  background: #f1eeea;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
}

#mp pre {
  margin: 32px 0;
  border: 1px solid #403a35;
  border-top: 6px solid #a33a2b;
  background: #2e2a27;
  overflow-x: auto;
}

#mp pre code,
#mp pre code.hljs {
  display: block;
  min-width: max-content;
  padding: 20px;
  color: #f0ece7;
  background: #2e2a27;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  line-height: 1.72;
  white-space: pre;
}

#mp pre.custom > .mac-sign {
  display: block;
  border-bottom: 1px solid #5d554e;
  background: #2e2a27;
}

#mp .table-container {
  margin: 34px 0;
  overflow-x: auto;
}

#mp table {
  width: 100%;
  border-collapse: collapse;
  color: #3d3732;
  background: #faf9f7;
  text-align: left;
}

#mp table tr th,
#mp table tr td {
  min-width: 88px;
  padding: 11px 10px;
  border: none;
  border-bottom: 1px solid #cfc6be;
  font-size: 14px;
  line-height: 1.65;
}

#mp table tr th {
  border-top: 1px solid #5a4e46;
  border-bottom: 2px solid #5a4e46;
  color: #a33a2b;
  background: transparent;
  font-weight: 700;
}

#mp table tr:nth-child(2n) {
  background: #f0ede9;
}

#mp .callout {
  margin: 31px 0;
  padding: 18px 4px;
  border: none;
  border-top: 1px dotted #8f8177;
  border-bottom: 1px dotted #8f8177;
  border-radius: 0;
  color: #4a423c;
  background: transparent;
  break-inside: avoid;
}

#mp .callout-warning,
#mp .callout-caution {
  border-color: #a33a2b;
  background: transparent;
}

#mp .callout-title {
  margin-bottom: 8px;
  color: #5a2d26;
  font-weight: 700;
}

#mp .callout p {
  margin: 0;
  color: #564c45;
  font-size: 15px;
}

#mp .footnote-word,
#mp .footnote-ref {
  color: #a33a2b;
  font-weight: 700;
}

#mp .footnotes-sep {
  margin-top: 52px;
  padding-top: 18px;
  border-top: 4px double #4c4640;
}

#mp .footnote-item {
  display: flex;
  margin-top: 9px;
}

#mp .footnote-num {
  width: 30px;
  flex-shrink: 0;
  color: #a33a2b;
}

#mp .footnote-item p {
  margin: 0;
  color: #746860;
  font-size: 13px;
  text-align: left;
}

#mp .block-equation {
  display: block;
  margin: 32px 0;
  padding: 19px 10px;
  border-top: 1px solid #cfc6be;
  border-bottom: 1px solid #cfc6be;
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
  border: 1px solid #c2b7ae;
  border-top: 5px solid #a33a2b;
  background: #faf9f7;
}

#mp .task-list-item {
  display: flex;
  align-items: flex-start;
  margin-left: -1.2em;
  list-style: none;
}

#mp .task-list-item input[type='checkbox'] {
  margin-top: 8px;
  margin-right: 8px;
  accent-color: #a33a2b;
  pointer-events: none;
}
`;
