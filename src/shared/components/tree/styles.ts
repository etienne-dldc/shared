import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { resolveSmallRounded } from "../../design/sizes";
import { colorPaletteClass, contentSize, heightStyles } from "../../design/styles";
import { TPaletteColor } from "../../design/types";

// const className = cn(
//   tw`h-full mx-2`,
//   tw`group-aria-selected:bg-teal-900 group-focus-visible:bg-teal-950 group-hover:bg-teal-950 cursor-pointer`,
//   !node.isSelected || node.isSelectedStart ? tw`rounded-t-2xl` : tw`rounded-t-none`,
//   !node.isSelected || node.isSelectedEnd ? tw`rounded-b-2xl` : tw`rounded-b-none`,
//   (node.isEditing || (node.willReceiveDrop && !preview)) && tw`ring-2 ring-teal-500 z-10 relative`,
// );

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
      roundedTop: "1_x",
    },
    _roundedEnd: {
      roundedBottom: "1_x",
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
      color && colorPaletteClass.raw({ colorPalette: color }),
      smallRounded && { rounded: "0x" },
    ),
    {
      ...heightInline,
      ...contentInline,
    },
  ];
}
