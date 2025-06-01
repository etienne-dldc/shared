import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignCrossSize, TDesignVariant } from "../core/DesignContext";

export const buttonLikeClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    rounded: "1_x",
    outline: "none",
    position: "relative",
    _after: {
      rounded: "1_x",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: "0",
      borderRadius: "[inherit]",
    },
  },
  variants: {
    crossSize: {
      "2x": { minH: "2x", textStyle: "f2x" },
      "3": { minH: "3", textStyle: "f3" },
      "3x": { minH: "3x", textStyle: "f3x" },
      "4": { minH: "4", textStyle: "f4" },
      "4x": { minH: "4x", textStyle: "f4x" },
      "5": { minH: "5", textStyle: "f5" },
      "6": { minH: "6", textStyle: "f6" },
      "7": { minH: "7", textStyle: "f7" },
      "8": { minH: "8", textStyle: "f8" },
      "10": { minH: "10", textStyle: "f10" },
      "12": { minH: "12", textStyle: "f12" },
    } satisfies Record<TDesignCrossSize, SystemStyleObject>,
    variant: {
      solid: {
        bg: "colorPalette.600",
        color: "neutral.200",
      },
      surface: {
        bg: "white/5",
        color: "colorPalette.200",
        _after: {
          borderColor: "neutral.800",
          borderWidth: "0_x",
        },
      },
      subtle: { bg: "white/5", color: "colorPalette.200" },
      ghost: { color: "colorPalette.200" },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});

export const buttonClass = cva({
  base: {
    '& [data-slot="start-icon"]': {
      opacity: 0.6,
    },
    _hover: {
      '& [data-slot="start-icon"]': {
        opacity: 1,
      },
    },
    _focusVisible: {
      _after: {
        borderColor: "neutral.300",
        borderWidth: "0_x",
      },
    },
  },
  variants: {
    variant: {
      solid: {
        _focusVisible: {
          bg: "colorPalette.800",
          _after: {
            borderColor: "neutral.200",
            borderWidth: "0x",
          },
        },
        _disabled: {
          bg: "colorPalette.950",
          color: "neutral.200/60",
        },
      },
      surface: {
        _disabled: {
          color: "colorPalette.200/40",
          bg: "white/3",
          _after: {
            borderColor: "neutral.900",
          },
        },
      },
      subtle: {
        _disabled: {
          color: "colorPalette.200/40",
          bg: "white/3",
        },
      },
      ghost: {
        _disabled: {
          color: "colorPalette.200/40",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    hoverVariant: {
      solid: {
        _hover: { bg: "colorPalette.500", color: "neutral.100" },
      },
      surface: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          _after: {
            borderColor: "neutral.700",
            borderWidth: "0_x",
          },
        },
      },
      subtle: {
        _hover: { bg: "white/10", color: "colorPalette.100" },
      },
      ghost: {
        _hover: { bg: "white/5", color: "colorPalette.100" },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});

export const buttonGroupClass = cva({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
        "& > *[data-first]": {
          borderEndRadius: "[0!]",
        },
        "& > *[data-first]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          right: "-0_x",
        },
        "& > *[data-between]": {
          borderRadius: "[0!]",
        },
        "& > *[data-between]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          left: "-0_x",
          right: "-0_x",
        },
        "& > *[data-last]": {
          borderStartRadius: "[0!]",
        },
        "& > *[data-last]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          left: "-0_x",
        },
      },
      vertical: {
        flexDirection: "column",
        "& > *[data-first]": {
          borderBottomRadius: "[0!]",
        },
        "& > *[data-first]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          bottom: "-0_x",
        },
        "& > *[data-between]": {
          borderRadius: "[0!]",
        },
        "& > *[data-between]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          top: "-0_x",
          bottom: "-0_x",
        },
        "& > *[data-last]": {
          borderTopRadius: "[0!]",
        },
        "& > *[data-last]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          top: "-0_x",
        },
      },
    },
    variant: {
      solid: {},
      surface: {},
      subtle: {},
      ghost: {},
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
  compoundVariants: [
    {
      direction: "horizontal",
      variant: "surface",
      css: {
        "& > *[data-first]:after": {
          borderRightWidth: "[0!]",
        },
        "& > *[data-first]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderRightWidth: "0_x!",
        },
        "& > *[data-between]:after": {
          borderXWidth: "[0!]",
        },
        "& > *[data-between]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderXWidth: "0_x!",
        },
        "& > *[data-last]:after": {
          borderLeftWidth: "[0!]",
        },
        "& > *[data-last]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderLeftWidth: "0_x!",
        },
      },
    },
    {
      direction: "vertical",
      variant: "surface",
      css: {
        "& > *[data-first]:after": {
          borderBottomWidth: "[0!]",
        },
        "& > *[data-first]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderBottomWidth: "0_x!",
        },
        "& > *[data-between]:after": {
          borderYWidth: "[0!]",
        },
        "& > *[data-between]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderYWidth: "0_x!",
        },
        "& > *[data-last]:after": {
          borderTopWidth: "[0!]",
        },
        "& > *[data-last]:is(:hover, [data-hover], :focus-visible, [data-focus-visible]):after": {
          borderTopWidth: "0_x!",
        },
      },
    },
  ],
});

export const separatorClass = cva({
  base: {
    alignSelf: "stretch",
  },
  variants: {
    direction: {
      horizontal: { w: "0_x" },
      vertical: { h: "0_x" },
    },
    variant: {
      solid: { bg: "colorPalette.700" },
      surface: { bg: "neutral.800" },
      subtle: {},
      ghost: {},
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});
