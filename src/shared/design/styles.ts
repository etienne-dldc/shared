import { css, cva } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { sizeToRemString } from "./sizes";
import { TPaletteColor } from "./types";

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

export function heightStyles(height: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw({ minH: "var(--design-height)", minW: "var(--design-height)" }),
    {
      ["--design-height" as string]: sizeToRemString(height),
    },
  ];
}

export function roundedStyles(rounded: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw({ borderRadius: "var(--design-rounded)" }),
    {
      ["--design-rounded" as string]: sizeToRemString(rounded),
    },
  ];
}

export function contentSize(height: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw({ textStyle: "dynamic" }),
    {
      ["--content-size" as string]: sizeToRemString(height),
    },
  ];
}

export function prose(height: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw({}),
    {
      ["--content-size" as string]: sizeToRemString(height),
    },
  ];
}
