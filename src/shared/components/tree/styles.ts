import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass } from "../../design/colors";
import { contentSize, heightStyles } from "../../design/styles";
import { TPaletteColor } from "../../design/types";
import { resolveSmallRounded } from "../../design/utils";

export const treeRowItemClass = css({
  outline: "none",
});

export const treeItemClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    outline: "none",
    position: "relative",
    "& [data-item-main-icon]": {
      opacity: 0.6,
    },
    _roundedStart: {
      roundedTop: "1",
    },
    _roundedEnd: {
      roundedBottom: "1",
    },
    // Hover
    _hover: {
      bg: "white/5",
      color: "colorPalette.100",
    },
    // Focus
    _after: {
      rounded: "[inherit]",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: "0",
    },
    _groupFocusVisible: {
      _after: {
        borderColor: "neutral.300",
        borderWidth: "0_x",
      },
    },

    // Selected
    _selected: {
      bg: "colorPalette.600",
      color: "neutral.100",
      _hover: {
        bg: "colorPalette.500",
      },
      // Focus selected
      _groupFocusVisible: {
        bg: "colorPalette.800",
        _after: {
          borderColor: "neutral.200",
          borderWidth: "0x",
        },
      },
    },
  },
});

export function treeItemStyles(
  height: number,
  nestedHeight: number,
  color: TPaletteColor | undefined,
): [css: SystemStyleObject, styles: React.CSSProperties] {
  const smallRounded = resolveSmallRounded(height);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = contentSize(nestedHeight);

  return [
    css.raw(
      heightCss,
      treeItemClass.raw(),
      contentCss,
      color && colorPaletteClass[color],
      smallRounded && { rounded: "0x" },
    ),
    {
      ...heightInline,
      ...contentInline,
    },
  ];
}
