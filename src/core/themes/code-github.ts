export const codeGithubTheme = `/*
github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/

/* 代码块样式 - 需要添加 #mp 前缀以匹配包装后的 HTML */
#mp .hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  color: #333;
  background: #f8f8f8;
}

#mp .hljs-comment,
#mp .hljs-quote {
  color: #998;
  font-style: italic;
}

#mp .hljs-keyword,
#mp .hljs-selector-tag,
#mp .hljs-subst {
  color: #333;
  font-weight: bold;
}

#mp .hljs-number,
#mp .hljs-literal,
#mp .hljs-variable,
#mp .hljs-template-variable,
#mp .hljs-tag .hljs-attr {
  color: #008080;
}

#mp .hljs-string,
#mp .hljs-doctag {
  color: #d14;
}

#mp .hljs-title,
#mp .hljs-section,
#mp .hljs-selector-id {
  color: #900;
  font-weight: bold;
}

#mp .hljs-subst {
  font-weight: normal;
}

#mp .hljs-type,
#mp .hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

#mp .hljs-tag,
#mp .hljs-name,
#mp .hljs-attribute {
  color: #000080;
  font-weight: normal;
}

#mp .hljs-regexp,
#mp .hljs-link {
  color: #009926;
}

#mp .hljs-symbol,
#mp .hljs-bullet {
  color: #990073;
}

#mp .hljs-built_in,
#mp .hljs-builtin-name {
  color: #0086b3;
}

#mp .hljs-meta {
  color: #999;
  font-weight: bold;
}

#mp .hljs-deletion {
  background: #fdd;
}

#mp .hljs-addition {
  background: #dfd;
}

#mp .hljs-emphasis {
  font-style: italic;
}

#mp .hljs-strong {
  font-weight: bold;
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
