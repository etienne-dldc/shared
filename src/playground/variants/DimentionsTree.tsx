import { memo, useCallback } from "react";
import { MoveHandler, NodeRendererProps, Tree } from "react-arborist";
import { css, cx } from "../../../styled-system/css";
import { ButtonLike } from "../../shared/components/button/ButtonLike";
import { DesignContext } from "../../shared/components/core/DesignContext";
import { TreeItem } from "../../shared/components/tree/TreeItem";
import { TDimention } from "./types";
import { variantStoreHooks } from "./variantStore";

export function DimentionsTree() {
  const dimentions = variantStoreHooks.useDimentions();

  const onMove = useCallback<MoveHandler<TDimention<string>>>(() => {}, []);

  return (
    <DesignContext.Define height="10">
      <Tree
        rowHeight={40}
        data={dimentions}
        onMove={onMove}
        rowClassName={cx(css({ outline: "none" }), "group")}
        childrenAccessor={() => []}
      >
        {DimentionsTreeItem}
      </Tree>
    </DesignContext.Define>
  );
}

export const DimentionsTreeItem = memo(function DimentionsTreeItem({
  node,
  style,
  dragHandle,
  // tree,
  // preview,
}: NodeRendererProps<TDimention<string>>) {
  return (
    <TreeItem
      dragHandle={dragHandle}
      node={node}
      style={style}
      color="blue"
      content={node.data.name}
      endSlot={<ButtonLike content={node.data.type} />}
      dragHandleMode="handle"
    />
  );
});
