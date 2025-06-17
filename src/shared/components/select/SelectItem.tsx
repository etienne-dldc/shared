import * as Ariakit from "@ariakit/react";
import { CheckIcon } from "@phosphor-icons/react";
import { css, cx } from "../../../../styled-system/css";
import { heightStyles } from "../common/styles";
import { DesignContext, resolveDesignProps, resolveNestedHeight, TNestedDesignHeight } from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";
import { selectItemClass } from "./styles";
import { TSelectItem } from "./types";

interface SelectItemProps extends Ariakit.SelectItemProps {
  nestedHeight?: TNestedDesignHeight;
  item: TSelectItem<string>;
}

export function SelectItem(inProps: SelectItemProps) {
  const [design, { item, className, nestedHeight, style, ...props }] = DesignContext.useProps(inProps);

  const { height } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  const [heightCss, heightInline] = heightStyles(height);

  const store = Ariakit.useSelectContext();
  if (!store) {
    throw new Error("SelectItem must be used within a SelectProvider");
  }
  const checked = Ariakit.useStoreState(store, (state) => state.value === item.value);

  return (
    <Ariakit.SelectItem
      {...props}
      className={cx(css(heightCss, selectItemClass, item.hidden && { display: "none" }), className)}
      style={{ ...style, ...heightInline }}
      disabled={item.disabled || item.hidden}
      value={item.value}
    >
      <DesignContext.Define height={nestedHeightResolved}>
        <ItemContent
          endIcon={checked ? <Ariakit.SelectItemCheck render={<CheckIcon children={null} />} /> : item.endIcon}
          startIcon={item.icon}
        >
          {item.content}
        </ItemContent>
      </DesignContext.Define>
    </Ariakit.SelectItem>
  );
}
