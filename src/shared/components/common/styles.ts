import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignButtonHeight, TPaletteColor } from "../core/DesignContext";

export const colorPaletteClass = cva({
  variants: {
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

export const heightClass = cva({
  variants: {
    height: {
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
    } satisfies Record<TDesignButtonHeight, SystemStyleObject>,
  },
});
