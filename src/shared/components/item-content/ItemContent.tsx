import { ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { Ellipsis } from "../../../../styled-system/jsx";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import {
  DesignContext,
  resolveDesignProps,
  resolveOuterHeight,
  TDesignButtonHeight,
  TDesignSpacing,
} from "../core/DesignContext";
import { SideSlot } from "./SideSlot";
import { itemContentClass, itemContentInnerSpacingClass, itemContentSizeClass } from "./styles";

interface ItemContentProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  height?: TDesignButtonHeight;
  spacing?: TDesignSpacing;
  innerHeight?: TDesignButtonHeight;

  startIcon?: React.ReactNode;
  /**
   * Override the startIcon with a loading icon.
   */
  loading?: boolean;
  /**
   * Override the startIcon and loading icon with a custom element.
   */
  startSlot?: React.ReactNode;

  endIcon?: React.ReactNode;
  endSlot?: React.ReactNode;

  children?: React.ReactNode;
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
    {
      startIcon,
      loading,
      startSlot,

      endIcon,
      endSlot,

      children,

      className,
      innerHeight,
      css: cssProp,

      ...htmlProps
    },
  ] = DesignContext.useProps(props);

  const { height } = resolveDesignProps(designBase);
  const spacing = resolveOuterHeight(height);

  const hasStartSlot = Boolean(startSlot || startIcon || loading);
  const hasEndSlot = Boolean(endSlot || endIcon);
  const hasChildren = isNotNil(children);

  /**
   * Special case for start icon/slot only
   */
  const iconOnly = (hasStartSlot && !hasChildren && !hasEndSlot) || (hasEndSlot && !hasStartSlot && !hasChildren);

  return (
    <div
      className={cx(
        css(itemContentClass.raw({ spacing }), itemContentSizeClass.raw({ height }), iconOnly && { px: "0" }, cssProp),
        className,
      )}
      {...htmlProps}
    >
      <DesignContext.Define spacing={props.spacing}>
        {hasStartSlot && (
          <SideSlot icon={startIcon} loading={loading} slot={startSlot} isItemIconSlot isIconOnly={iconOnly} />
        )}
        {hasChildren && (
          <div
            className={css(
              { display: "flex", flexGrow: 1, alignItems: "center", overflow: "hidden" },
              itemContentInnerSpacingClass.raw({
                hasLeftIcon: hasStartSlot ? "yes" : "no",
                hasRightIcon: hasEndSlot ? "yes" : "no",
              }),
            )}
          >
            {typeof children === "string" ? <Ellipsis>{children}</Ellipsis> : children}
          </div>
        )}
        {hasEndSlot && <SideSlot icon={endIcon} slot={endSlot} isItemIconSlot={false} isIconOnly={iconOnly} />}
      </DesignContext.Define>
    </div>
  );
}
