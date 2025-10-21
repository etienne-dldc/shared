import * as Ariakit from "@ariakit/react";
import { Fragment } from "react";

interface NonEmptyListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderList?: React.ReactElement;
  empty?: React.ReactNode;
  nonEmptyFooter?: React.ReactNode;
}

export const NonEmptyList = function NonEmptyList<T>({
  items,
  renderItem,
  renderList,
  empty,
  nonEmptyFooter,
}: NonEmptyListProps<T>) {
  if (items.length === 0) {
    return <Fragment>{empty}</Fragment>;
  }
  return (
    <Fragment>
      {items.length > 0 && <Ariakit.Role render={renderList}>{items.map(renderItem)}</Ariakit.Role>}
      {nonEmptyFooter}
    </Fragment>
  );
};

NonEmptyList.displayName = "NonEmptyList";
