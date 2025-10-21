import { cva } from "../../../styled-system/css";

export const frameInputContentClass = cva({
  base: {
    outline: "none",
    alignSelf: "stretch",
    flex: "1",
    _placeholder: {
      opacity: 0.6,
    },
  },
});
