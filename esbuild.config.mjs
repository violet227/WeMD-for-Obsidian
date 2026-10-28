import esbuild from "esbuild";
import builtins from "builtin-modules";
import fs from "node:fs";
import path from "node:path";

const prod = process.argv[2] === "production";

// src/core 按 markdown-it 12 的路径引用 lib/token 等；markdown-it 14 改成了 .mjs
const markdownItLibPlugin = {
  name: "markdown-it-lib",
  setup(build) {
    build.onResolve({ filter: /^markdown-it\/lib\/.+/ }, (args) => {
      if (args.path.endsWith(".mjs")) return;
      return build.resolve(`${args.path}.mjs`, {
        kind: args.kind,
        resolveDir: args.resolveDir,
      });
    });
  },
};

// CSS 以文本导入；KaTeX 的 woff2 字体内联为 data URI，去掉 woff/ttf 回退
const cssTextPlugin = {
  name: "css-text",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const dir = path.dirname(args.path);
      let css = await fs.promises.readFile(args.path, "utf8");
      css = css.replace(
        /src:\s*url\(([^)]+\.woff2)\)\s*format\("woff2"\)[^;}]*/g,
        (_m, rel) => {
          const data = fs.readFileSync(path.join(dir, rel)).toString("base64");
          return `src:url(data:font/woff2;base64,${data}) format("woff2")`;
        },
      );
      return { contents: css, loader: "text" };
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/*",
    "@lezer/*",
    ...builtins,
  ],
  format: "cjs",
  target: "es2020",
  platform: "browser",
  mainFields: ["browser", "module", "main"],
  plugins: [markdownItLibPlugin, cssTextPlugin],
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  minify: prod,
  outfile: "main.js",
});

if (prod) {
  await ctx.rebuild();
  process.exit(0);
} else {
  await ctx.watch();
}
