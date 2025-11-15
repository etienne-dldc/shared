import * as Ariakit from "@ariakit/react";
import { css, cx } from "../../../../../styled-system/css";
import { heightStyles } from "../../../css/design";
import { dynamicColor } from "../../../css/dynamicColor.css";
import { frameContentStyles } from "../../../css/frameContent";
import { TDesignHeight, TDesignSpacing, TPaletteColor } from "../../../css/types";
import { ComponentPropsBaseWith } from "../../../utils/componentProps";
import { pipePropsSplitters } from "../../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../../core/DesignContext";
import {
  TFrameContentFragmentProps,
  frameContentPropsSplitter,
  useFrameContentFragment,
} from "../../frame/FrameContentFragment";
import { menuItemClass } from "./styles";

export type MenuItemProps = ComponentPropsBaseWith<
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

  const [heightClass, heightInline] = heightStyles(height);
  const [contentClass, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <DefaultDesignProvider height={contentHeight} spacing={inProps.spacing}>
      <Ariakit.MenuItem
        disabled={disabled}
        className={cx(
          heightClass,
          contentClass,
          inProps.color && dynamicColor[inProps.color],
          css(
            menuItemClass,
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
