/**
 * 准备微信公众号能够保留的根背景画布。
 * 仅处理单根文章 section 的显式背景图，不改变正文内容树。
 */

export const hasExplicitBackgroundImage = (value: string): boolean => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;

  if (/^none(\s*,\s*none)*$/.test(normalized)) return false;
  if (
    normalized === "initial" ||
    normalized === "inherit" ||
    normalized === "unset" ||
    normalized === "revert" ||
    normalized === "revert-layer"
  ) {
    return false;
  }

  return true;
};

const BACKGROUND_LONGHAND_PROPERTIES = [
  "background-color",
  "background-image",
  "background-position",
  "background-size",
  "background-repeat",
  "background-origin",
  "background-clip",
  "background-attachment",
] as const;

const materializeRootBackgroundLonghands = (root: HTMLElement): void => {
  const shorthandPriority = root.style.getPropertyPriority("background");
  const declarations = BACKGROUND_LONGHAND_PROPERTIES.map((property) => ({
    property,
    value: root.style.getPropertyValue(property),
    priority:
      root.style.getPropertyPriority(property) ||
      shorthandPriority ||
      undefined,
  }));

  root.style.removeProperty("background");
  declarations.forEach(({ property, value, priority }) => {
    if (value) root.style.setProperty(property, value, priority);
  });
};

export const prepareRootBackgroundCanvasForWechat = (
  container: HTMLElement,
): boolean => {
  const root = container.firstElementChild;
  const shouldPreserve =
    root instanceof HTMLElement &&
    root.tagName === "SECTION" &&
    container.childElementCount === 1 &&
    hasExplicitBackgroundImage(root.style.getPropertyValue("background-image"));

  if (shouldPreserve) {
    materializeRootBackgroundLonghands(root);
  }

  return shouldPreserve;
};
