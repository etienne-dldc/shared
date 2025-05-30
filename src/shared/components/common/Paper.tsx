import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cn, tw } from "../../styles/utils";
import { DesignContext } from "../core/DesignContext";
import { DynamicColorProvider } from "../core/DynamicColorProvider";

export const Paper = forwardRef(function Paper(
  { className, ...divProps }: ComponentPropsWithoutRef<"div">,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <DesignContext.Define rounded="all">
      <DynamicColorProvider force>
        <div
          className={cn(tw`bg-zinc-900 rounded-md shadow-xl border-[0.5px] border-neutral-700/70`, className)}
          {...divProps}
          ref={ref}
        />
      </DynamicColorProvider>
    </DesignContext.Define>
  );
});
