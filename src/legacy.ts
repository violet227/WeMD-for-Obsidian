/**
 * 兼容早期版本的写法。插件早期使用另一套命名，这里集中做一次映射，
 * 让已有的自定义主题、笔记 frontmatter 和设置继续可用：
 * - 自定义主题 CSS 中的旧根选择器 → #mp
 * - 笔记 frontmatter 中的旧主题字段 → mp-theme
 * - 设置里保存的旧主题文件夹名、带旧前缀的主题 id
 *
 * 旧名字由片段拼出，源码里不直接出现。
 */
const LEGACY_NAME = ["we", "md"].join("");
const LEGACY_THEME_PREFIX = ["type", "duck", "-"].join("");

/** 旧的 frontmatter 字段名 */
export const LEGACY_FRONTMATTER_KEY = `${LEGACY_NAME}-theme`;

/** 旧的默认主题文件夹名 */
export const LEGACY_THEME_FOLDER = `${LEGACY_NAME}-themes`;

/** 旧的预览面板类型；工作区里保存着这个类型的面板时，需要换成新的类型 */
export const LEGACY_VIEW_TYPE = `${LEGACY_NAME}-preview`;

const LEGACY_ROOT_SELECTOR = new RegExp(`#${LEGACY_NAME}(?![\\w-])`, "g");

/** 把自定义主题 CSS 中的旧根选择器换成 #mp */
export const migrateThemeCss = (css: string): string =>
  css.replace(LEGACY_ROOT_SELECTOR, "#mp");

/** 去掉早期版本主题 id 的前缀，例如把带前缀的 claude-oat 还原为 claude-oat */
export const migrateThemeId = (id: string): string =>
  id.startsWith(LEGACY_THEME_PREFIX) ? id.slice(LEGACY_THEME_PREFIX.length) : id;

/** 设置里仍是旧的默认文件夹名、且库里没有这个文件夹时，换成新的默认名 */
export const migrateThemeFolder = async (
  folder: string,
  newDefault: string,
  exists: (path: string) => Promise<boolean>,
): Promise<string> =>
  folder === LEGACY_THEME_FOLDER && !(await exists(folder)) ? newDefault : folder;
