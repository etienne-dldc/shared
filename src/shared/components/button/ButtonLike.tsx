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
    innerHeight?: TDesignButtonHeight;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    content?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;

    // Forward to Element
    render?: React.ReactElement<any>;
  }
>;

export function ButtonLike(inProps: ButtonLikeProps) {
  const [{ design }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
  });

  const {
    color,
    css: cssProp,
    innerHeight,

    content,
    icon,
    endIcon,
    endAction,
    details,
    loading,
    children,

    className,
    ...buttonProps
  } = props;

  const { height, variant } = resolveDesignProps(design);
  const nestedHeight = innerHeight ?? resolveNestedHeight(height);

  const childrenResolved = children ?? (
    <ItemContent {...{ icon, endIcon, endAction, details, loading }}>{content}</ItemContent>
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
        height={nestedHeight}
        spacing={inProps.spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        {childrenResolved}
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
