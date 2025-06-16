import { defineUtility } from "@pandacss/dev";
import { designHeightVar, spacingGapVar } from "./globalVars";

const designHeight = defineUtility({
  className: "dh",
  values: "sizes",
  property: "minHeight",
  transform: (value) => {
    return {
      [designHeightVar]: value,
    };
  },
});

const itemContentParentHeight = defineUtility({
  className: "icph",
  values: "sizes",
  transform: (value) => {
    return {
      "--item-content-parent-height": value,
    };
  },
});

const spacingGap = defineUtility({
  className: "spagap",
  values: "sizes",
  transform: (value) => {
    if (value === "auto") {
      return { [spacingGapVar]: "calc((var(--item-content-parent-height) - var(--design-height)) / 2)" };
    }
    return { [spacingGapVar]: value };
  },
});

export const utilities = {
  designHeight,
  itemContentParentHeight,
  spacingGap,
};
