import * as Ariakit from "@ariakit/react";

import { useMemo } from "react";
import { css, cx } from "../../../../styled-system/css";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { frameStyles } from "./styles";

export type FrameProps = ComponentPropsBase<
  "div",
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      highlightColor?: TPaletteColor;
      highlighted?: boolean;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];

      interactive?: boolean;

      // Data attributes
      "data-hover"?: boolean;
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
    highlightColor = "red",
    highlighted = false,

    css: cssProps,

    children,

    style,
    className,
    interactive = false,
    ...htmlProps
  } = props;

  const isDisabled = interactive && localDisabled.disabled;

  const { hoverVariant, variant, height, contentHeight, spacing, rounded, depth } =
    useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [baseCss, baseInline] = useMemo(
    () =>
      frameStyles({
        height,
        contentHeight,
        rounded,
        variant,
        color,
        hoverVariant,
        interactive,
        highlightColor,
        highlighted,
      }),
    [color, contentHeight, height, highlightColor, highlighted, hoverVariant, interactive, rounded, variant],
  );
  const [contentCss, contentInline] = useMemo(
    () => itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout),
    [contentHeight, endPadding, noLayout, spacing, startPadding],
  );

  return (
    <Ariakit.Role
      className={cx(css(baseCss, contentCss, cssProps), className)}
      style={{ ...baseInline, ...contentInline, ...style }}
      aria-disabled={isDisabled}
      {...htmlProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        <DisabledContext.Define disabled={isDisabled ? inProps.disabled : undefined}>{fragment}</DisabledContext.Define>
      </SizeContextProvider>
    </Ariakit.Role>
  );
}
