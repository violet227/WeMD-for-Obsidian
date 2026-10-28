/**
 * 准备微信公众号能够保留的根背景画布。
 * 根 section 有显式背景（背景图或不透明的背景色）时保留在根上，不改变正文内容树。
 * 背景色如果拆到每个段落上，段落之间的外边距会露出白底，背景不连续。
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

/** 不透明的纯色背景（transparent、全透明的 rgba/hsla/#RRGGBBAA 都不算） */
const hasOpaqueBackgroundColor = (value: string): boolean => {
  const normalized = value.replace(/\s+/g, "").toLowerCase();
  if (!normalized || normalized === "transparent") return false;
  if (/^(?:initial|inherit|unset|revert|revert-layer|currentcolor)$/.test(normalized)) return false;
  if (/^#[0-9a-f]{4}$/.test(normalized)) return normalized[4] !== "0";
  if (/^#[0-9a-f]{8}$/.test(normalized)) return normalized.slice(6, 8) !== "00";
  const alpha = normalized.match(/^(?:rgba|hsla)\((?:[^,]*,){3}([^)]+)\)$/)?.[1] ??
    normalized.match(/^(?:rgb|hsl)a?\([^/]*\/([^)]+)\)$/)?.[1];
  if (alpha !== undefined) return Number.parseFloat(alpha) > 0;
  return true;
};

export const prepareRootBackgroundCanvasForWechat = (
  container: HTMLElement,
): boolean => {
  const root = container.firstElementChild;
  const shouldPreserve =
    root instanceof HTMLElement &&
    root.tagName === "SECTION" &&
    container.childElementCount === 1 &&
    (hasExplicitBackgroundImage(root.style.getPropertyValue("background-image")) ||
      hasOpaqueBackgroundColor(root.style.getPropertyValue("background-color")));

  if (shouldPreserve) {
    materializeRootBackgroundLonghands(root);
  }

  return shouldPreserve;
};
