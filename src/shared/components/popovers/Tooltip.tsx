import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { Paper } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { forwardButtonGroupAttributes } from "../../utils/forwardButtonGroupAttributes";

interface TooltipProps extends Omit<Ariakit.TooltipProviderProps, "children"> {
  children: React.ReactElement<any>;
  content?: React.ReactNode;
  css?: SystemStyleObject;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { children, showTimeout = 300, content, css: cssProp, ...props },
  ref,
) {
  const childrenWithAttrs = forwardButtonGroupAttributes(props, children);

  if (!content) {
    return <>{childrenWithAttrs}</>;
  }

  return (
    <Ariakit.TooltipProvider showTimeout={showTimeout} {...props}>
      <Ariakit.TooltipAnchor ref={ref} render={childrenWithAttrs} />
      <Ariakit.Tooltip
        unmountOnHide
        render={
          <Paper
            level="modal"
            px="3"
            py="1x"
            userSelect="none"
            // eslint-disable-next-line @pandacss/no-dynamic-styling, @pandacss/no-property-renaming
            css={cssProp}
          />
        }
      >
        {content}
      </Ariakit.Tooltip>
    </Ariakit.TooltipProvider>
  );
});
