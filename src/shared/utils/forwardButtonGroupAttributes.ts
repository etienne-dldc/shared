import React from "react";

export function forwardButtonGroupAttributes(
  props: Record<string, any>,
  children: React.ReactElement<any>,
): React.ReactElement<any> {
  const dataFirst = props["data-first"];
  const dataLast = props["data-last"];
  const dataBetween = props["data-between"];
  if ((dataFirst || dataLast || dataBetween) && React.isValidElement(children)) {
    return React.cloneElement(children, {
      "data-first": dataFirst,
      "data-last": dataLast,
      "data-between": dataBetween,
    } as any);
  }

  return children;
}
