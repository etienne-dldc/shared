import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  // Based on line height size
  // const fontSizeRem = lineHeightRem - 0.56 * Math.exp(-Math.pow(1.76 - lineHeightRem, 2) / Math.pow(0.8, 2));
  // const fontSizeRemRounded = Math.round(fontSizeRem * 16) / 16; // Round to 2px
  "2x": { value: { lineHeight: "0.625rem", fontSize: "0.5rem" } },
  "3": { value: { lineHeight: "0.75rem", fontSize: "0.625rem" } },
  "3x": { value: { lineHeight: "0.875rem", fontSize: "0.75rem" } },
  "4": { value: { lineHeight: "1rem", fontSize: "0.75rem" } },
  "4x": { value: { lineHeight: "1.125rem", fontSize: "0.875rem" } },
  "5": { value: { lineHeight: "1.25rem", fontSize: "0.875rem" } },
  "5x": { value: { lineHeight: "1.375rem", fontSize: "0.875rem" } },
  "6": { value: { lineHeight: "1.5rem", fontSize: "1rem" } },
  "6x": { value: { lineHeight: "1.625rem", fontSize: "1.125rem" } },
  "7": { value: { lineHeight: "1.75rem", fontSize: "1.25rem" } },
  "7x": { value: { lineHeight: "1.875rem", fontSize: "1.375rem" } },
  "8": { value: { lineHeight: "2rem", fontSize: "1.5rem" } },
  "9": { value: { lineHeight: "2.25rem", fontSize: "1.875rem" } },
  "10": { value: { lineHeight: "2.5rem", fontSize: "2.25rem" } },
  "11": { value: { lineHeight: "2.75rem", fontSize: "2.625rem" } },
  "12": { value: { lineHeight: "3rem", fontSize: "3rem" } },
  "13": { value: { lineHeight: "3.25rem", fontSize: "3.25rem" } },
  "14": { value: { lineHeight: "3.5rem", fontSize: "3.5rem" } },
  "15": { value: { lineHeight: "3.75rem", fontSize: "3.75rem" } },
  "16": { value: { lineHeight: "4rem", fontSize: "4rem" } },
  "18": { value: { lineHeight: "4.5rem", fontSize: "4.5rem" } },
  "20": { value: { lineHeight: "5rem", fontSize: "5rem" } },
  "24": { value: { lineHeight: "6rem", fontSize: "6rem" } },
  "28": { value: { lineHeight: "7rem", fontSize: "7rem" } },
  "32": { value: { lineHeight: "8rem", fontSize: "8rem" } },

  // Computed from line height using fixed ratio
  dynamic: { value: { lineHeight: "var(--content-size)", fontSize: "calc(var(--content-size) * 0.88)" } },
});
