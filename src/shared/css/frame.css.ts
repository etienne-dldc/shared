import { ComplexStyleRule, createVar, globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { TDesignVariant, TPaletteColor } from "../design/types";
import {
  _after,
  _before,
  _disabled,
  _focusWithin,
  _focusWithinVisible,
  _hover,
  isAfter,
  isBefore,
  isDisabled,
  isFocusWithin,
  isHover,
} from "./conditions.css";
import { dynamicColorVars } from "./dynamicColor.css";
import { themeVars } from "./theme.css";
import { opacity, sizeToRemString } from "./utils";

export const borderWidthVar = createVar("border-width");
export const focusBorderWidthVar = createVar("focus-border-width");

export const frameClass = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  outline: "none",
  position: "relative",

  selectors: {
    // Used for visual border for input and surface variants
    [_before]: {
      borderRadius: "inherit",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: 0,
      borderWidth: borderWidthVar,
    },
    // Used for focus and highlight border
    [_after]: {
      borderRadius: "inherit",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: 0,
    },
  },
});

export const frameBorderSizeClass = styleVariants({
  solid: { vars: { [borderWidthVar]: sizeToRemString("0"), [focusBorderWidthVar]: sizeToRemString("0x") } },
  surface: { vars: { [borderWidthVar]: sizeToRemString("0__x"), [focusBorderWidthVar]: sizeToRemString("0_x") } },
  subtle: { vars: { [borderWidthVar]: sizeToRemString("0"), [focusBorderWidthVar]: sizeToRemString("0_x") } },
  ghost: { vars: { [borderWidthVar]: sizeToRemString("0"), [focusBorderWidthVar]: sizeToRemString("0_x") } },
  input: { vars: { [borderWidthVar]: sizeToRemString("0_x"), [focusBorderWidthVar]: sizeToRemString("0_x") } },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

export const frameVariantsClass = styleVariants({
  solid: {
    backgroundColor: dynamicColorVars[600],
    color: dynamicColorVars[200],
  },
  surface: {
    backgroundColor: opacity(themeVars.colors.white, 5),
    color: dynamicColorVars[200],
    selectors: {
      [_before]: {
        borderColor: opacity(themeVars.colors.white, 10),
      },
    },
  },
  subtle: {
    backgroundColor: opacity(themeVars.colors.white, 5),
    color: dynamicColorVars[200],
  },
  ghost: {
    color: dynamicColorVars[200],
  },
  input: {
    backgroundColor: opacity(themeVars.colors.black, 15),
    color: dynamicColorVars[200],
    selectors: {
      [_before]: {
        borderColor: opacity(themeVars.colors.black, 30),
      },
    },
  },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

export const frameInteractiveClass = style({
  selectors: {
    [_focusWithinVisible + isAfter]: {
      borderColor: themeVars.colors.neutral[300],
      borderWidth: focusBorderWidthVar,
    },
  },
});

globalStyle(`${frameClass} [data-item-main-icon]`, {
  opacity: 0.6,
});

globalStyle(`${frameInteractiveClass}${isHover} [data-item-main-icon]`, {
  opacity: 1,
});

globalStyle(`${frameInteractiveClass}${isHover}${isDisabled} [data-item-main-icon]`, {
  opacity: 0.6,
});

globalStyle(`${frameInteractiveClass}${isFocusWithin} [data-item-main-icon]`, {
  opacity: 1,
});

// Apply style to both disabled and disabled+hover states
const _disabledHover = _disabled + ", " + _disabled + isHover;

// Disabled styles based on variant
export const frameInteractiveVariantsClass = styleVariants({
  solid: {
    selectors: {
      [_disabledHover]: {
        backgroundColor: dynamicColorVars[800],
        color: opacity(themeVars.colors.neutral[200], 60),
      },
    },
  },
  surface: {
    selectors: {
      [_disabledHover]: {
        color: opacity(dynamicColorVars[200], 40),
        backgroundColor: opacity(themeVars.colors.white, 3),
      },
    },
  },
  subtle: {
    selectors: {
      [_disabledHover]: {
        color: opacity(dynamicColorVars[200], 40),
        backgroundColor: opacity(themeVars.colors.white, 3),
      },
    },
  },
  ghost: {
    selectors: {
      [_disabledHover]: {
        color: opacity(dynamicColorVars[200], 40),
        backgroundColor: "transparent",
      },
    },
  },
  input: {
    selectors: {
      [_disabledHover]: {
        color: opacity(dynamicColorVars[200], 40),
        backgroundColor: opacity(themeVars.colors.black, 3),
      },
      [_focusWithinVisible + isAfter]: {
        borderColor: opacity(dynamicColorVars[300], 40),
      },
    },
  },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

export const frameInteractiveHoverVariantsClass = styleVariants({
  solid: {
    selectors: {
      [_hover]: {
        backgroundColor: dynamicColorVars[500],
        color: themeVars.colors.neutral[100],
      },
      [_hover + isBefore]: {
        borderWidth: 0,
      },
      [_focusWithin]: {
        backgroundColor: dynamicColorVars[500],
        color: themeVars.colors.neutral[100],
      },
      [_focusWithin + isBefore]: {
        borderWidth: 0,
      },
      // Special focus style for solid variant
      [_focusWithinVisible]: {
        backgroundColor: dynamicColorVars[700],
        color: themeVars.colors.neutral[100],
      },
      [_focusWithinVisible + isAfter]: {
        borderColor: themeVars.colors.neutral[200],
        borderWidth: sizeToRemString("0x"),
      },
    },
  },
  surface: {
    [_hover]: {
      backgroundColor: opacity(themeVars.colors.white, 10),
      color: dynamicColorVars[100],
    },
    [_hover + isBefore]: {
      borderColor: opacity(themeVars.colors.white, 10),
    },
    [_focusWithin]: {
      backgroundColor: opacity(themeVars.colors.white, 10),
      color: dynamicColorVars[100],
    },
    [_focusWithin + isBefore]: {
      borderColor: opacity(themeVars.colors.white, 10),
    },
  },
  subtle: {
    [_hover]: {
      backgroundColor: opacity(themeVars.colors.white, 10),
      color: dynamicColorVars[100],
    },
    [_hover + isBefore]: {
      borderWidth: 0,
    },
    [_focusWithin]: {
      backgroundColor: opacity(themeVars.colors.white, 10),
      color: dynamicColorVars[100],
    },
    [_focusWithin + isBefore]: {
      borderWidth: 0,
    },
  },
  ghost: {
    [_hover]: {
      backgroundColor: opacity(themeVars.colors.white, 5),
      color: dynamicColorVars[100],
    },
    [_hover + isBefore]: {
      borderWidth: 0,
    },
    [_focusWithin]: {
      backgroundColor: opacity(themeVars.colors.white, 5),
      color: dynamicColorVars[100],
    },
    [_focusWithin + isBefore]: {
      borderWidth: 0,
    },
  },
  input: {
    [_hover]: {
      backgroundColor: opacity(themeVars.colors.black, 5),
      color: dynamicColorVars[100],
    },
    [_hover + isBefore]: {
      borderColor: opacity(themeVars.colors.black, 30),
    },
    [_focusWithin]: {
      backgroundColor: opacity(themeVars.colors.black, 5),
      color: dynamicColorVars[100],
    },
    [_focusWithin + isBefore]: {
      borderColor: opacity(themeVars.colors.black, 30),
    },
  },
} satisfies Record<TDesignVariant, ComplexStyleRule>);

export const frameHighlightClass = style({
  selectors: {
    [_after]: {
      borderWidth: sizeToRemString("0x"),
    },
  },
});

export const frameHighlightColorsClass = styleVariants({
  red: { selectors: { [_after]: { borderColor: themeVars.colors.red[600] } } },
  orange: { selectors: { [_after]: { borderColor: themeVars.colors.orange[600] } } },
  amber: { selectors: { [_after]: { borderColor: themeVars.colors.amber[600] } } },
  yellow: { selectors: { [_after]: { borderColor: themeVars.colors.yellow[600] } } },
  lime: { selectors: { [_after]: { borderColor: themeVars.colors.lime[600] } } },
  green: { selectors: { [_after]: { borderColor: themeVars.colors.green[600] } } },
  emerald: { selectors: { [_after]: { borderColor: themeVars.colors.emerald[600] } } },
  teal: { selectors: { [_after]: { borderColor: themeVars.colors.teal[600] } } },
  cyan: { selectors: { [_after]: { borderColor: themeVars.colors.cyan[600] } } },
  sky: { selectors: { [_after]: { borderColor: themeVars.colors.sky[600] } } },
  blue: { selectors: { [_after]: { borderColor: themeVars.colors.blue[600] } } },
  indigo: { selectors: { [_after]: { borderColor: themeVars.colors.indigo[600] } } },
  violet: { selectors: { [_after]: { borderColor: themeVars.colors.violet[600] } } },
  purple: { selectors: { [_after]: { borderColor: themeVars.colors.purple[600] } } },
  fuchsia: { selectors: { [_after]: { borderColor: themeVars.colors.fuchsia[600] } } },
  pink: { selectors: { [_after]: { borderColor: themeVars.colors.pink[600] } } },
  rose: { selectors: { [_after]: { borderColor: themeVars.colors.rose[600] } } },

  gray: { selectors: { [_after]: { borderColor: themeVars.colors.gray[600] } } },
  slate: { selectors: { [_after]: { borderColor: themeVars.colors.slate[600] } } },
  neutral: { selectors: { [_after]: { borderColor: themeVars.colors.neutral[600] } } },
  stone: { selectors: { [_after]: { borderColor: themeVars.colors.stone[600] } } },
  zinc: { selectors: { [_after]: { borderColor: themeVars.colors.zinc[600] } } },
} satisfies Record<TPaletteColor, ComplexStyleRule>);
