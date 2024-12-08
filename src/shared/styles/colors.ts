import colors from "tailwindcss/colors";

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

export { colors };

export function toColor(color?: string): TColorName {
  if (color && VALID_COLORS.includes(color as TColorName)) {
    return color as TColorName;
  }
  return "blue";
}
