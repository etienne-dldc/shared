import * as Ariakit from "@ariakit/react";
import { ForwardedRef, forwardRef } from "react";

import { cn, tw } from "../../styles/utils";

interface LabelProps {
  render?: React.ReactElement;
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export const Label = forwardRef(function Label(
  { render, children, htmlFor, className, disabled = false, hidden = false }: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>,
) {
  const labelClasses = cn(
    tw`text-xs font-semibold text-stone-400 mb-0.5 ml-1`,
    disabled && tw`text-stone-500`,
    hidden && tw`sr-only`,
  );

  return (
    <Ariakit.Role.label render={render} ref={ref} htmlFor={htmlFor} className={cn(labelClasses, className)}>
      {children}
    </Ariakit.Role.label>
  );
});
