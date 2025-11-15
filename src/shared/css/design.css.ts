import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { sizeToRemString } from "./utils";

export const designHeightVar = createVar(
  { syntax: "<length>", inherits: false, initialValue: sizeToRemString(7) },
  "design-height",
);

export const designHeightClass = style({
  minHeight: designHeightVar,
});

export const designRoundedVar = createVar(
  { syntax: "<length>", inherits: false, initialValue: sizeToRemString(1) },
  "design-rounded",
);

export const designRoundedClass = style({
  borderRadius: designRoundedVar,
});

export const designContentSizeVar = createVar(
  { syntax: "<length>", inherits: true, initialValue: sizeToRemString(4) },
  "design-content-size",
);

export const designContentSizeClass = style({
  lineHeight: designContentSizeVar,
  fontSize: calc.multiply(designContentSizeVar, 0.88),
});
