import { CompositeStoreItem } from "@ariakit/core/composite/composite-store";
import * as Ariakit from "@ariakit/react";

export function focusActiveOrFirst(compositeStore: Ariakit.CompositeStore<CompositeStoreItem>) {
  const item = findActiveOrFirst(compositeStore);
  if (item) {
    item.element?.focus();
  }
}

function findActiveOrFirst(compositeStore: Ariakit.CompositeStore<CompositeStoreItem>): CompositeStoreItem | undefined {
  const { activeId, items } = compositeStore.getState();
  const activeItem = items.find((item) => item.id === activeId);
  if (activeItem) {
    return activeItem;
  }
  return items.length > 0 ? items[0] : undefined;
}
