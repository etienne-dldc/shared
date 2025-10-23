import * as Ariakit from "@ariakit/react";

import { Ref } from "react";
import { css, cx } from "../../../../styled-system/css";
import { WithCss } from "../../../../styled-system/types";
import { frameStyles } from "../../design/frame";
import { frameContentStyles } from "../../design/frameContent";
import { TDesignProps, TDesignVariant, TPaletteColor } from "../../design/types";
import { SanitizePropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { designPropsSplitter, SizeContextProvider, useContainerDesignProps } from "../core/DesignContext";
import { frameContentPropsSplitter, TFrameContentFragmentProps, useFrameContentFragment } from "./FrameContentFragment";

export type FrameProps = SanitizePropsBase<
  HTMLElement,
  WithCss &
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
  const [{ localDesign, localFrameContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const {
    color,
    highlightColor = "red",
    highlighted = false,

    baseVariant = "surface",
    css: cssProps,
    interactive = false,

    children,
    disabled = false,
    style,
    className,
    ref,

    ...htmlProps
  } = props;

  const isDisabledAndInteractive = disabled && interactive;

  const { hoverVariant, variant, height, contentHeight, spacing, rounded, depth } = useContainerDesignProps(
    localDesign,
    baseVariant,
  );

  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(localFrameContent, children);

  const [baseCss, baseInline] = frameStyles({
    height,
    contentHeight,
    rounded,
    variant,
    color,
    hoverVariant,
    interactive,
    highlightColor,
    highlighted,
  });

  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <Ariakit.Role
      className={cx(css(baseCss, contentCss, cssProps), className)}
      style={{ ...baseInline, ...contentInline, ...style }}
      aria-disabled={isDisabledAndInteractive}
      ref={ref as Ref<HTMLDivElement>}
      {...htmlProps}
    >
      <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
        {fragment}
      </SizeContextProvider>
    </Ariakit.Role>
  );
}

Frame.displayName = "Frame";
