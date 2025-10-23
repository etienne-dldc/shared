import * as Ariakit from "@ariakit/react";
import { CheckIcon } from "@phosphor-icons/react";
import { css, cx } from "../../../../styled-system/css";
import { frameContentStyles } from "../../design/frameContent";
import { selectItemClass } from "../../design/select";
import { heightStyles } from "../../design/styles";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { useFrameContentFragment } from "../frame/FrameContentFragment";
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

  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(
    {
      endIcon: checked ? <Ariakit.SelectItemCheck render={<CheckIcon children={null} />} /> : item.endIcon,
      startIcon: item.icon,
    },
    item.content,
  );

  const { height, contentHeight, spacing } = useContainerDesignProps(localDesign, "subtle");
  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  return (
    <Ariakit.SelectItem
      {...htmlProps}
      className={cx(css(heightCss, selectItemClass, contentCss, item.hidden && { display: "none" }), className)}
      style={{ ...style, ...heightInline, ...contentInline }}
      disabled={item.disabled || item.hidden}
      value={item.value}
    >
      <DefaultDesignProvider {...localDesign}>{fragment}</DefaultDesignProvider>
    </Ariakit.SelectItem>
  );
}

SelectItem.displayName = "SelectItem";
