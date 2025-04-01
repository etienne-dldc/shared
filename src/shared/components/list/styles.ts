import { cn, pick, tw } from "../../styles/utils";
import { TDesignSize } from "../core/DesignContext";

export function listItemSizeClass(size: TDesignSize) {
  return pick(size, {
    xs: tw`text-sm min-h-7 min-w-7`,
    sm: tw`text-sm min-h-8 min-w-8`,
    md: tw`text-base min-h-10 min-w-10`,
    lg: tw`text-lg min-h-14 min-w-14`,
  });
}

export const LIST_ITEM_ICON_SIZE: Record<TDesignSize, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 26,
};

export interface ListItemStylesParams {
  size: TDesignSize;
  selected: "none" | "secondary" | "primary";
  forceHover: boolean;
  forceActive: boolean;
}

export function listItemClassName({ selected, size }: ListItemStylesParams): string {
  const selectedStateClass = pick(selected, {
    none: cn(tw`data-active-item:bg-white/5 data-active-item:text-dynamic-200`),
    secondary: cn(tw`bg-white/10`, tw`data-active-item:bg-white/5 text-dynamic-200`),
    primary: cn(tw`bg-dynamic-500`, tw`data-active-item:bg-dynamic-600 text-white`),
  });

  return cn(
    tw`rounded-md`,
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-hidden`,
    listItemSizeClass(size),
    selectedStateClass,
  );
}
