import { style } from "@vanilla-extract/css";
import { _placeholder } from "./conditions.css";

export const frameInputContentClass = style({
  outline: "none",
  alignSelf: "stretch",
  flex: "1",
  selectors: {
    [_placeholder]: {
      opacity: 0.6,
    },
  },
});
