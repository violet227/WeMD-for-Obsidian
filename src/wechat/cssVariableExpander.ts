/**
 * 纯文本级别的 CSS 变量展开
 * 将 CSS 中的 var(--wemd-*) 引用替换为具体值，消除对运行时 DOM 的依赖
 */
import {
  findNextVarStart,
  findMatchingParen,
  splitVarArgs,
} from "./cssVarParser";

/**
 * 逐字符扫描 CSS 文本，统一维护引号、转义与注释状态，
 * 供声明切分、注释移除与规则块切分共用。
 * 注释、字符串及转义序列中的特殊字符不会触发 onChar 之外的逻辑。
 */
type CssCharKind = "plain" | "string" | "escape";

interface CssScanHandlers {
  /** 每个逻辑字符回调，kind 标识其上下文 */
  onChar: (char: string, index: number, kind: CssCharKind) => void;
  /** 遇到注释开始（/* 位置）时回调 */
  onCommentStart?: (index: number) => void;
}

const scanCss = (css: string, handlers: CssScanHandlers): void => {
  let quote: "'" | '"' | null = null;
  let escapeNext = false;
  let inComment = false;

  for (let index = 0; index < css.length; index += 1) {
    const char = css[index];
    const next = css[index + 1];

    if (inComment) {
      if (char === "*" && next === "/") {
        inComment = false;
        index += 1;
      }
      continue;
    }

    if (escapeNext) {
      handlers.onChar(char, index, "escape");
      escapeNext = false;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        escapeNext = true;
        handlers.onChar(char, index, "string");
        continue;
      }
      handlers.onChar(char, index, "string");
      if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "*") {
      inComment = true;
      handlers.onCommentStart?.(index);
      index += 1;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
    }
    handlers.onChar(char, index, "plain");
  }
};

/**
 * 从 CSS 规则块体（去掉外层花括号）中按顶层分号切分声明
 * 注释、字符串、转义与嵌套括号/花括号中的分号不参与切分
 */
const splitCssDeclarations = (body: string): string[] => {
  const declarations: string[] = [];
  let start = 0;
  let parenthesisDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;

  scanCss(body, {
    onChar: (char, index, kind) => {
      // 字符串与转义内的字符不参与声明切分
      if (kind !== "plain") return;
      if (char === "(") parenthesisDepth += 1;
      else if (char === ")")
        parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      else if (char === "[") bracketDepth += 1;
      else if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      else if (char === "{") braceDepth += 1;
      else if (char === "}") braceDepth = Math.max(0, braceDepth - 1);
      else if (
        char === ";" &&
        parenthesisDepth === 0 &&
        bracketDepth === 0 &&
        braceDepth === 0
      ) {
        declarations.push(body.slice(start, index));
        start = index + 1;
      }
    },
  });

  declarations.push(body.slice(start));
  return declarations;
};

const removeCssComments = (value: string): string => {
  let output = "";
  scanCss(value, {
    // 注释替换为单个空格，避免前后内容粘连
    onCommentStart: () => {
      output += " ";
    },
    onChar: (char) => {
      output += char;
    },
  });
  return output;
};

const parseCustomPropertyDeclaration = (
  declaration: string,
): [string, string] | null => {
  const normalized = removeCssComments(declaration).trim();
  const match = normalized.match(/^(--[\w-]+)\s*:\s*([\s\S]*)$/);
  if (!match) return null;
  return [match[1], match[2].trim()];
};

/**
 * 将 CSS 文本切分为规则块，返回 [选择器, 块体] 对
 * 注释、字符串、转义中的花括号不参与判定；支持嵌套块（内层花括号不干扰外层闭合）
 */
interface CssRuleBlock {
  selector: string;
  body: string;
  /** 块起始位置（选择器开头） */
  start: number;
  /** 块结束位置（闭花括号之后） */
  end: number;
}

const splitCssRuleBlocks = (css: string): CssRuleBlock[] => {
  const blocks: CssRuleBlock[] = [];
  let selectorStart = 0;
  let braceDepth = 0;
  let block: CssRuleBlock | null = null;

  scanCss(css, {
    onChar: (char, index, kind) => {
      // 字符串与转义内的花括号不参与规则块判定
      if (kind !== "plain") return;
      if (char === "{") {
        if (braceDepth === 0) {
          block = {
            selector: css.slice(selectorStart, index),
            body: "",
            start: selectorStart,
            end: -1,
          };
          blocks.push(block);
        }
        braceDepth += 1;
      } else if (char === "}") {
        if (braceDepth === 1 && block) {
          block.body = css.slice(
            block.start + block.selector.length + 1,
            index,
          );
          block.end = index + 1;
          selectorStart = index + 1;
        }
        braceDepth = Math.max(0, braceDepth - 1);
      }
    },
  });

  return blocks;
};

const extractCustomProperties = (css: string): Map<string, string> => {
  const vars = new Map<string, string>();
  splitCssRuleBlocks(css).forEach((block) => {
    splitCssDeclarations(block.body).forEach((declaration) => {
      const customProperty = parseCustomPropertyDeclaration(declaration);
      if (customProperty) vars.set(...customProperty);
    });
  });
  return vars;
};

/**
 * 递归展开字符串中的所有 var() 引用
 */
const resolveVarReferences = (
  value: string,
  vars: Map<string, string>,
  resolving: Set<string>,
): string => {
  let result = "";
  let cursor = 0;

  while (cursor < value.length) {
    const varIndex = findNextVarStart(value, cursor);
    if (varIndex < 0) {
      result += value.slice(cursor);
      break;
    }

    result += value.slice(cursor, varIndex);

    const openParen = varIndex + 3;
    const closeIndex = findMatchingParen(value, openParen);
    if (closeIndex < 0) {
      result += value.slice(varIndex);
      break;
    }

    const rawArgs = value.slice(openParen + 1, closeIndex);
    const [varName, fallback] = splitVarArgs(rawArgs);

    let replacement: string | null = null;

    if (varName.startsWith("--") && !resolving.has(varName)) {
      const varValue = vars.get(varName);
      if (varValue !== undefined) {
        const nextResolving = new Set(resolving);
        nextResolving.add(varName);
        const resolved = resolveVarReferences(varValue, vars, nextResolving);
        if (resolved.includes("var(") && fallback) {
          replacement = resolveVarReferences(
            fallback,
            vars,
            new Set(resolving),
          );
        } else {
          replacement = resolved;
        }
      } else if (fallback) {
        replacement = resolveVarReferences(fallback, vars, new Set(resolving));
      }
    } else if (fallback) {
      replacement = resolveVarReferences(fallback, vars, new Set(resolving));
    }

    result += replacement ?? `var(${rawArgs})`;
    cursor = closeIndex + 1;
  }

  return result;
};

/**
 * 移除 CSS 规则块中的自定义属性声明行，保留其他属性
 * 如果清理后规则块为空，整个规则块会被移除
 */
const stripCustomPropertyDeclarations = (css: string): string => {
  let result = "";
  let cursor = 0;

  splitCssRuleBlocks(css).forEach((block) => {
    const lines = splitCssDeclarations(block.body)
      .map((line) => line.trim())
      .filter(
        (line) =>
          removeCssComments(line).trim().length > 0 &&
          parseCustomPropertyDeclaration(line) === null,
      );
    // 块前文本原样保留
    result += css.slice(cursor, block.start);
    if (lines.length === 0) {
      // 清理后为空块：整体移除
      cursor = block.end;
      return;
    }
    result += `${block.selector.trim()} { ${lines.join("; ")}; }`;
    cursor = block.end;
  });

  result += css.slice(cursor);
  return result;
};

/**
 * 对 CSS 文本进行纯文本级别的变量展开
 * 1. 提取所有 --* 变量声明
 * 2. 将所有 var(--*) 引用替换为具体值
 * 3. 移除变量声明（微信不支持 CSS 变量）
 */
export const expandCSSVariables = (css: string): string => {
  if (!css) return css;

  const hasVar = css.includes("var(");
  const vars = extractCustomProperties(css);
  const hasCustomProps = vars.size > 0;

  if (!hasVar && !hasCustomProps) return css;

  let expanded = css;

  if (hasVar) {
    const resolvedVars = new Map<string, string>();
    for (const [name, value] of vars) {
      resolvedVars.set(
        name,
        resolveVarReferences(value, vars, new Set([name])),
      );
    }
    expanded = resolveVarReferences(expanded, resolvedVars, new Set());
  }

  if (hasCustomProps) {
    expanded = stripCustomPropertyDeclarations(expanded);
  }

  return expanded;
};
