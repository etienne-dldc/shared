import { calc } from "@vanilla-extract/css-utils";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import { TFrameContentPaddingResolved } from "../components/frame/FrameContentFragment";
import { designContentSizeVar, designHeightVar } from "./design.css";
import {
  frameContentEndPaddingClass,
  frameContentLayoutClass,
  frameContentStartPaddingClass,
  spacingGapVar,
} from "./frameContent.css";
import { sizeToRemString, spacingToGapRem } from "./utils";

export function frameContentStyles(
  contentHeight: number,
  spacing: number | null,
  startPadding: TFrameContentPaddingResolved,
  endPadding: TFrameContentPaddingResolved,
  noLayout: boolean,
): [className: string, styles: React.CSSProperties] {
  return [
    clsx(
      frameContentStartPaddingClass[startPadding],
      frameContentEndPaddingClass[endPadding],
      !noLayout && frameContentLayoutClass,
    ),
    assignInlineVars({
      [designContentSizeVar]: sizeToRemString(contentHeight),
      [spacingGapVar]: spacing
        ? spacingToGapRem(spacing)
        : calc(designHeightVar).subtract(designContentSizeVar).divide(2).toString(),
    }),
  ];
}
