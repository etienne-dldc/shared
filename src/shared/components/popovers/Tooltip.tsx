import * as Ariakit from "@ariakit/react";
import { forwardRef } from "react";
import { css } from "../../../../styled-system/css";
import { Paper } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { forwardButtonGroupAttributes } from "../../utils/forwardButtonGroupAttributes";

interface TooltipProps extends Omit<Ariakit.TooltipProviderProps, "children"> {
  children: React.ReactElement<any>;
  content?: React.ReactNode;
  css?: SystemStyleObject;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { children, showTimeout = 300, content, css: cssProps, ...props },
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
        // eslint-disable-next-line @pandacss/no-dynamic-styling
        render={<Paper css={css.raw({ bg: "neutral.950", px: "3", py: "1x", userSelect: "none" }, cssProps)} />}
      >
        {content}
      </Ariakit.Tooltip>
    </Ariakit.TooltipProvider>
  );
});
