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
  TPaletteColor,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentSizeClass } from "../item-content/styles";
import { buttonClass, buttonLikeClass } from "./styles";

export type ButtonProps = Merge<
  Omit<ComponentProps<"button">, "title" | "height" | "color">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignButtonHeight;
    spacing?: TDesignSpacing;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;

    color?: TPaletteColor;
    css?: SystemStyleObject;
    innerHeight?: TDesignButtonHeight;

    // For content
    startIcon?: React.ReactNode;
    loading?: boolean;
    startSlot?: React.ReactNode;
    endIcon?: React.ReactNode;
    endSlot?: React.ReactNode;
    content?: React.ReactNode;

    // Forward to Button
    render?: React.ReactElement<any>;

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
    innerHeight,

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    children,

    className,
    type = "button",
    ...buttonProps
  } = props;

  const { height, hoverVariant, variant } = resolveDesignProps(design);
  const nestedHeight = innerHeight ?? resolveNestedHeight(height);

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot }}>{content}</ItemContent>
  );

  return (
    <Ariakit.Button
      className={cx(
        css(
          heightClass.raw({ height }),
          buttonLikeClass.raw({ variant, height }),
          buttonClass.raw({ hoverVariant, variant }),
          inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
          itemContentSizeClass.raw({ height }),
          cssProp,
        ),
        className,
      )}
      disabled={disabled.disabled}
      type={type}
      {...buttonProps}
    >
      {" "}
      <DesignContext.Define
        height={nestedHeight}
        spacing={inProps.spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        <DisabledContext.Define disabled={inProps.disabled}>{childrenResolved}</DisabledContext.Define>
      </DesignContext.Define>
    </Ariakit.Button>
  );
}
