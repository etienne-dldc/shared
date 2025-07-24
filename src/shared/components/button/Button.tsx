import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { buttonClass, buttonLikeStyled } from "./styles";

export type ButtonProps = Merge<
  Omit<ComponentProps<"button">, "title" | "height" | "color" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Button
      render?: Ariakit.ButtonProps["render"];

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Button(inProps: ButtonProps) {
  const [{ localDesign, localDisabled, localItemContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localItemContent: itemContentPropsSplitter,
  });

  const {
    color,
    css: cssProp,

    children,

    className,
    type = "button",
    style,
    ...buttonProps
  } = props;

  const { hoverVariant, variant, height, contentHeight, spacing, rounded, depth } =
    useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [btnCss, btnInline] = buttonLikeStyled(height, contentHeight, rounded, variant, inProps.color);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);
  const buttonCss = buttonClass.raw({ hoverVariant, variant });

  return (
    <Ariakit.Button
      className={cx(css(btnCss, buttonCss, contentCss, cssProp), className)}
      style={{ ...style, ...btnInline, ...contentInline }}
      disabled={localDisabled.disabled}
      type={type}
      {...buttonProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        <DisabledContext.Define disabled={inProps.disabled}>{fragment}</DisabledContext.Define>
      </SizeContextProvider>
    </Ariakit.Button>
  );
}
