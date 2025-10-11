import * as Ariakit from "@ariakit/react";
import { css, cx } from "../../../../styled-system/css";
import { colorPaletteClass, heightStyles } from "../../design/styles";
import { TDesignHeight, TDesignSpacing, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import {
  TFrameContentFragmentProps,
  frameContentPropsSplitter,
  useFrameContentFragment,
} from "../frame/FrameContentFragment";
import { frameContentStyles } from "../frame/styles";
import { menuItemClass } from "./styles";

export type MenuItemProps = ComponentPropsBase<
  "div",
  Ariakit.MenuItemProps &
    TFrameContentFragmentProps & {
      // Design
      height?: TDesignHeight;
      heightRatio?: number;
      spacing?: TDesignSpacing;
      color?: TPaletteColor;
    }
>;

export function MenuItem(inProps: MenuItemProps) {
  const [{ localDesign, localDisabled, localFrameContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const {
    color: _color,
    css: cssProps,

    children,

    style,
    className,
    ...htmlProps
  } = props;

  const { height, contentHeight, spacing } = useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(localFrameContent, children);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <DefaultDesignProvider height={contentHeight} spacing={inProps.spacing}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.MenuItem
          disabled={localDisabled.disabled}
          className={cx(
            css(
              heightCss,
              menuItemClass,
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              contentCss,
              // frameContentSizeClass.raw({ height }),
              cssProps,
            ),
            className,
          )}
          style={{ ...style, ...heightInline, ...contentInline }}
          {...htmlProps}
        >
          {fragment}
        </Ariakit.MenuItem>
      </DisabledContext.Define>
    </DefaultDesignProvider>
  );
}
