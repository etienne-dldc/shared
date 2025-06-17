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

export type ButtonLinkProps = Merge<
  Omit<ComponentProps<"a">, "title">,
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
    alignStartIcon?: boolean;
    alignEndIcon?: boolean;

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
    nestedHeight,

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    alignStartIcon,
    alignEndIcon,
    children,

    style,
    className,
    ...linkProps
  } = props;

  const { height, hoverVariant, variant, spacing } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [bntCss, btnInline] = buttonLikeStyled(height, nestedHeightResolved, variant, inProps.color);

  const childrenResolved = children ?? (
    <ItemContent
      {...{ startIcon, endIcon, endSlot, loading, startSlot, alignStartIcon, alignEndIcon, spacing: inProps.spacing }}
    >
      {content}
    </ItemContent>
  );

  return (
    <Ariakit.Role
      render={<a />}
      className={cx(css(bntCss, buttonClass.raw({ hoverVariant, variant }), cssProp), className)}
      style={{ ...style, ...btnInline }}
      disabled={disabled.disabled}
      {...(linkProps as any)}
    >
      <DesignContext.Define
        height={nestedHeightResolved}
        spacing={spacing}
        variant={inProps.variant}
        hoverVariant={inProps.hoverVariant}
      >
        <DisabledContext.Define disabled={inProps.disabled}>{childrenResolved}</DisabledContext.Define>
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
