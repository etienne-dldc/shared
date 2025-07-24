import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { buttonLikeStyled } from "./styles";

export type ButtonLikeProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];
    }
>;

export function ButtonLike(inProps: ButtonLikeProps) {
  const [{ localDesign, localItemContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localItemContent: itemContentPropsSplitter,
  });

  const {
    color,
    css: cssProp,

    children,

    style,
    className,
    ...buttonProps
  } = props;

  const { height, variant, contentHeight, spacing, rounded, depth } = useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [btnCss, btnInline] = buttonLikeStyled(height, contentHeight, rounded, variant, inProps.color);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <Ariakit.Role
      className={cx(css(btnCss, contentCss, cssProp), className)}
      style={{ ...style, ...btnInline, ...contentInline }}
      {...buttonProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        {fragment}
      </SizeContextProvider>
    </Ariakit.Role>
  );
}
