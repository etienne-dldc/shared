import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { NodeApi } from "react-arborist";
import { css, cx } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass } from "../../design/styles";
import { TDesignHeight, TDesignSpacing, TPaletteColor } from "../../design/types";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
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
    height?: TDesignHeight;
    heightRatio?: number;
    spacing?: TDesignSpacing;

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
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const {
    node,
    dragHandle,
    dragHandleMode = "row",

    color,
    css: cssProps,

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

  const { height, contentHeight } = useContainerDesignProps(
    {
      // heightRatio: 0.8,
      ...localDesign,
    },
    "subtle",
  );
  const [itemCss, itemInline] = treeItemStyles(height, contentHeight, color);

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
          cssProps,
        ),
        className,
      )}
      style={{ ...style, ...itemInline }}
      ref={finalRef}
      {...buttonProps}
    >
      <DefaultDesignProvider height={contentHeight} spacing={inProps.spacing}>
        {childrenResolved}
      </DefaultDesignProvider>
    </Ariakit.Role>
  );
}

TreeItem.displayName = "TreeItem";
