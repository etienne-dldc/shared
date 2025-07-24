import { Fragment } from "react/jsx-runtime";
import { Ellipsis } from "../../../../styled-system/jsx";
import { isNotNil } from "../../utils/nil";
import { TPropsSplitter } from "../../utils/propsSplitters";
import { SideSlot } from "./SideSlot";
import { TItemContentFragmentProps, TItemlContentPaddingResolved } from "./types";

export interface ItemContentFragmentResult {
  fragment: React.ReactNode;
  startPadding: TItemlContentPaddingResolved;
  endPadding: TItemlContentPaddingResolved;
  noLayout: boolean;
}

export function useItemContentFragment(
  props: TItemContentFragmentProps,
  content?: React.ReactNode,
): ItemContentFragmentResult {
  const {
    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    padding = "auto",
    endPadding = padding,
    startPadding = padding,
    noLayout = false,
  } = props;

  const hasStartSlot = Boolean(startSlot || startIcon || loading);
  const hasEndSlot = Boolean(endSlot || endIcon);
  const hasChildren = isNotNil(content);
  // Special case for start icon/slot only
  const iconOnly = (hasStartSlot && !hasChildren && !hasEndSlot) || (hasEndSlot && !hasStartSlot && !hasChildren);

  const defaultStartPadding = iconOnly || noLayout ? "none" : hasStartSlot ? "icon" : "text";
  const startPaddingResolved: TItemlContentPaddingResolved =
    startPadding === "auto" ? defaultStartPadding : startPadding;

  const defaultEndPadding = iconOnly || noLayout ? "none" : hasEndSlot ? "icon" : "text";
  const endPaddingResolved: TItemlContentPaddingResolved = endPadding === "auto" ? defaultEndPadding : endPadding;

  const fragment = (
    <Fragment>
      {hasStartSlot && (
        <SideSlot icon={startIcon} loading={loading} slot={startSlot} isItemMainIcon isIconOnly={iconOnly} />
      )}
      {hasChildren &&
        (typeof content === "string" ? (
          <Ellipsis flex="1" textAlign="left">
            {content}
          </Ellipsis>
        ) : (
          content
        ))}
      {hasEndSlot && <SideSlot icon={endIcon} slot={endSlot} isItemMainIcon={false} isIconOnly={iconOnly} />}
    </Fragment>
  );

  return {
    fragment,
    startPadding: startPaddingResolved,
    endPadding: endPaddingResolved,
    noLayout,
  };
}

const ITEM_CONTENT_PROPS_KEYS = Object.keys({
  startIcon: "startIcon",
  startSlot: "startSlot",
  endIcon: "endIcon",
  endSlot: "endSlot",
  padding: "padding",
  startPadding: "startPadding",
  endPadding: "endPadding",
  loading: "loading",
  noLayout: "noLayout",
} satisfies { [K in keyof Required<TItemContentFragmentProps>]: K });

export const itemContentPropsSplitter: TPropsSplitter<TItemContentFragmentProps> = (props) => {
  const result: Partial<TItemContentFragmentProps> = {};
  ITEM_CONTENT_PROPS_KEYS.forEach((key) => {
    if (key in props) {
      result[key as keyof TItemContentFragmentProps] = props[key as keyof TItemContentFragmentProps];
    }
  });
  return result;
};
