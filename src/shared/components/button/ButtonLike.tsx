import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass } from "../common/styles";
import {
  DesignContext,
  resolveDesignProps,
  TDesignCrossSize,
  TDesignMainSize,
  TDesignRounded,
  TDesignVariant,
  TPaletteColor,
} from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentFontSizeClass } from "../item-content/styles";
import { buttonLikeClass } from "./styles";

export type ButtonLikeProps = Merge<
  ComponentProps<"div">,
  {
    // Design
    disabled?: boolean;
    crossSize?: TDesignCrossSize;
    contentSize?: TDesignCrossSize;
    mainSize?: TDesignMainSize;
    rounded?: TDesignRounded;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;
    css?: SystemStyleObject;

    color?: TPaletteColor;

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
  const { contentSize, crossSize, variant } = resolveDesignProps(design);

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
      rounded={inProps.rounded}
      hoverVariant={inProps.hoverVariant}
    >
      <Ariakit.Role
        className={cx(
          css(
            buttonLikeClass.raw({ crossSize, variant }),
            inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
            itemContentFontSizeClass.raw({ contentSize, crossSize }),
            cssProp,
          ),
          className,
        )}
        {...buttonProps}
      >
        {childrenResolved}
      </Ariakit.Role>
    </DesignContext.Define>
  );
}
