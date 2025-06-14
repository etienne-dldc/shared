import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  resolveNestedHeight,
  TDesignButtonHeight,
  TDesignSpacing,
  TPaletteColor,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentSizeClass } from "../item-content/styles";
import { menuItemClass } from "./styles";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color" | "height">,
  {
    // Design
    height?: TDesignButtonHeight;
    spacing?: TDesignSpacing;

    color?: TPaletteColor;
    css?: SystemStyleObject;
    innerHeight?: TDesignButtonHeight;

    // Content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    content?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;
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
    innerHeight,

    content,
    icon,
    endIcon,
    details,
    loading,
    children,

    className,
    ...htmlProps
  } = props;

  const { height } = resolveDesignProps(design);
  const nestedHeight = innerHeight ?? resolveNestedHeight(height);

  const childrenResolved = children ?? <ItemContent {...{ icon, endIcon, details, loading }}>{content}</ItemContent>;

  return (
    <DesignContext.Define height={nestedHeight} spacing={inProps.spacing}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.MenuItem
          disabled={disabled.disabled}
          className={cx(
            css(
              heightClass.raw({ height }),
              menuItemClass,
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              itemContentSizeClass.raw({ height }),
              cssProp,
            ),
            className,
          )}
          {...htmlProps}
        >
          {childrenResolved}
        </Ariakit.MenuItem>
      </DisabledContext.Define>
    </DesignContext.Define>
  );
}
