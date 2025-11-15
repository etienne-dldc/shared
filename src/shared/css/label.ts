import clsx from "clsx";
import { contentSize } from "./design";
import { labelClass, labelDisabledClass, labelHiddenClass } from "./label.css";

interface LabelStylesOptions {
  disabled: boolean;
  hidden: boolean;
}

export function labelStyles({
  disabled = false,
  hidden = false,
}: LabelStylesOptions): [classNames: string, styles: React.CSSProperties] {
  const [contentClass, contentInline] = contentSize(4);

  return [
    clsx(labelClass, contentClass, disabled && labelDisabledClass, hidden && labelHiddenClass),
    { ...contentInline },
  ];
}
