import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";
import { opacity, sizeToRemString } from "./utils";

export const backdropClass = style({
  position: "fixed",
  inset: 0,
  backgroundColor: opacity(themeVars.colors.black, 30),
  backdropFilter: `blur(${sizeToRemString(1)})`,
});
