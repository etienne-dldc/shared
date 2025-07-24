import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DefaultDesignProvider,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { buttonClass, buttonLikeStyled } from "./styles";

export type ButtonLinkProps = Merge<
  Omit<ComponentProps<"a">, "title">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Button
      render?: React.ReactElement<any>;
    }
>;

export function ButtonLink(inProps: ButtonLinkProps) {
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
    ...linkProps
  } = props;

  const { height, hoverVariant, variant, contentHeight, spacing, rounded, depth } =
    useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [bntCss, btnInline] = buttonLikeStyled(height, contentHeight, rounded, variant, inProps.color);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <Ariakit.Role
      render={<a />}
      className={cx(css(bntCss, buttonClass.raw({ hoverVariant, variant }), contentCss, cssProp), className)}
      style={{ ...style, ...btnInline, ...contentInline }}
      disabled={localDisabled.disabled}
      {...(linkProps as any)}
    >
      <DefaultDesignProvider {...localDesign} height={null}>
        <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
          <DisabledContext.Define disabled={inProps.disabled}>{fragment}</DisabledContext.Define>
        </SizeContextProvider>
      </DefaultDesignProvider>
    </Ariakit.Role>
  );
}
