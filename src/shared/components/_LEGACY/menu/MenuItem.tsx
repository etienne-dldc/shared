import * as Ariakit from "@ariakit/react";
import { css, cx } from "../../../../../styled-system/css";
import { colorPaletteClass } from "../../../design/colors";
import { frameContentStyles } from "../../../design/frameContent";
import { heightStyles } from "../../../design/styles";
import { TDesignHeight, TDesignSpacing, TPaletteColor } from "../../../design/types";
import { ComponentPropsBase } from "../../../utils/componentProps";
import { pipePropsSplitters } from "../../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../../core/DesignContext";
import {
  TFrameContentFragmentProps,
  frameContentPropsSplitter,
  useFrameContentFragment,
} from "../../frame/FrameContentFragment";
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
  const [{ localDesign, localFrameContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const {
    color: _color,
    css: cssProps,

    children,
    disabled = false,
    style,
    className,

    ...htmlProps
  } = props;

  const { height, contentHeight, spacing } = useContainerDesignProps(localDesign, "subtle");

  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(localFrameContent, children);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <DefaultDesignProvider height={contentHeight} spacing={inProps.spacing}>
      <Ariakit.MenuItem
        disabled={disabled}
        className={cx(
          css(
            heightCss,
            menuItemClass,
            inProps.color && colorPaletteClass[inProps.color],
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
    </DefaultDesignProvider>
  );
}
