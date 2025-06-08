import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  TDesignButtonHeight,
  TDesignContentSize,
  TDesignSpacing,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { TDynamicColor } from "../core/DynamicColorProvider";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentFontSizeClass } from "../item-content/styles";
import { menuItemClass } from "./styles";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color" | "height">,
  {
    // Design
    color?: TDynamicColor;
    height?: TDesignButtonHeight;
    contentSize?: TDesignContentSize;
    spacing?: TDesignSpacing;
    css?: SystemStyleObject;

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
  const { height, contentSize } = resolveDesignProps(design);

  const {
    color,
    css: cssProp,

    content,
    icon,
    endIcon,
    details,
    loading,
    children,

    className,
    ...htmlProps
  } = props;

  const childrenResolved = children ?? <ItemContent {...{ icon, endIcon, details, loading }}>{content}</ItemContent>;

  return (
    <DesignContext.Define height={inProps.height} spacing={inProps.spacing} contentSize={inProps.contentSize}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.MenuItem
          disabled={disabled.disabled}
          className={cx(
            css(
              heightClass.raw({ height }),
              menuItemClass,
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              itemContentFontSizeClass.raw({ contentSize, height }),
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
