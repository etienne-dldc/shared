import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import { contentSize } from "../../css/design";
import { fieldErrorClass } from "../../css/fieldError.css";
import { ComponentPropsBaseWith } from "../../utils/componentProps";

export type FieldErrorProps = ComponentPropsBaseWith<"p", { render?: Ariakit.RoleProps<"p">["render"] }>;

export function FieldError(inProps: FieldErrorProps) {
  const { className, style, ...props } = inProps;

  const [contentClass, contentInline] = contentSize(4);

  return (
    <Ariakit.Role.p
      className={clsx(fieldErrorClass, contentClass, className)}
      style={{ ...contentInline, ...style }}
      {...props}
    />
  );
}
