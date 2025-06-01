import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cn, tw } from "../../styles/utils";
import { DynamicColorProvider } from "../core/DynamicColorProvider";

export const Paper = forwardRef(function Paper(
  { className, ...divProps }: ComponentPropsWithoutRef<"div">,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <DynamicColorProvider force>
      <div
        className={cn(tw`bg-zinc-900 rounded-md shadow-xl border-[0.5px] border-neutral-700/70`, className)}
        {...divProps}
        ref={ref}
      />
    </DynamicColorProvider>
  );
});
