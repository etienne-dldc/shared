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
import { DisabledContext } from "../core/DisabledContext";
import { ItemContent } from "../item-content/ItemContent";
import { buttonClass, buttonLikeStyled } from "./styles";

export type ButtonProps = Merge<
  Omit<ComponentProps<"button">, "title" | "height" | "color">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignSize;
    spacing?: TDesignSize;
    compact?: boolean;
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

    // Forward to Button
    render?: Ariakit.ButtonProps["render"];

    // Data attributes
    "data-hover"?: boolean;
    "data-focus-visible"?: boolean;
  }
>;

export function Button(inProps: ButtonProps) {
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
    startPadding,
    endPadding,
    children,

    className,
    type = "button",
    style,
    ...buttonProps
  } = props;

  const { hoverVariant, variant, height, compact } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [bntCss, btnInline] = buttonLikeStyled(height, nestedHeightResolved, variant, inProps.color);

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot, startPadding, endPadding }}>
      {content}
    </ItemContent>
  );

  return (
    <Ariakit.Button
      className={cx(css(bntCss, buttonClass.raw({ hoverVariant, variant }), cssProp), className)}
      style={{ ...style, ...btnInline }}
      disabled={disabled.disabled}
      type={type}
      {...buttonProps}
    >
      <DesignContext.Define
        height={nestedHeightResolved}
        compact={compact}
        spacing={inProps.spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        <DisabledContext.Define disabled={inProps.disabled}>{childrenResolved}</DisabledContext.Define>
      </DesignContext.Define>
    </Ariakit.Button>
  );
}
