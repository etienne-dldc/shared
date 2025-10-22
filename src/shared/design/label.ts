import { css } from "../../../styled-system/css";

interface LabelStylesOptions {
  disabled: boolean;
  hidden: boolean;
}

export function labelStyles({ disabled = false, hidden = false }: LabelStylesOptions) {
  return css.raw(
    {
      textStyle: "4",
      fontWeight: "semibold",
      color: "neutral.400",
      marginBottom: "0x",
      marginLeft: "0x",
    },
    disabled && { color: "neutral.500" },
    hidden && { srOnly: true },
  );
}
