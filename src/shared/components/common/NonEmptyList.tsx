import { Fragment } from "react";

interface NonEmptyListProps<T> {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  empty?: React.ReactNode;
  nonEmptyFooter?: React.ReactNode;
}

export const NonEmptyList = function NonEmptyList<T>({ items, render, empty, nonEmptyFooter }: NonEmptyListProps<T>) {
  if (items.length === 0) {
    return <Fragment>{empty}</Fragment>;
  }
  return (
    <Fragment>
      {items.map(render)}
      {nonEmptyFooter}
    </Fragment>
  );
};
