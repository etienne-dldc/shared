import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";
import { opacity, sizeToRemString } from "./utils";

export const paperClass = style({
  overflow: "hidden",
  borderRadius: sizeToRemString("2"),
  borderWidth: sizeToRemString("0__x"),
  borderColor: opacity(themeVars.colors.white, 10),
});
