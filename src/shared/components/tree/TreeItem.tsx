import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { NodeApi } from "react-arborist";
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
  TPaletteColor,
} from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentSizeClass } from "../item-content/styles";
import { treeItemClass } from "./styles";

export type TreeItemProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    node: NodeApi<any>;
    style: React.CSSProperties;
    dragHandle?: (el: HTMLDivElement | null) => void;

    // Design
    height?: TDesignButtonHeight;
    spacing?: TDesignSpacing;

    innerHeight?: TDesignButtonHeight;
    css?: SystemStyleObject;
    color?: TPaletteColor;

    // For content
    startIcon?: React.ReactNode;
    loading?: boolean;
    startSlot?: React.ReactNode;
    endIcon?: React.ReactNode;
    endSlot?: React.ReactNode;
    content?: React.ReactNode;

    // Forward to Element
    render?: React.ReactElement<any>;
  }
>;

export function TreeItem(inProps: TreeItemProps) {
  const [{ design }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
  });

  const {
    node,
    style,
    dragHandle,

    color,
    css: cssProp,
    innerHeight,

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    children,

    className,
    ...buttonProps
  } = props;

  const { height } = resolveDesignProps(design);
  const nestedHeight = innerHeight ?? resolveNestedHeight(height);

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot }}>{content}</ItemContent>
  );

  return (
    <Ariakit.Role
      style={style}
      data-selected={node.isSelected ? "true" : undefined}
      data-rounded-start={!node.isSelected || node.isSelectedStart ? "true" : undefined}
      data-rounded-end={!node.isSelected || node.isSelectedEnd ? "true" : undefined}
      className={cx(
        css(
          heightClass.raw({ height }),
          treeItemClass.raw({
            // variant, height
          }),
          inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
          itemContentSizeClass.raw({ height }),
          cssProp,
        ),
        className,
      )}
      {...buttonProps}
    >
      <DesignContext.Define height={nestedHeight} spacing={inProps.spacing}>
        {childrenResolved}
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
