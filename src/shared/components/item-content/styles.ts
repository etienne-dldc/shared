import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignButtonHeight, TDesignContentSize, TDesignSpacing } from "../core/DesignContext";

export const itemContentClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1",
    maxW: "full",
    gap: "var(--spacing-gap)",
    px: "var(--spacing-gap)",
  },
  variants: {
    spacing: {
      "2x": { "--spacing-gap": "[calc((var(--sizes-2x) - var(--icon-size))/2)]" },
      "3": { "--spacing-gap": "[calc((var(--sizes-3) - var(--icon-size))/2)]" },
      "3x": { "--spacing-gap": "[calc((var(--sizes-3x) - var(--icon-size))/2)]" },
      "4": { "--spacing-gap": "[calc((var(--sizes-4) - var(--icon-size))/2)]" },
      "4x": { "--spacing-gap": "[calc((var(--sizes-4x) - var(--icon-size))/2)]" },
      "5": { "--spacing-gap": "[calc((var(--sizes-5) - var(--icon-size))/2)]" },
      "5x": { "--spacing-gap": "[calc((var(--sizes-5x) - var(--icon-size))/2)]" },
      "6": { "--spacing-gap": "[calc((var(--sizes-6) - var(--icon-size)) / 2)]" },
      "6x": { "--spacing-gap": "[calc((var(--sizes-6x) - var(--icon-size))/2)]" },
      "7": { "--spacing-gap": "[calc((var(--sizes-7) - var(--icon-size))/2)]" },
      "7x": { "--spacing-gap": "[calc((var(--sizes-7x) - var(--icon-size))/2)]" },
      "8": { "--spacing-gap": "[calc((var(--sizes-8) - var(--icon-size))/2)]" },
      "9": { "--spacing-gap": "[calc((var(--sizes-9) - var(--icon-size))/2)]" },
      "10": { "--spacing-gap": "[calc((var(--sizes-10) - var(--icon-size))/2)]" },
      "12": { "--spacing-gap": "[calc((var(--sizes-12) - var(--icon-size))/2)]" },
    } satisfies Record<TDesignSpacing, SystemStyleObject>,
  },
});

export const itemContentInnerSpacingClass = cva({
  variants: {
    hasLeftIcon: {
      yes: {
        ml: "[calc(-1 * var(--spacing-gap) / 4)]",
      },
      no: {
        pl: "[calc(var(--spacing-gap) / 2)]",
      },
    },
    hasRightIcon: {
      yes: {
        mr: "[calc(-1 * var(--spacing-gap) / 4)]",
      },
      no: {
        pr: "[calc(var(--spacing-gap) / 2)]",
      },
    },
  },
});

export const itemContentSizeClass = cva({
  variants: {
    contentSize: {
      "2x": { textStyle: "f2x", iconSize: "2x" },
      "3": { textStyle: "f3", iconSize: "3" },
      "3x": { textStyle: "f3x", iconSize: "3x" },
      "4": { textStyle: "f4", iconSize: "4" },
      "4x": { textStyle: "f4x", iconSize: "4x" },
      "5": { textStyle: "f5", iconSize: "5" },
      "5x": { textStyle: "f5x", iconSize: "5x" },
      "6": { textStyle: "f6", iconSize: "6" },
      "6x": { textStyle: "f6x", iconSize: "6x" },
      "7": { textStyle: "f7", iconSize: "7" },
      "7x": { textStyle: "f7x", iconSize: "7x" },
      "8": { textStyle: "f8", iconSize: "8" },
      "9": { textStyle: "f9", iconSize: "9" },
      "10": { textStyle: "f10", iconSize: "10" },
      "12": { textStyle: "f12", iconSize: "12" },
    } satisfies Record<TDesignContentSize, SystemStyleObject>,
    height: {
      "2x": { minW: "2x" },
      "3": { minW: "3" },
      "3x": { minW: "3x" },
      "4": { minW: "4" },
      "4x": { minW: "4x" },
      "5": { minW: "5" },
      "5x": { minW: "5x" },
      "6": { minW: "6" },
      "6x": { minW: "6x" },
      "7": { minW: "7" },
      "7x": { minW: "7x" },
      "8": { minW: "8" },
      "9": { minW: "9" },
      "10": { minW: "10" },
      "12": { minW: "12" },
    } satisfies Record<TDesignButtonHeight, SystemStyleObject>,
  },
});

// export function nestedDesignContent(design: TResolvedDesignProps): TDesignContextProps {
//   const nestedContentSize = heightToContent[design.contentSize] ?? "3";
//   return {
//     ...design,
//     contentSize: nestedContentSize,
//     height: contentToHeight[nestedContentSize] ?? "4",
//   };
// }
