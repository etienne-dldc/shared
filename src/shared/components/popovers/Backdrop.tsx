import { forwardRef } from "react";
import { cn } from "../../styles/utils";

export const Backdrop = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Backdrop({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm", className)}
      {...props}
    />
  );
});
