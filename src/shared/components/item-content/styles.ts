import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { sizeToRemString, spacingToGapRem } from "../../design/sizes";
import { TItemlContentPaddingResolved } from "./types";

export const itemContentClass = cva({
  variants: {
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

export const itemContentLayoutClass = css.raw({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  maxW: "full",
  gap: "[calc(min(var(--spacing-gap), var(--content-size)))]",
  px: "var(--spacing-gap)",
});

export function itemlContentStyles(
  contentHeight: number,
  spacing: number | null,
  startPadding: TItemlContentPaddingResolved,
  endPadding: TItemlContentPaddingResolved,
  noLayout: boolean,
): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw(
      { textStyle: "dynamic" },
      itemContentClass.raw({ startPadding, endPadding }),
      !noLayout && itemContentLayoutClass,
    ),
    {
      ["--content-size" as string]: sizeToRemString(contentHeight),
      ["--spacing-gap" as string]: spacing
        ? spacingToGapRem(spacing)
        : "calc((var(--design-height) - var(--content-size)) / 2)",
    },
  ];
}
