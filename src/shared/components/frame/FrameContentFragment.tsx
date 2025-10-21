/* eslint-disable react-refresh/only-export-components */
import { Fragment } from "react/jsx-runtime";
import { Ellipsis } from "../../../../styled-system/jsx";
import { TPropsSplitter } from "../../utils/propsSplitters";
import { FrameSideSlot } from "./FrameSideSlot";

export type TFrameContentPaddingResolved = "icon" | "text" | "none";
export type TFrameContentPadding = "auto" | TFrameContentPaddingResolved;

export interface TFrameContentFragmentProps {
  startIcon?: React.ReactNode;
  loading?: boolean;
  startSlot?: React.ReactNode;
  endIcon?: React.ReactNode;
  endSlot?: React.ReactNode;

  /**
   * Apply padding to both sides of the content.
   */
  padding?: TFrameContentPadding;

  /**
   * Reduce left padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of startIcon or startSlot and content.
   * You only need need to set this if
   * - You pass a custom content that has a start icon
   * - You pass a startSlot that is not an icon
   */
  startPadding?: TFrameContentPadding;

  /**
   * Reduce right padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of endIcon or endSlot.
   * You only need need to set this if
   * - You pass a custom content that has an end icon
   * - You pass an endSlot that is not an icon
   */
  endPadding?: TFrameContentPadding;

  /**
   * If true, the padding and gap are not applied.
   */
  noLayout?: boolean;
}

export interface TFrameContentFragmentResult {
  fragment: React.ReactNode;
  startPadding: TFrameContentPaddingResolved;
  endPadding: TFrameContentPaddingResolved;
  noLayout: boolean;
}

export function useFrameContentFragment(
  props: TFrameContentFragmentProps,
  content?: React.ReactNode,
): TFrameContentFragmentResult {
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
  const hasChildren = Boolean(content);
  // Special case for start icon/slot only
  const iconOnly = (hasStartSlot && !hasChildren && !hasEndSlot) || (hasEndSlot && !hasStartSlot && !hasChildren);
  const isEmpty = !hasStartSlot && !hasChildren && !hasEndSlot;

  const defaultStartPadding = noLayout ? "none" : isEmpty ? "icon" : iconOnly ? "icon" : hasStartSlot ? "icon" : "text";
  const startPaddingResolved: TFrameContentPaddingResolved =
    startPadding === "auto" ? defaultStartPadding : startPadding;

  const defaultEndPadding = noLayout ? "none" : isEmpty ? "icon" : iconOnly ? "icon" : hasEndSlot ? "icon" : "text";
  const endPaddingResolved: TFrameContentPaddingResolved = endPadding === "auto" ? defaultEndPadding : endPadding;

  const fragment = (
    <Fragment>
      {hasStartSlot && (
        <FrameSideSlot icon={startIcon} loading={loading} slot={startSlot} isItemMainIcon isIconOnly={iconOnly} />
      )}
      {hasChildren &&
        (typeof content === "string" ? <Ellipsis css={{ flex: "1", textAlign: "left" }}>{content}</Ellipsis> : content)}
      {hasEndSlot && (
        <FrameSideSlot
          icon={endIcon}
          slot={endSlot}
          isItemMainIcon={false}
          isIconOnly={iconOnly}
          css={{ ml: "auto" }}
        />
      )}
    </Fragment>
  );

  return {
    fragment,
    startPadding: startPaddingResolved,
    endPadding: endPaddingResolved,
    noLayout,
  };
}

const FRAME_CONTENT_PROPS_KEYS = Object.keys({
  startIcon: "startIcon",
  startSlot: "startSlot",
  endIcon: "endIcon",
  endSlot: "endSlot",
  padding: "padding",
  startPadding: "startPadding",
  endPadding: "endPadding",
  loading: "loading",
  noLayout: "noLayout",
} satisfies { [K in keyof Required<TFrameContentFragmentProps>]: K });

export const frameContentPropsSplitter: TPropsSplitter<TFrameContentFragmentProps> = (props) => {
  const result: Partial<TFrameContentFragmentProps> = {};
  FRAME_CONTENT_PROPS_KEYS.forEach((key) => {
    if (key in props) {
      result[key as keyof TFrameContentFragmentProps] = props[key as keyof TFrameContentFragmentProps];
    }
  });
  return result;
};

export function FrameContentFragment(props: TFrameContentFragmentProps & { children?: React.ReactNode }) {
  return useFrameContentFragment(props, props.children).fragment;
}

FrameContentFragment.displayName = "FrameContentFragment";
