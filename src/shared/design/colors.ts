import { css } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { TPaletteColor } from "./types";

export const VALID_COLORS = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;
export type TColorName = (typeof VALID_COLORS)[number];

export const COLOR_NAMES: Record<TColorName, string> = {
  red: "Rouge",
  orange: "Orange",
  amber: "Ambre",
  yellow: "Jaune",
  lime: "Citron vert",
  green: "Vert",
  emerald: "Emeraude",
  teal: "Sarcelle",
  cyan: "Cyan",
  sky: "Ciel",
  blue: "Bleu",
  indigo: "Indigo",
  violet: "Violet",
  purple: "Pourpre",
  fuchsia: "Fuchsia",
  pink: "Rose",
  rose: "Rouge",
};

export function toColor(color?: string): TColorName {
  if (color && VALID_COLORS.includes(color as TColorName)) {
    return color as TColorName;
  }
  return "blue";
}

export const colorPaletteClass = {
  red: css.raw({ colorPalette: "red" }),
  orange: css.raw({ colorPalette: "orange" }),
  amber: css.raw({ colorPalette: "amber" }),
  yellow: css.raw({ colorPalette: "yellow" }),
  lime: css.raw({ colorPalette: "lime" }),
  green: css.raw({ colorPalette: "green" }),
  emerald: css.raw({ colorPalette: "emerald" }),
  teal: css.raw({ colorPalette: "teal" }),
  cyan: css.raw({ colorPalette: "cyan" }),
  sky: css.raw({ colorPalette: "sky" }),
  blue: css.raw({ colorPalette: "blue" }),
  indigo: css.raw({ colorPalette: "indigo" }),
  violet: css.raw({ colorPalette: "violet" }),
  purple: css.raw({ colorPalette: "purple" }),
  fuchsia: css.raw({ colorPalette: "fuchsia" }),
  pink: css.raw({ colorPalette: "pink" }),
  rose: css.raw({ colorPalette: "rose" }),

  gray: css.raw({ colorPalette: "gray" }),
  slate: css.raw({ colorPalette: "slate" }),
  neutral: css.raw({ colorPalette: "neutral" }),
  stone: css.raw({ colorPalette: "stone" }),
  zinc: css.raw({ colorPalette: "zinc" }),
} satisfies Record<TPaletteColor, SystemStyleObject>;
