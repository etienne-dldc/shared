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
  base: {
    minH: "var(--design-height)",
    minW: "var(--design-height)",
    itemContentParentHeight: "7",
    designHeight: "7",
    textStyle: "f7",
  },
  variants: {
    height: {
      "2x": { designHeight: "2x", itemContentParentHeight: "2x", textStyle: "f2x" },
      "3": { designHeight: "3", itemContentParentHeight: "3", textStyle: "f3" },
      "3x": { designHeight: "3x", itemContentParentHeight: "3x", textStyle: "f3x" },
      "4": { designHeight: "4", itemContentParentHeight: "4", textStyle: "f4" },
      "4x": { designHeight: "4x", itemContentParentHeight: "4x", textStyle: "f4x" },
      "5": { designHeight: "5", itemContentParentHeight: "5", textStyle: "f5" },
      "5x": { designHeight: "5x", itemContentParentHeight: "5x", textStyle: "f5x" },
      "6": { designHeight: "6", itemContentParentHeight: "6", textStyle: "f6" },
      "6x": { designHeight: "6x", itemContentParentHeight: "6x", textStyle: "f6x" },
      "7": { designHeight: "7", itemContentParentHeight: "7", textStyle: "f7" },
      "7x": { designHeight: "7x", itemContentParentHeight: "7x", textStyle: "f7x" },
      "8": { designHeight: "8", itemContentParentHeight: "8", textStyle: "f8" },
      "9": { designHeight: "9", itemContentParentHeight: "9", textStyle: "f9" },
      "10": { designHeight: "10", itemContentParentHeight: "10", textStyle: "f10" },
      "12": { designHeight: "12", itemContentParentHeight: "12", textStyle: "f12" },
    } satisfies Record<TDesignButtonHeight, SystemStyleObject>,
  },
});

console.log(heightClass({}));
