import * as Ariakit from "@ariakit/react";

import { useMemo } from "react";
import { css, cx } from "../../../../styled-system/css";
import { TDesignProps, TDesignVariant, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext, useDisabled } from "../core/DisabledContext";
import { frameContentPropsSplitter, TFrameContentFragmentProps, useFrameContentFragment } from "./FrameContentFragment";
import { frameContentStyles, frameStyles } from "./styles";

export type FrameProps = ComponentPropsBase<
  "div",
  TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      highlightColor?: TPaletteColor;
      highlighted?: boolean;

      /**
       * Defines the variant used as the base for this Frame.
       * For example, Input components use the "input" variant by default.
       */
      baseVariant?: TDesignVariant;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];

      interactive?: boolean;

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Frame(inProps: FrameProps) {
  const [{ localDesign, localDisabled, localFrameContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const {
    color,
    highlightColor = "red",
    highlighted = false,

    baseVariant = "surface",

    css: cssProps,

    children,

    style,
    className,
    interactive = false,
    ...htmlProps
  } = props;

  const isDisabled = useDisabled(localDisabled);
  const isDisabledAndInteractive = isDisabled && interactive;

  const { hoverVariant, variant, height, contentHeight, spacing, rounded, depth } = useContainerDesignProps(
    localDesign,
    baseVariant,
  );

  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(localFrameContent, children);

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
    () => frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout),
    [contentHeight, endPadding, noLayout, spacing, startPadding],
  );

  return (
    <Ariakit.Role
      className={cx(css(baseCss, contentCss, cssProps), className)}
      style={{ ...baseInline, ...contentInline, ...style }}
      aria-disabled={isDisabledAndInteractive}
      {...htmlProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        <DisabledContext.Define disabled={isDisabled ? inProps.disabled : undefined}>{fragment}</DisabledContext.Define>
      </SizeContextProvider>
    </Ariakit.Role>
  );
}
