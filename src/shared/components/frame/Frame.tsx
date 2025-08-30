import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { buttonClass, buttonLikeStyles } from "../button/styles";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";

export type FrameProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height" | "color" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];

      interactive?: boolean;

      // Data attributes
      "data-hover"?: boolean;
      "aria-disabled"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Frame(inProps: FrameProps) {
  const [{ localDesign, localDisabled, localItemContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localItemContent: itemContentPropsSplitter,
  });

  const {
    color,
    css: cssProp,

    children,

    style,
    className,
    interactive = false,
    ...buttonProps
  } = props;

  const isDisabled = interactive && localDisabled.disabled;

  const { hoverVariant, variant, height, contentHeight, spacing, rounded, depth } =
    useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [btnCss, btnInline] = buttonLikeStyles(height, contentHeight, rounded, variant, color);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);
  const buttonCss = buttonClass.raw({ hoverVariant, variant });

  return (
    <Ariakit.Role
      className={cx(css(btnCss, buttonCss, contentCss, cssProp), className)}
      style={{ ...style, ...btnInline, ...contentInline }}
      aria-disabled={isDisabled}
      {...buttonProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        <DisabledContext.Define disabled={isDisabled ? inProps.disabled : undefined}>{fragment}</DisabledContext.Define>
      </SizeContextProvider>
    </Ariakit.Role>
  );
}
