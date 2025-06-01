import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import {
  contentToCross,
  crossToContent,
  TDesignContentSize,
  TDesignContextProps,
  TDesignCrossSize,
  TDesignMainSize,
  TResolvedDesignProps,
} from "../core/DesignContext";

export const itemContentClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1",
    maxW: "full",
  },
  variants: {
    mainSize: {
      "2x": { gap: "0x", px: "0x" },
      "3": { gap: "1", px: "1" },
      "3x": { gap: "1_x", px: "1_x" },
      "4": { gap: "1x", px: "1x" },
      "4x": { gap: "1xx", px: "1xx" },
      "5": { gap: "2x", px: "2x" },
      "6": { gap: "2x", px: "2x" },
      "7": { gap: "3", px: "5" },
      "8": { gap: "3x", px: "5x" },
      "10": { gap: "4", px: "6" },
      "12": { gap: "4x", px: "6x" },
    } satisfies Record<TDesignMainSize, SystemStyleObject>,
  },
});

export const contentSpaceClass = cva({
  variants: {
    mainSize: {
      "2x": { px: "0x" },
      "3": { px: "1" },
      "3x": { px: "1_x" },
      "4": { px: "1x" },
      "4x": { px: "1xx" },
      "5": { px: "2x" },
      "6": { px: "2x" },
      "7": { px: "5" },
      "8": { px: "5x" },
      "10": { px: "6" },
      "12": { px: "6x" },
    } satisfies Record<TDesignMainSize, SystemStyleObject>,
  },
});

export const itemContentFontSizeClass = cva({
  variants: {
    contentSize: {
      "2x": { textStyle: "f2x" },
      "3": { textStyle: "f3" },
      "3x": { textStyle: "f3x" },
      "4": { textStyle: "f4" },
      "4x": { textStyle: "f4x" },
      "5": { textStyle: "f5" },
      "6": { textStyle: "f6" },
      "7": { textStyle: "f7" },
      "8": { textStyle: "f8" },
      "10": { textStyle: "f10" },
      "12": { textStyle: "f12" },
    } satisfies Record<TDesignContentSize, SystemStyleObject>,
    crossSize: {
      "2x": { minW: "2x" },
      "3": { minW: "3" },
      "3x": { minW: "3x" },
      "4": { minW: "4" },
      "4x": { minW: "4x" },
      "5": { minW: "5" },
      "6": { minW: "6" },
      "7": { minW: "7" },
      "8": { minW: "8" },
      "10": { minW: "10" },
      "12": { minW: "12" },
    } satisfies Record<TDesignCrossSize, SystemStyleObject>,
  },
});

export function nestedDesignContent(design: TResolvedDesignProps): TDesignContextProps {
  const nestedContentSize = crossToContent[design.contentSize] ?? "3";
  return {
    ...design,
    contentSize: nestedContentSize,
    crossSize: contentToCross[nestedContentSize] ?? "4",
  };
}
