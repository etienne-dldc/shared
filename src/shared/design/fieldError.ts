import { css } from "../../../styled-system/css";

export function fieldErrorStyles() {
  return css.raw({
    color: "red.500",
    marginLeft: "2",
    fontSize: "sm",
    fontWeight: "medium",
    marginTop: "1",
  });
}
