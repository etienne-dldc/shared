import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { designContentSizeVar } from "./design.css";

export const spacingGapVar = createVar("spacing-gap");

export const frameContentLayoutClass = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  maxWidth: "100%",
  gap: `calc(min(${spacingGapVar}, ${designContentSizeVar}))`,
  paddingLeft: spacingGapVar,
  paddingRight: spacingGapVar,
});

export const frameContentStartPaddingClass = styleVariants({
  icon: {},
  text: { paddingLeft: calc.multiply(spacingGapVar, 1.5) },
  none: { paddingLeft: 0 },
});

export const frameContentEndPaddingClass = styleVariants({
  icon: {},
  text: { paddingRight: calc.multiply(spacingGapVar, 1.5) },
  none: { paddingRight: 0 },
});
