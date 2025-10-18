import React from "react";

/**
 * Forwards FrameGroup-specific data attributes to a child element.
 *
 * This utility is used to preserve FrameGroup attributes (data-first/last/between) when rendering a component around a Frame
 *
 * @param props - The props object containing potential data attributes
 * @param children - The React element to clone with forwarded attributes
 * @returns A cloned React element with data attributes applied, or the original element if no attributes exist
 */
export function forwardFrameGroupAttributes(
  props: Record<string, any>,
  children: React.ReactElement<any>,
): React.ReactElement<any> {
  const dataFirst = props["data-first"];
  const dataLast = props["data-last"];
  const dataBetween = props["data-between"];

  const hasGroupAttrs = dataFirst || dataLast || dataBetween;
  if (!hasGroupAttrs) {
    return children;
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      "data-first": dataFirst,
      "data-last": dataLast,
      "data-between": dataBetween,
    } as any);
  }

  // TODO: handle case when multiple children ?

  return children;
}
