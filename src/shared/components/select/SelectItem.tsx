import * as Ariakit from "@ariakit/react";
// import { buttonRoundedClass, buttonSizeClass } from "../button-legacy/styles";
import { CheckIcon } from "@phosphor-icons/react";
import { css, cx } from "../../../../styled-system/css";
import { crossSizeClass } from "../common/styles";
import { DesignContext, resolveDesignProps } from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { selecteItemClass } from "./styles";
import { TSelectItem } from "./types";

interface SelectItemProps extends Ariakit.SelectItemProps {
  item: TSelectItem<string>;
}

export function SelectItem(inProps: SelectItemProps) {
  const [design, { item, className, ...props }] = DesignContext.useProps(inProps);
  const { crossSize } = resolveDesignProps(design);
  const store = Ariakit.useSelectContext();
  if (!store) {
    throw new Error("SelectItem must be used within a SelectProvider");
  }
  const checked = Ariakit.useStoreState(store, (state) => state.value === item.value);

  return (
    <Ariakit.SelectItem
      {...props}
      className={cx(
        css(crossSizeClass.raw({ crossSize }), selecteItemClass, item.hidden && { display: "none" }),
        className,
      )}
      disabled={item.disabled || item.hidden}
      value={item.value}
    >
      <ItemContent
        endIcon={checked ? <Ariakit.SelectItemCheck render={<CheckIcon />} /> : item.endIcon}
        icon={item.icon}
      >
        {item.content}
      </ItemContent>
    </Ariakit.SelectItem>
  );
}
