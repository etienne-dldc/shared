import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass, heightStyles } from "../../design/styles";
import { TDesignHeight, TDesignSpacing, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";
import { menuItemClass } from "./styles";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color" | "height" | "content">,
  TItemContentFragmentProps & {
    // Design
    height?: TDesignHeight;
    heightRatio?: number;
    spacing?: TDesignSpacing;

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
    css: cssProps,

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
              // itemContentSizeClass.raw({ height }),
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
