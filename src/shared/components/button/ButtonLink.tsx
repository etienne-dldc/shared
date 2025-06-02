import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
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
import { ItemContent } from "../item-content/ItemContent";
import { itemContentFontSizeClass } from "../item-content/styles";
import { buttonClass, buttonLikeClass } from "./styles";

export type ButtonLinkProps = Merge<
  ComponentProps<"a">,
  {
    // Design
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

export function ButtonLink(inProps: ButtonLinkProps) {
  const [design, props] = DesignContext.useProps(inProps);
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
    ...linkProps
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
      <Ariakit.Role
        render={<a />}
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
        {...(linkProps as any)}
      >
        {childrenResolved}
      </Ariakit.Role>
    </DesignContext.Define>
  );
}
