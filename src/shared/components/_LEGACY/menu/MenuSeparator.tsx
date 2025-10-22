import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";

export const MenuSeparator = forwardRef<HTMLDivElement, Ariakit.MenuSeparatorProps>(function MenuSeparator(
  {
    //className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      // className={cn("h-px bg-white/15 my-1 mx-1", className)}
      {...props}
    />
  );
});
