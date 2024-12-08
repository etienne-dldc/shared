import { ForwardedRef, forwardRef } from "react";

interface FieldErrorProps {
  children?: React.ReactNode;
}

export const FieldError = forwardRef(function FieldError(
  { children }: FieldErrorProps,
  ref: ForwardedRef<HTMLParagraphElement>,
): JSX.Element {
  return (
    <p ref={ref} className="text-red-500 ml-2 text-sm font-medium mt-1">
      {children}
    </p>
  );
});
