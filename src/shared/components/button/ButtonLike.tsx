import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DesignContext,
  resolveDesignProps,
  resolveNestedHeight,
  TDesignSize,
  TDesignVariant,
  TNestedDesignHeight,
  TPaletteColor,
} from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { buttonLikeStyled } from "./styles";

export type ButtonLikeProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignSize;
    spacing?: TDesignSize;
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

    style,
    className,
    ...buttonProps
  } = props;

  const { height, variant } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [bntCss, btnInline] = buttonLikeStyled(height, nestedHeightResolved, variant, inProps.color);

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot, startPadding, endPadding }}>
      {content}
    </ItemContent>
  );

  return (
    <Ariakit.Role className={cx(css(bntCss, cssProp), className)} style={{ ...style, ...btnInline }} {...buttonProps}>
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
