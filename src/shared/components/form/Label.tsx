import * as Ariakit from "@ariakit/react";
import { css, cx } from "../../../../styled-system/css";
import { labelStyles } from "../../design/label";
import { ComponentPropsBase } from "../../utils/componentProps";

export type LabelProps = ComponentPropsBase<
  "label",
  {
    disabled?: boolean;
    hidden?: boolean;
    render?: Ariakit.RoleProps<"label">["render"];
  }
>;

export function Label(inProps: LabelProps) {
  const { render, children, htmlFor, disabled = false, hidden = false, css: cssProps, className, ...props } = inProps;

  const styles = labelStyles({ disabled, hidden });

  return (
    <Ariakit.Role.label render={render} htmlFor={htmlFor} className={cx(css(styles, cssProps), className)} {...props}>
      {children}
    </Ariakit.Role.label>
  );
}
