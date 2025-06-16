import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  resolveNestedHeight,
  TDesignButtonHeight,
  TDesignSpacing,
  TDesignVariant,
  TNestedDesignHeight,
  TPaletteColor,
} from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentSizeClass } from "../item-content/styles";
import { buttonLikeClass } from "./styles";

export type ButtonLikeProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignButtonHeight;
    spacing?: TDesignSpacing;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;

    color?: TPaletteColor;
    css?: SystemStyleObject;
    nestedHeight?: TNestedDesignHeight;

    // For content
    startIcon?: React.ReactNode;
    loading?: boolean;
    startSlot?: React.ReactNode;
    endIcon?: React.ReactNode;
    endSlot?: React.ReactNode;
    content?: React.ReactNode;
    startPadding?: "auto" | "icon" | "text" | "none";
    endPadding?: "auto" | "icon" | "text" | "none";

    // Forward to Element
    render?: Ariakit.RoleProps["render"];
  }
>;

export function ButtonLike(inProps: ButtonLikeProps) {
  const [{ design }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
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
    startPadding,
    endPadding,
    children,

    className,
    ...buttonProps
  } = props;

  const { height, variant } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);

  const childrenResolved = children ?? (
    <ItemContent
      {...{ startIcon, endIcon, endSlot, loading, startSlot, startPadding, endPadding, spacing: inProps.spacing }}
    >
      {content}
    </ItemContent>
  );

  return (
    <Ariakit.Role
      className={cx(
        css(
          heightClass.raw({ height }),
          buttonLikeClass.raw({ variant, height }),
          inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
          itemContentSizeClass.raw({ height }),
          cssProp,
        ),
        className,
      )}
      {...buttonProps}
    >
      <DesignContext.Define
        height={nestedHeightResolved}
        spacing={inProps.spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        {childrenResolved}
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
