import { ComplexStyleRule, createVar, globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { _after, _betweenChild, _firstChild, _lastChild, isAfter, isBefore, isHover } from "./conditions.css";
import { dynamicColorVars } from "./dynamicColor.css";
import { frameInteractiveClass } from "./frame.css";
import { themeVars } from "./theme.css";
import { TDesignVariant } from "./types";
import { opacity, sizeToRemString } from "./utils";

export const separatorWidthVar = createVar(
  { syntax: "length", initialValue: sizeToRemString("0_x"), inherits: true },
  "separator-width",
);

export const frameGroupClass = style({
  display: "inline-flex",
  position: "relative",
  isolation: "isolate",
});

/**
 * Set separator width based on variant
 */
export const frameGroupVariantsClass = styleVariants({
  solid: { vars: { [separatorWidthVar]: sizeToRemString("0_x") } },
  surface: { vars: { [separatorWidthVar]: sizeToRemString("0__x") } },
  subtle: { vars: { [separatorWidthVar]: sizeToRemString("0_x") } },
  ghost: { vars: { [separatorWidthVar]: sizeToRemString("0_x") } },
  input: { vars: { [separatorWidthVar]: sizeToRemString("0_x") } },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

/**
 * Ensure children have higher z-index than separators
 * This is important when the after/border is on top of the separator
 */
globalStyle(`${frameGroupClass} ${_firstChild}`, { zIndex: 2, position: "relative" });
globalStyle(`${frameGroupClass} ${_betweenChild}`, { zIndex: 2, position: "relative" });
globalStyle(`${frameGroupClass} ${_lastChild}`, { zIndex: 2, position: "relative" });

export const frameGroupDirectionClass = styleVariants({
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },
});

const CHILD_CASES = [
  {
    baseClass: frameGroupDirectionClass.horizontal,
    TopRight: "TopRight",
    BottomRight: "BottomRight",
    TopLeft: "TopLeft",
    BottomLeft: "BottomLeft",
    Right: "Right",
    Left: "Left",
    right: "right",
    left: "left",
  },
  {
    baseClass: frameGroupDirectionClass.vertical,
    TopRight: "BottomRight",
    BottomRight: "BottomLeft",
    TopLeft: "TopRight",
    BottomLeft: "TopLeft",
    Right: "Bottom",
    Left: "Top",
    right: "bottom",
    left: "top",
  },
];

CHILD_CASES.forEach(({ baseClass, TopRight, BottomRight, BottomLeft, TopLeft, Right, Left, right, left }) => {
  // Remove radius inside
  globalStyle(`${baseClass} ${_firstChild}`, { [`border${TopRight}Radius`]: 0, [`border${BottomRight}Radius`]: 0 });
  globalStyle(`${baseClass} ${_betweenChild}`, { borderRadius: 0 });
  globalStyle(`${baseClass} ${_lastChild}`, { [`border${TopLeft}Radius`]: 0, [`border${BottomLeft}Radius`]: 0 });

  // Remove border inside
  globalStyle(`${baseClass} ${_firstChild + isBefore}`, { [`border${Right}Width`]: 0 });
  globalStyle(`${baseClass} ${_betweenChild + isBefore}`, { [`border${Left}Width`]: 0, [`border${Right}Width`]: 0 });
  globalStyle(`${baseClass} ${_lastChild + isBefore}`, { [`border${Left}Width`]: 0 });

  // Align focus border with separator outside
  globalStyle(`${baseClass} ${_firstChild + isAfter}`, { [right]: calc.negate(separatorWidthVar) });
  globalStyle(`${baseClass} ${_betweenChild + isAfter}`, {
    [left]: calc.negate(separatorWidthVar),
    [right]: calc.negate(separatorWidthVar),
  });
  globalStyle(`${baseClass} ${_lastChild + isAfter}`, { [left]: calc.negate(separatorWidthVar) });
});

export const frameGroupSeparatorClass = style({
  alignSelf: "stretch",
  position: "relative",
  zIndex: 1,
  selectors: {
    [_after]: {
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: 0,
    },
  },
});

export const frameGroupSeparatorDirectionClass = styleVariants({
  horizontal: { width: separatorWidthVar },
  vertical: { height: separatorWidthVar },
});

export const frameGroupSeparatorVariantClass = styleVariants({
  solid: {
    backgroundColor: dynamicColorVars[700],
  },
  surface: {
    backgroundColor: opacity(themeVars.colors.white, 5),
    selectors: {
      [_after]: {
        backgroundColor: opacity(themeVars.colors.white, 10),
      },
    },
  },
  subtle: {},
  ghost: {},
  input: {
    backgroundColor: opacity(themeVars.colors.black, 15),
    selectors: {
      [_after]: {
        backgroundColor: opacity(themeVars.colors.black, 30),
      },
    },
  },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

/**
 * Special case for Surface variant: when a frame is hovered rigth before of after the separator,
 * the separator :before should have same color as the hovered frame border
 */
globalStyle(`${frameGroupSeparatorVariantClass.surface}:has(+ ${frameInteractiveClass + isHover})`, {
  backgroundColor: opacity(themeVars.colors.white, 10),
});

globalStyle(`${frameInteractiveClass + isHover} + ${frameGroupSeparatorVariantClass.surface}`, {
  backgroundColor: opacity(themeVars.colors.white, 10),
});
