import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignCrossSize, TDesignVariant, TPaletteColor } from "../core/DesignContext";

export const buttonLikeClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    rounded: "1_x",
    outline: "none",
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
        insetRing: "solid",
        insetRingColor: "white/5",
        insetRingWidth: "0_x",
      },
      subtle: { bg: "white/5", color: "colorPalette.200" },
      ghost: { color: "colorPalette.200" },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    colorPalette: {
      red: { colorPalette: "red" },
      orange: { colorPalette: "orange" },
      amber: { colorPalette: "amber" },
      yellow: { colorPalette: "yellow" },
      lime: { colorPalette: "lime" },
      green: { colorPalette: "green" },
      emerald: { colorPalette: "emerald" },
      teal: { colorPalette: "teal" },
      cyan: { colorPalette: "cyan" },
      sky: { colorPalette: "sky" },
      blue: { colorPalette: "blue" },
      indigo: { colorPalette: "indigo" },
      violet: { colorPalette: "violet" },
      purple: { colorPalette: "purple" },
      fuchsia: { colorPalette: "fuchsia" },
      pink: { colorPalette: "pink" },
      rose: { colorPalette: "rose" },

      gray: { colorPalette: "gray" },
      slate: { colorPalette: "slate" },
      neutral: { colorPalette: "neutral" },
      stone: { colorPalette: "stone" },
      zinc: { colorPalette: "zinc" },
    } satisfies Record<TPaletteColor, SystemStyleObject>,
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
      insetRing: "solid",
      insetRingColor: "neutral.300",
      insetRingWidth: "0_x",
    },
  },
  variants: {
    variant: {
      solid: {
        _focusVisible: {
          bg: "colorPalette.800",
          insetRingColor: "neutral.200",
          insetRingWidth: "0x",
        },
      },
      surface: {},
      subtle: {},
      ghost: {},
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    hoverVariant: {
      solid: {
        _hover: { bg: "colorPalette.500", color: "neutral.100" },
      },
      surface: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          insetRing: "solid",
          insetRingColor: "white/10",
          insetRingWidth: "0_x",
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
