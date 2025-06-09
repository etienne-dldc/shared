import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, heightClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  TDesignButtonHeight,
  TDesignContentSize,
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
    contentSize?: TDesignContentSize;
    spacing?: TDesignSpacing;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;
    color?: TPaletteColor;
    css?: SystemStyleObject;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    content?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;

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
  const { contentSize, height, hoverVariant, variant } = resolveDesignProps(design);

  const {
    color,
    css: cssProp,

    content,
    icon,
    endIcon,
    endAction,
    details,
    loading,
    children,

    className,
    type = "button",
    ...buttonProps
  } = props;

  const childrenResolved = children ?? (
    <ItemContent {...{ icon, endIcon, endAction, details, loading }}>{content}</ItemContent>
  );

  return (
    <DesignContext.Define
      height={inProps.height}
      spacing={inProps.spacing}
      contentSize={inProps.contentSize}
      variant={inProps.variant}
      hoverVariant={inProps.hoverVariant}
    >
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.Button
          className={cx(
            css(
              heightClass.raw({ height }),
              buttonLikeClass.raw({ variant, height }),
              buttonClass.raw({ hoverVariant, variant }),
              inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              itemContentSizeClass.raw({ contentSize, height }),
              cssProp,
            ),
            className,
          )}
          disabled={disabled.disabled}
          type={type}
          {...buttonProps}
        >
          {childrenResolved}
        </Ariakit.Button>
      </DisabledContext.Define>
    </DesignContext.Define>
  );
}
