import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignSize, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightStyles } from "../common/styles";
import { DefaultDesignContext, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { menuItemClass } from "./styles";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color" | "height" | "content">,
  TItemContentFragmentProps & {
    // Design
    height?: TDesignSize;
    heightRatio?: number;
    spacing?: TDesignSize;

    color?: TPaletteColor;
    css?: SystemStyleObject;
  }
>;

export function MenuItem(inProps: MenuItemProps) {
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
    ...htmlProps
  } = props;

  const { height, contentHeight, spacing } = useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <DefaultDesignContext.Define height={contentHeight} spacing={inProps.spacing}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.MenuItem
          disabled={localDisabled.disabled}
          className={cx(
            css(
              heightCss,
              menuItemClass,
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              contentCss,
              // itemContentSizeClass.raw({ height }),
              cssProp,
            ),
            className,
          )}
          style={{ ...style, ...heightInline, ...contentInline }}
          {...htmlProps}
        >
          {fragment}
        </Ariakit.MenuItem>
      </DisabledContext.Define>
    </DefaultDesignContext.Define>
  );
}
