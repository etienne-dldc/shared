import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cn, tw } from "../styles/utils";
import { DesignContext } from "./DesignContext";
import { DynamicColorProvider } from "./DynamicColorProvider";

export type TPaperLevel = "background" | "card" | "dialog" | "popover";

export interface PaperProps extends ComponentPropsWithoutRef<"div"> {
  level: TPaperLevel;
  darkerBackground?: boolean;
}

const PAPER_LEVEL_STYLES = {
  background: tw`bg-zinc-900`,
  card: tw`bg-zinc-900 rounded-md flex flex-col`,
  dialog: tw`bg-zinc-900 rounded-md shadow-xl ring-1 ring-inset ring-white/10 flex flex-col`,
  popover: tw`bg-zinc-900 rounded-md shadow-xl ring-1 ring-inset ring-white/10 flex flex-col`,
} as const;

export const Paper = forwardRef(function Paper(
  { level, darkerBackground = false, className, ...divProps }: PaperProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <DesignContext.Provider rounded="all">
      <DynamicColorProvider force={level === "dialog" || level === "popover"}>
        <div
          className={cn(PAPER_LEVEL_STYLES[level], darkerBackground && tw`bg-zinc-950`, className)}
          {...divProps}
          ref={ref}
        />
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
});
