import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass, crossSizeClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  TDesignContentSize,
  TDesignCrossSize,
  TDesignMainSize,
  TDesignVariant,
  TPaletteColor,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentFontSizeClass } from "../item-content/styles";
import { buttonClass, buttonLikeClass } from "./styles";

export type ButtonProps = Merge<
  Omit<ComponentProps<"button">, "title">,
  {
    // Design
    disabled?: boolean;
    crossSize?: TDesignCrossSize;
    contentSize?: TDesignContentSize;
    mainSize?: TDesignMainSize;
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
  }
>;

export function Button(inProps: ButtonProps) {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });
  const { contentSize, crossSize, hoverVariant, variant } = resolveDesignProps(design);

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
      crossSize={inProps.crossSize}
      mainSize={inProps.mainSize}
      contentSize={inProps.contentSize}
      variant={inProps.variant}
      hoverVariant={inProps.hoverVariant}
    >
      <Ariakit.Button
        className={cx(
          css(
            crossSizeClass.raw({ crossSize }),
            buttonLikeClass.raw({ variant }),
            buttonClass.raw({ hoverVariant, variant }),
            inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
            itemContentFontSizeClass.raw({ contentSize, crossSize }),
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
    </DesignContext.Define>
  );
}
