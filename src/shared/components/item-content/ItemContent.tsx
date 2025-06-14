import { ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { Ellipsis } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";
import {
  DesignContext,
  resolveDesignProps,
  resolveOuterHeight,
  TDesignButtonHeight,
  TDesignSpacing,
} from "../core/DesignContext";
import { itemContentClass, itemContentInnerSpacingClass, itemContentSizeClass } from "./styles";

interface ItemContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  height?: TDesignButtonHeight;
  spacing?: TDesignSpacing;
  innerHeight?: TDesignButtonHeight;

  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endAction?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  css?: SystemStyleObject;
}

/**
 * Render items horizontally
 * - Set proper padding and spacing
 * - Set font size
 * - Provide nested content size
 */
export function ItemContent(props: ItemContentProps) {
  const [
    designBase,
    { icon, endIcon, endAction, children, loading, className, innerHeight, css: cssProp, ...htmlProps },
  ] = DesignContext.useProps(props);

  const { height } = resolveDesignProps(designBase);
  const spacing = resolveOuterHeight(height);

  const hasStartIcon = Boolean(icon || loading);
  const hasEndAction = Boolean(endAction || endIcon);
  const hasChildren = isNotNil(children);

  const iconOnly = (hasStartIcon && !hasChildren && !hasEndAction) || (hasEndAction && !hasStartIcon && !hasChildren);
  const iconOnlyStyles = iconOnly ? css.raw({ mx: "auto" }) : null;

  const endActionResolved = endAction ? (
    <div className={css({ ml: "auto" }, iconOnlyStyles)}>{endAction}</div>
  ) : endIcon ? (
    <IconBox
      data-slot={hasChildren ? "item-icon" : undefined}
      css={css.raw({ ml: "auto" }, iconOnlyStyles)}
      icon={endIcon}
    />
  ) : null;

  return (
    <div
      className={cx(
        css(itemContentClass.raw({ spacing }), itemContentSizeClass.raw({ height }), iconOnly && { px: "0" }, cssProp),
        className,
      )}
      {...htmlProps}
    >
      <DesignContext.Define spacing={props.spacing}>
        {hasStartIcon && (
          <IconBox
            css={css.raw({ mr: "auto" }, iconOnlyStyles)}
            icon={loading ? <LoadingIcon /> : icon}
            data-slot={hasChildren ? "item-icon" : undefined}
          />
        )}
        {hasChildren && (
          <div
            className={css(
              { display: "flex", flexGrow: 1, alignItems: "center", overflow: "hidden" },
              itemContentInnerSpacingClass.raw({
                hasLeftIcon: hasStartIcon ? "yes" : "no",
                hasRightIcon: hasEndAction ? "yes" : "no",
              }),
            )}
          >
            {typeof children === "string" ? <Ellipsis>{children}</Ellipsis> : children}
          </div>
        )}
        {endActionResolved}
      </DesignContext.Define>
    </div>
  );
}
