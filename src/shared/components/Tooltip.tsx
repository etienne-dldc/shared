import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";

import { cn } from "../styles/utils";

interface TooltipProps extends Omit<Ariakit.TooltipProviderProps, "children"> {
  children: React.ReactElement;
  content?: React.ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { children, showTimeout = 300, content, ...props },
  ref,
) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <Ariakit.TooltipProvider showTimeout={showTimeout} {...props}>
      <Ariakit.TooltipAnchor ref={ref} render={children} />
      <Ariakit.Tooltip
        className={cn("bg-stone-950 px-3 py-1.5 rounded leading-relaxed shadow-xl text-stone-200 select-none")}
        unmountOnHide
      >
        {content}
      </Ariakit.Tooltip>
    </Ariakit.TooltipProvider>
  );
});
