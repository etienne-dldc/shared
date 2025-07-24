import { TItemContentFragmentProps } from "./types";
import { useItemContentFragment } from "./useItemContentFragment";

export function ItemContentFragment(props: TItemContentFragmentProps & { children?: React.ReactNode }) {
  return useItemContentFragment(props, props.children).fragment;
}
