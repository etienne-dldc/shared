import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignButtonHeight, TDesignSpacing } from "../core/DesignContext";

export const itemContentClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1",
    maxW: "full",
    gap: "var(--spacing-gap)",
    px: "var(--spacing-gap)",
    spacingGap: "[auto]",
  },
  variants: {
    spacing: {
      "2x": { spacingGap: "0" },
      "3": { spacingGap: "0_x" },
      "3x": { spacingGap: "0x" },
      "4": { spacingGap: "0xx" },
      "4x": { spacingGap: "0xx" },
      "5": { spacingGap: "1" },
      "5x": { spacingGap: "1_x" },
      "6": { spacingGap: "1_x" },
      "6x": { spacingGap: "1x" },
      "7": { spacingGap: "1x" },
      "7x": { spacingGap: "1xx" },
      "8": { spacingGap: "2" },
      "9": { spacingGap: "2x" },
      "10": { spacingGap: "2xx" },
      "12": { spacingGap: "3" },
    } satisfies Record<TDesignSpacing, SystemStyleObject>,
    startPadding: {
      icon: {},
      text: { paddingLeft: "[calc(var(--spacing-gap) * 1.5)]" },
      none: { paddingLeft: "0" },
    },
    endPadding: {
      icon: {},
      text: { paddingRight: "[calc(var(--spacing-gap) * 1.5)]" },
      none: { paddingRight: "0" },
    },
  },
});

export const itemContentSizeClass = cva({
  variants: {
    height: {
      "2x": { designHeight: "2x", textStyle: "f2x" },
      "3": { designHeight: "3", textStyle: "f3" },
      "3x": { designHeight: "3x", textStyle: "f3x" },
      "4": { designHeight: "4", textStyle: "f4" },
      "4x": { designHeight: "4x", textStyle: "f4x" },
      "5": { designHeight: "5", textStyle: "f5" },
      "5x": { designHeight: "5x", textStyle: "f5x" },
      "6": { designHeight: "6", textStyle: "f6" },
      "6x": { designHeight: "6x", textStyle: "f6x" },
      "7": { designHeight: "7", textStyle: "f7" },
      "7x": { designHeight: "7x", textStyle: "f7x" },
      "8": { designHeight: "8", textStyle: "f8" },
      "9": { designHeight: "9", textStyle: "f9" },
      "10": { designHeight: "10", textStyle: "f10" },
      "12": { designHeight: "12", textStyle: "f12" },
    } satisfies Record<TDesignButtonHeight, SystemStyleObject>,
  },
});
