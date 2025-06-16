import { ComponentPropsWithRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { isNotNil } from "../../utils/nil";
import { DesignContext, resolveDesignProps, TDesignButtonHeight, TDesignSpacing } from "../core/DesignContext";
import { ItemContentFragment } from "./ItemContentFragment";
import { itemContentClass, itemContentSizeClass } from "./styles";

interface ItemContentProps extends Omit<ComponentPropsWithRef<"div">, "content"> {
  height?: TDesignButtonHeight;
  spacing?: TDesignSpacing;

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

  /**
   * Reduce left padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of startIcon or startSlot and children.
   * You only need need to set this if
   * - You pass a custom content that has a start icon
   * - You pass a startSlot that is not an icon
   */
  startPadding?: "auto" | "icon" | "text" | "none";

  /**
   * Reduce right padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of endIcon or endSlot.
   * You only need need to set this if
   * - You pass a custom content that has an end icon
   * - You pass an endSlot that is not an icon
   */
  endPadding?: "auto" | "icon" | "text" | "none";

  css?: SystemStyleObject;
}

/**
 * Render items horizontally
 * - Set proper padding and spacing
 * - Set font size
 * - Provide nested content size
 */
export function ItemContent(inProps: ItemContentProps) {
  const [
    design,
    {
      startIcon,
      loading,
      startSlot,

      endIcon,
      endSlot,

      children,

      className,
      css: cssProp,

      startPadding = "auto",
      endPadding = "auto",

      ...htmlProps
    },
  ] = DesignContext.useProps(inProps);

  const { height, spacing } = resolveDesignProps(design);

  const hasStartSlot = Boolean(startSlot || startIcon || loading);
  const hasEndSlot = Boolean(endSlot || endIcon);
  const hasChildren = isNotNil(children);
  // Special case for start icon/slot only
  const iconOnly = (hasStartSlot && !hasChildren && !hasEndSlot) || (hasEndSlot && !hasStartSlot && !hasChildren);

  const defaultStartPadding = iconOnly ? "none" : hasStartSlot ? "icon" : "text";
  const startPaddingResolved = startPadding === "auto" ? defaultStartPadding : startPadding;

  const defaultEndPadding = iconOnly ? "none" : hasEndSlot ? "icon" : "text";
  const endPaddingResolved = endPadding === "auto" ? defaultEndPadding : endPadding;

  return (
    <div
      className={cx(
        css(
          itemContentClass.raw({ spacing, startPadding: startPaddingResolved, endPadding: endPaddingResolved }),
          itemContentSizeClass.raw({ height }),
          cssProp,
        ),
        className,
      )}
      {...htmlProps}
    >
      <ItemContentFragment
        startIcon={startIcon}
        loading={loading}
        startSlot={startSlot}
        endIcon={endIcon}
        endSlot={endSlot}
        children={children}
      />
    </div>
  );
}
