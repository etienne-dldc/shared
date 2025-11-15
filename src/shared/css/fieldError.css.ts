import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";
import { sizeToRemString } from "./utils";

export const fieldErrorClass = style({
  color: themeVars.colors.red[500],
  marginLeft: sizeToRemString("2"),
  fontWeight: "medium",
  marginTop: sizeToRemString("1"),
});
