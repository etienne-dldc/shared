import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightStyles } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  resolveNestedHeight,
  TDesignSize,
  TNestedDesignHeight,
  TPaletteColor,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { ItemContent } from "../item-content/ItemContent";
import { menuItemClass } from "./styles";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color" | "height">,
  {
    // Design
    height?: TDesignSize;
    spacing?: TDesignSize;

    color?: TPaletteColor;
    css?: SystemStyleObject;
    nestedHeight?: TNestedDesignHeight;

    // Content
    startIcon?: React.ReactNode;
    loading?: boolean;
    startSlot?: React.ReactNode;
    endIcon?: React.ReactNode;
    endSlot?: React.ReactNode;
    content?: React.ReactNode;
  }
>;

export function MenuItem(inProps: MenuItemProps) {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });

  const {
    color,
    css: cssProp,
    nestedHeight,

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    children,

    style,
    className,
    ...htmlProps
  } = props;

  const { height } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [heightCss, heightInline] = heightStyles(height);

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot }}>{content}</ItemContent>
  );

  return (
    <DesignContext.Define height={nestedHeightResolved} spacing={inProps.spacing}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.MenuItem
          disabled={disabled.disabled}
          className={cx(
            css(
              heightCss,
              menuItemClass,
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              // itemContentSizeClass.raw({ height }),
              cssProp,
            ),
            className,
          )}
          style={{ ...style, ...heightInline }}
          {...htmlProps}
        >
          {childrenResolved}
        </Ariakit.MenuItem>
      </DisabledContext.Define>
    </DesignContext.Define>
  );
}
