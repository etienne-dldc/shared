import { style } from "@vanilla-extract/css";
import { designContentSizeVar } from "./design.css";

export const iconClass = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: designContentSizeVar,
  height: designContentSizeVar,
});
