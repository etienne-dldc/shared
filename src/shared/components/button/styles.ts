import { cn, pick, tw } from "../../styles/utils";
import { DesignContextProps as TDesignContextProps, TDesignPriority, TDesignRounded, TDesignSize, TDesignVariant } from "../core/DesignContext";

export function buttonSizeClass(size: TDesignSize) {
  return pick(size, {
    xs: tw`text-sm min-h-7 min-w-7`,
    sm: tw`text-sm min-h-8 min-w-8`,
    md: tw`text-base min-h-10 min-w-10`,
    lg: tw`text-lg min-h-14 min-w-14`,
  });
}

export function buttonRoundedClass(rounded: TDesignRounded) {
  return pick(rounded, {
    left: tw`rounded-l-md`,
    right: tw`rounded-r-md`,
    top: tw`rounded-t-md`,
    bottom: tw`rounded-b-md`,
    none: tw``,
    all: tw`rounded-md`,
  });
}

export interface ButtonStylesParams {
  size: TDesignSize;
  priority: TDesignPriority;
  variant: TDesignVariant;
  rounded: TDesignRounded;
  interactive: boolean;
  forceHover: boolean;
  forceActive: boolean;
}

export function buttonClassName({
  size,
  rounded,
  interactive,
  forceHover,
  forceActive,
  variant,
  priority,
}: ButtonStylesParams) {
  const variant_priority = `${variant}_${priority}` as const;

  const variantClassBase = pick(variant_priority, {
    filled_base: cn(tw`bg-white/5 text-dynamic-200`),
    filled_primary: cn(tw`bg-dynamic-600 text-white`),
    transparent_base: cn(tw`bg-transparent text-white`),
    transparent_primary: cn(tw`bg-transparent text-dynamic-300`),
  });

  const variantClassInteractive = pick(variant_priority, {
    filled_base: cn(
      tw`hover:bg-dynamic-600 hover:text-white`,
      forceHover && tw`bg-dynamic-600 text-white`,
      tw`active:bg-dynamic-700 active:text-white`,
      forceActive && tw`bg-dynamic-700 text-white`,
      tw`data-focus-visible:ring-dynamic-400 data-focus-visible:ring-2`,
      tw`aria-disabled:bg-white/5 aria-disabled:text-dynamic-200/50 aria-disabled:ring-dynamic-500/50`,
    ),
    filled_primary: cn(
      tw`hover:bg-dynamic-500`,
      forceHover && tw`bg-dynamic-500`,
      tw`active:bg-dynamic-700`,
      forceActive && tw`bg-dynamic-700`,
      tw`data-focus-visible:ring-dynamic-100 data-focus-visible:ring-2`,
      tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50 aria-disabled:ring-dynamic-500/30`,
    ),
    transparent_base: cn(
      tw`hover:bg-white/5 hover:text-dynamic-300`,
      forceHover && tw`bg-white/5 text-dynamic-300`,
      tw`active:bg-dynamic-700 active:text-white`,
      forceActive && tw`bg-dynamic-700 text-white`,
      tw`data-focus-visible:ring-dynamic-400 data-focus-visible:ring-2`,
      // Focus style is same as hover
      tw`data-focus-visible:bg-white/5 data-focus-visible:text-dynamic-300`,
      // We need to also apply active style
      tw`data-focus-visible:active:bg-dynamic-700 data-focus-visible:active:text-white`,
      tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-dynamic-700/50`,
    ),
    transparent_primary: cn(
      tw`hover:bg-white/5 hover:text-dynamic-300`,
      forceHover && tw`bg-white/5 text-dynamic-300`,
      tw`active:bg-dynamic-700 active:text-white`,
      forceActive && tw`bg-dynamic-700 text-white`,
      tw`data-focus-visible:ring-dynamic-400 data-focus-visible:ring-2`,
      // Focus style is same as hover
      tw`data-focus-visible:bg-white/5 data-focus-visible:text-dynamic-300`,
      // We need to also apply active style
      tw`data-focus-visible:active:bg-dynamic-700 data-focus-visible:active:text-white`,
      tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-dynamic-700/50`,
    ),
  });

  return cn(
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-hidden`,
    buttonRoundedClass(rounded),
    buttonSizeClass(size),
    variantClassBase,
    interactive && variantClassInteractive,
    tw`disabled:cursor-not-allowed data-focus-visible:z-10`,
  );
}

export const BUTTON_ICON_SIZE: Record<TDesignSize, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 26,
};

export function mapPrimaryFilledProps<T extends { primary?: boolean; filled?: boolean }>(props: T): Omit<T, "primary" | "filled"> & Partial<TDesignContextProps> {
  const { primary, filled, ...rest } = props;
  return {
    priority: mapBool(primary, "primary", "base"),
    variant: mapBool(filled, "filled", "transparent"),
    ...rest,
  };
}

function mapBool<Out>(value: boolean | undefined, trueVal: Out, falseVal: Out): Out | undefined {
  return value === true ? trueVal : value === false ? falseVal : undefined;
}
