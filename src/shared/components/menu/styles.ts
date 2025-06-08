import { css } from "../../../../styled-system/css";

export const menuItemClass = css.raw({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  rounded: "1_x",
  outline: "none",
  position: "relative",
  color: "colorPalette.200",
  '& [data-slot="start-icon"]': {
    opacity: 0.6,
  },
  _activeItem: {
    bg: "white/5",
    color: "colorPalette.100",
    '& [data-slot="start-icon"]': {
      opacity: 1,
    },
  },
  _selected: {
    color: "colorPalette.100",
    '& [data-slot="start-icon"]': {
      opacity: 1,
    },
  },
  _disabled: {
    color: "colorPalette.200/40",
  },
});
