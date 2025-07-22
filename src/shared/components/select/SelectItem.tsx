import * as Ariakit from "@ariakit/react";
import { CheckIcon } from "@phosphor-icons/react";
import { css, cx } from "../../../../styled-system/css";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { heightStyles } from "../common/styles";
import { DefaultDesignContext, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { itemlContentStyles } from "../item-content/styles";
import { useItemContentFragment } from "../item-content/useItemContentFragment";
import { selectItemClass } from "./styles";
import { TSelectItem } from "./types";

interface SelectItemProps extends Ariakit.SelectItemProps {
  item: TSelectItem<string>;
}

export function SelectItem(inProps: SelectItemProps) {
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const { item, className, style, ...htmlProps } = props;

  const store = Ariakit.useSelectContext();
  if (!store) {
    throw new Error("SelectItem must be used within a SelectProvider");
  }
  const checked = Ariakit.useStoreState(store, (state) => state.value === item.value);

  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(
    {
      endIcon: checked ? <Ariakit.SelectItemCheck render={<CheckIcon children={null} />} /> : item.endIcon,
      startIcon: item.icon,
    },
    item.content,
  );

  const { height, contentHeight, spacing } = useContainerDesignProps(localDesign);
  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <Ariakit.SelectItem
      {...htmlProps}
      className={cx(css(heightCss, selectItemClass, contentCss, item.hidden && { display: "none" }), className)}
      style={{ ...style, ...heightInline, ...contentInline }}
      disabled={item.disabled || item.hidden}
      value={item.value}
    >
      <DefaultDesignContext.Define {...localDesign}>{fragment}</DefaultDesignContext.Define>
    </Ariakit.SelectItem>
  );
}
