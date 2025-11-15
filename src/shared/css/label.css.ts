import { style } from "@vanilla-extract/css";
import { css } from "../../../styled-system/css";
import { themeVars } from "./theme.css";
import { sizeToRemString } from "./utils";

export const labelClass = style({
  // textStyle: "4",
  fontWeight: "semibold",
  color: themeVars.colors.neutral[400],
  marginBottom: sizeToRemString("0x"),
  marginLeft: sizeToRemString("0x"),
});

export const labelDisabledClass = style({
  color: themeVars.colors.neutral[500],
});

export const labelHiddenClass = css({
  srOnly: true,
});
