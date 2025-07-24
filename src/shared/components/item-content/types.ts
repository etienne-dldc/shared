export type TItemlContentPaddingResolved = "icon" | "text" | "none";
export type TItemlContentPadding = "auto" | TItemlContentPaddingResolved;

export interface TItemContentFragmentProps {
  startIcon?: React.ReactNode;
  loading?: boolean;
  startSlot?: React.ReactNode;
  endIcon?: React.ReactNode;
  endSlot?: React.ReactNode;

  /**
   * Apply padding to both sides of the content.
   */
  padding?: TItemlContentPadding;

  /**
   * Reduce left padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of startIcon or startSlot and content.
   * You only need need to set this if
   * - You pass a custom content that has a start icon
   * - You pass a startSlot that is not an icon
   */
  startPadding?: TItemlContentPadding;

  /**
   * Reduce right padding so the icon is squarely aligned.
   * By default, this is computed based on the presence of endIcon or endSlot.
   * You only need need to set this if
   * - You pass a custom content that has an end icon
   * - You pass an endSlot that is not an icon
   */
  endPadding?: TItemlContentPadding;

  /**
   * If true, the padding and gap are not applied.
   */
  noLayout?: boolean;
}
