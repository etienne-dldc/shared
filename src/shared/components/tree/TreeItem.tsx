import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { NodeApi } from "react-arborist";
import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { colorPaletteClass } from "../common/styles";
import {
  DesignContext,
  dynamicNestedHeight,
  resolveDesignProps,
  resolveNestedHeight,
  TDesignSize,
  TNestedDesignHeight,
  TPaletteColor,
} from "../core/DesignContext";
import { treeItemClass, treeItemStyles } from "./styles";
import { TreeItemContent } from "./TreeItemContent";

export type TreeItemProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    node: NodeApi<any>;
    style: React.CSSProperties;
    dragHandle?: (el: HTMLDivElement | null) => void;
    dragHandleMode?: "none" | "handle" | "row";

    // Design
    height?: TDesignSize;
    spacing?: TDesignSize;

    nestedHeight?: TNestedDesignHeight;
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
    dragHandle,
    dragHandleMode = "row",

    color,
    css: cssProp,
    nestedHeight = dynamicNestedHeight(0.65),

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    children,

    style,
    className,
    ref,
    ...buttonProps
  } = props;

  const { height } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [itemCss, itemInline] = treeItemStyles(height, nestedHeightResolved, inProps.color);

  const childrenResolved = children ?? <TreeItemContent>{content}</TreeItemContent>;

  const finalRef = useMergeRefs(ref, dragHandleMode === "row" ? dragHandle : undefined);

  return (
    <Ariakit.Role
      data-selected={node.isSelected ? "true" : undefined}
      data-rounded-start={!node.isSelected || node.isSelectedStart ? "true" : undefined}
      data-rounded-end={!node.isSelected || node.isSelectedEnd ? "true" : undefined}
      className={cx(
        css(
          itemCss,
          treeItemClass.raw(),
          inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
          // itemContentSizeClass.raw({ height }),
          cssProp,
        ),
        className,
      )}
      style={{ ...style, ...itemInline }}
      ref={finalRef}
      {...buttonProps}
    >
      <DesignContext.Define height={nestedHeightResolved} spacing={inProps.spacing}>
        {childrenResolved}
      </DesignContext.Define>
    </Ariakit.Role>
  );
}
