import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { css } from "../../../../styled-system/css";
import { Paper } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { forwardFrameGroupAttributes } from "../../utils/forwardFrameGroupAttributes";

interface TooltipProps extends Omit<Ariakit.TooltipProviderProps, "children"> {
  children: React.ReactElement<any>;
  content?: React.ReactNode;
  css?: SystemStyleObject;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { children, showTimeout = 300, content, css: cssProps, ...props },
  ref,
) {
  const childrenWithAttrs = forwardFrameGroupAttributes(props, children);

  if (!content) {
    return <>{childrenWithAttrs}</>;
  }

  const paperCss = css.raw({ bg: "neutral.950", px: "3", py: "1x", userSelect: "none" }, cssProps);

  return (
    <Ariakit.TooltipProvider showTimeout={showTimeout} {...props}>
      <Ariakit.TooltipAnchor ref={ref} render={childrenWithAttrs} />
      <Ariakit.Tooltip
        unmountOnHide
        // eslint-disable-next-line @pandacss/no-dynamic-styling, @pandacss/no-property-renaming
        render={<Paper css={paperCss} />}
      >
        {content}
      </Ariakit.Tooltip>
    </Ariakit.TooltipProvider>
  );
});

Tooltip.displayName = "Tooltip";
