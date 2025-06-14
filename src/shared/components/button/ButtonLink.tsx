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

export type ButtonLinkProps = Merge<
  Omit<ComponentProps<"a">, "title">,
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

    // Forward to Button
    render?: React.ReactElement<any>;
  }
>;

export function ButtonLink(inProps: ButtonLinkProps) {
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
    endAction,
    details,
    loading,
    children,

    className,
    ...linkProps
  } = props;

  const { height, hoverVariant, variant, spacing } = resolveDesignProps(design);
  const nestedHeight = innerHeight ?? resolveNestedHeight(height);

  const childrenResolved = children ?? (
    <ItemContent {...{ icon, endIcon, endAction, details, loading }}>{content}</ItemContent>
  );

  return (
    <Ariakit.Role
      render={<a />}
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
      {...(linkProps as any)}
    >
      <DesignContext.Define
        height={nestedHeight}
        spacing={spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        <DisabledContext.Define disabled={inProps.disabled}>{childrenResolved}</DisabledContext.Define>
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
