import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import { labelStyles } from "../../css/label";
import { ComponentPropsBaseWith } from "../../utils/componentProps";

export type LabelProps = ComponentPropsBaseWith<
  "label",
  {
    disabled?: boolean;
    hidden?: boolean;
    render?: Ariakit.RoleProps<"label">["render"];
  }
>;

export function Label(inProps: LabelProps) {
  const { disabled = false, hidden = false, className, style, ...props } = inProps;

  const [baseClass, baseInline] = labelStyles({ disabled, hidden });

  return <Ariakit.Role.label className={clsx(baseClass, className)} style={{ ...baseInline, ...style }} {...props} />;
}
