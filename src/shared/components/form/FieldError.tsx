import * as Ariakit from "@ariakit/react";
import { css, cx } from "../../../../styled-system/css";
import { fieldErrorStyles } from "../../design/fieldError";
import { ComponentPropsBase } from "../../utils/componentProps";

export type FieldErrorProps = ComponentPropsBase<"p", { render?: Ariakit.RoleProps<"p">["render"] }>;

export function FieldError(inProps: FieldErrorProps) {
  const { className, css: cssProps, ...props } = inProps;
  const styles = fieldErrorStyles();

  return <Ariakit.Role.p className={cx(css(styles, cssProps), className)} {...props} />;
}
