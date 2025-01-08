import { cn, pick, tw } from "../../styles/utils";
import { TDesignRounded, TDesignSize, TDesignVariant } from "../core/DesignContext";

export function buttonSizeClass(size: TDesignSize) {
  return pick(size, {
    xs: tw`text-sm min-h-[28px] min-w-[28px]`,
    sm: tw`text-sm min-h-[32px] min-w-[32px]`,
    md: tw`text-base min-h-[40px] min-w-[40px]`,
    lg: tw`text-lg min-h-[54px] min-w-[54px]`,
  });
}

export function buttonRoundedClass(rounded: TDesignRounded) {
  return pick(rounded, {
    start: tw`rounded-l-md`,
    end: tw`rounded-r-md`,
    none: tw``,
    all: tw`rounded-md`,
  });
}

export interface ButtonStylesParams {
  size: TDesignSize;
  variant: TDesignVariant;
  rounded: TDesignRounded;
  interactive: boolean;
}

export function buttonClassName({ size, variant, rounded, interactive }: ButtonStylesParams) {
  const variantClass = pick(variant, {
    primary: cn(
      tw`bg-dynamic-600 text-white`,
      interactive && tw`hover:bg-dynamic-500 ring-dynamic-500/30`,
      tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50 aria-disabled:ring-dynamic-500/30`,
      interactive && tw`data-focus-visible:ring-dynamic-300 data-focus-visible:ring-2`,
    ),
    secondary: cn(
      tw`bg-white/5 text-dynamic-200`,
      interactive && tw`hover:bg-dynamic-600 hover:text-white ring-dynamic-500/50`,
      tw`aria-disabled:bg-white/5 aria-disabled:text-dynamic-200/50 aria-disabled:ring-dynamic-500/50`,
      interactive && tw`data-focus-visible:ring-dynamic-400/40 data-focus-visible:ring-2`,
    ),
    tertiary: cn(
      tw`bg-transparent text-white`,
      interactive && tw`hover:bg-white/5 hover:text-dynamic-300 ring-dynamic-500/50`,
      tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-dynamic-700/50`,
      interactive &&
        tw`data-focus-visible:ring-dynamic-400/40 data-focus-visible:ring-2 data-focus-visible:bg-white/5 data-focus-visible:text-dynamic-300`,
    ),
    outline: cn(
      tw`bg-transparent text-dynamic-200 ring-dynamic-200 ring-inset ring-0 ring-offset-0`,
      interactive && tw`hover:ring-2 hover:dynamic-200/10`,
      tw`data-focus-visible:ring-2`,
      interactive && tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-white/50`,
    ),
  });

  return cn(
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-none`,
    buttonRoundedClass(rounded),
    buttonSizeClass(size),
    variantClass,
    tw`disabled:cursor-not-allowed data-focus-visible:z-10`,
  );
}

export const BUTTON_ICON_SIZE: Record<TDesignSize, number> = {
  xs: 16,
  sm: 16,
  md: 20,
  lg: 26,
};
