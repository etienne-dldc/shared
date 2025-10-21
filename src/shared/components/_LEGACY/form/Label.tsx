import * as Ariakit from "@ariakit/react";
import { ForwardedRef, forwardRef } from "react";

interface LabelProps {
  render?: React.ReactElement<any>;
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export const Label = forwardRef(function Label(
  {
    render,
    children,
    htmlFor,
    // className,
    // disabled = false,
    // hidden = false,
  }: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>,
) {
  // const labelClasses = css(
  //   {
  //     textStyle: "4",
  //     fontWeight: "semibold",
  //     color: "neutral.400",
  //     marginBottom: "0x",
  //     marginLeft: "0x",
  //   },
  //   disabled && { color: "neutral.500" },
  //   hidden && { srOnly: true },
  // );

  return (
    <Ariakit.Role.label
      render={render}
      ref={ref}
      htmlFor={htmlFor}
      // className={cn(labelClasses, className)}
    >
      {children}
    </Ariakit.Role.label>
  );
});
