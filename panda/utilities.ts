import { defineUtility } from "@pandacss/dev";
import { designHeightVar, spacingGapVar } from "./globalVars";

const designHeight = defineUtility({
  className: "dh",
  values: "sizes",
  transform: (value) => {
    return {
      [designHeightVar]: value,
    };
  },
});

const spacingGap = defineUtility({
  className: "spagap",
  values: "sizes",
  transform: (value) => {
    if (value === "auto") {
      return { [spacingGapVar]: "calc((var(--design-height) - var(--content-size)) / 2)" };
    }
    return { [spacingGapVar]: value };
  },
});

export const utilities = {
  designHeight,
  spacingGap,
};
