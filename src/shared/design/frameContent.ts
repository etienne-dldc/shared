import { css, cva } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { TFrameContentPaddingResolved } from "../components/frame/FrameContentFragment";
import { sizeToRemString, spacingToGapRem } from "./utils";

export const frameContentClass = cva({
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

export const frameContentLayoutClass = css.raw({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  maxW: "full",
  gap: "[calc(min(var(--spacing-gap), var(--content-size)))]",
  px: "var(--spacing-gap)",
});

export function frameContentStyles(
  contentHeight: number,
  spacing: number | null,
  startPadding: TFrameContentPaddingResolved,
  endPadding: TFrameContentPaddingResolved,
  noLayout: boolean,
): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw(
      { textStyle: "dynamic" },
      frameContentClass.raw({ startPadding, endPadding }),
      !noLayout && frameContentLayoutClass,
    ),
    {
      ["--content-size" as string]: sizeToRemString(contentHeight),
      ["--spacing-gap" as string]: spacing
        ? spacingToGapRem(spacing)
        : "calc((var(--design-height) - var(--content-size)) / 2)",
    },
  ];
}
