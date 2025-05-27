import { cn, tw } from "../../styles/utils";
import { pick, pickBoolStrict } from "../../utils/pick";
import {
  TDesignContextProps,
  TDesignFilled,
  TDesignPrimary,
  TDesignRounded,
  TDesignSize,
  resolveDesignProps,
} from "../core/DesignContext";

export const BUTTON_Y_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`min-h-7`, // 28px
  sm: tw`min-h-8`, // 32px
  md: tw`min-h-10`, // 40px
  lg: tw`min-h-14`, // 56px
  // Inner size are equal to height - yPadding
  smInner: tw`min-h-5`, // 20px
  mdInner: tw`min-h-7`, // 28px
  lgInner: tw`min-h-8.5`, // 34px
};

export const ICON_Y_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`py-0.5`, // 2px
  sm: tw`py-0.5`, // 2px
  md: tw`py-1`, // 4px
  lg: tw`py-1`, // 4px
  // Inner don't have icon padding
  smInner: "",
  mdInner: "",
  lgInner: "",
};

export const BUTTON_ICON_SIZE: Record<TDesignSize, number> = {
  xs: 16,
  sm: 16,
  md: 20,
  lg: 26,
  // Inner icon sizes are same as outer
  smInner: 16,
  mdInner: 20,
  lgInner: 26,
};

export const BUTTON_CONTENT_Y_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`py-1`, // 4px
  sm: tw`py-1.5`, // 6px
  md: tw`py-1.5`, // 6px
  lg: tw`py-2.5`, // 10px
  // Inner padding is same as icon padding
  smInner: tw`py-0.5`, // 2px
  mdInner: tw`py-1`, // 4px
  lgInner: tw`py-1`, // 4px
};

// -- X

export const BUTTON_X_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`min-w-7`, // 28px
  sm: tw`min-w-8`, // 32px
  md: tw`min-w-10`, // 40px
  lg: tw`min-w-14`, // 56px
  // Inner size are equal to width - xPadding
  smInner: tw`min-w-5`, // 20px
  mdInner: tw`min-w-7`, // 28px
  lgInner: tw`min-w-8.5`, // 34px
};

export const ICON_X_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`px-0.5`,
  sm: tw`px-0.5 `,
  md: tw`px-1`,
  lg: tw`px-1`,
  // Inner don't have icon padding
  smInner: "",
  mdInner: "",
  lgInner: "",
};

export const BUTTON_CONTENT_X_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`px-1`,
  sm: tw`px-1.5`,
  md: tw`px-1.5`,
  lg: tw`px-2.5`,
  // Inner padding is same as icon padding
  smInner: tw`px-0.5`, // 2px
  mdInner: tw`px-1`, // 4px
  lgInner: tw`px-1`, // 4px
};

export const BUTTON_TEXT_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`text-sm`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
  // Inner text sizes are same as outer
  smInner: tw`text-sm`,
  mdInner: tw`text-base`,
  lgInner: tw`text-lg`,
};

export const INNER_SIZE_MAPPING: Record<TDesignSize, TDesignSize> = {
  xs: "smInner",
  sm: "smInner",
  md: "mdInner",
  lg: "lgInner",
  smInner: "smInner",
  mdInner: "mdInner",
  lgInner: "lgInner",
};

export const BUTTON_CONTENT_TEXT_LEFT_SPACE: Record<TDesignSize, string> = {
  xs: tw`pl-1`,
  sm: tw`pl-1`,
  md: tw`pl-1.5`,
  lg: tw`pl-2`,
  // Inner == Outer
  smInner: tw`pl-1`,
  mdInner: tw`pl-1.5`,
  lgInner: tw`pl-2`,
};

export const BUTTON_CONTENT_TEXT_LEFT_SPACE_NO_ICON: Record<TDesignSize, string> = {
  xs: tw`pl-1.5`,
  sm: tw`pl-1.5`,
  md: tw`pl-2`,
  lg: tw`pl-2.5`,
  // Inner == Outer
  smInner: tw`pl-1.5`,
  mdInner: tw`pl-2`,
  lgInner: tw`pl-2.5`,
};

export const BUTTON_CONTENT_TEXT_RIGHT_SPACE: Record<TDesignSize, string> = {
  xs: tw`pr-1`,
  sm: tw`pr-1`,
  md: tw`pr-1.5`,
  lg: tw`pr-2`,
  // Inner == Outer
  smInner: tw`pr-1`,
  mdInner: tw`pr-1.5`,
  lgInner: tw`pr-2`,
};

export const BUTTON_CONTENT_TEXT_RIGHT_SPACE_NO_ICON: Record<TDesignSize, string> = {
  xs: tw`pr-1.5`,
  sm: tw`pr-1.5`,
  md: tw`pr-2`,
  lg: tw`pr-2.5`,
  // Inner == Outer
  smInner: tw`pr-1.5`,
  mdInner: tw`pr-2`,
  lgInner: tw`pr-2.5`,
};

export const BUTTON_CONTENT_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw`flex-row gap-1`,
  sm: tw`flex-row gap-2`,
  md: tw`flex-col -my-1.5`,
  lg: tw`flex-col -my-2.5`,
  // Inner == Outer
  smInner: tw`flex-row gap-1`,
  mdInner: tw`flex-col -my-1.5`,
  lgInner: tw`flex-col -my-2.5`,
};

export const BUTTON_CONTENT_DETAIL_SIZE_CLASS: Record<TDesignSize, string> = {
  xs: tw``,
  sm: tw``,
  md: tw`text-xs -mt-1 mb-0.5`,
  lg: tw`text-base -mt-1`,
  // Inner == Outer
  smInner: tw``,
  mdInner: tw`text-xs -mt-1 mb-0.5`,
  lgInner: tw`text-base -mt-1`,
};

export const BUTTON_CONTENT_INNER_LEFT_PADDING_CLASS: Record<TDesignSize, string> = {
  // Same as Icon xPadding
  xs: tw`pl-0.5`,
  sm: tw`pl-0.5 `,
  md: tw`pl-1`,
  lg: tw`pl-1`,
  // Inner == Outer
  smInner: tw``,
  mdInner: tw``,
  lgInner: tw``,
};

export const BUTTON_ROUNDED_BASE_CLASS: Record<TDesignRounded, string> = {
  left: tw`rounded-l-md`,
  right: tw`rounded-r-md`,
  top: tw`rounded-t-md`,
  bottom: tw`rounded-b-md`,
  none: tw``,
  all: tw`rounded-md`,
};

export const BUTTON_ROUNDED_INNER_CLASS: Record<TDesignRounded, string> = {
  left: tw`rounded-l-sm`,
  right: tw`rounded-r-sm`,
  top: tw`rounded-t-sm`,
  bottom: tw`rounded-b-sm`,
  none: tw``,
  all: tw`rounded-sm`,
};

export function buttonSizeClass(size: TDesignSize, xSize: TDesignSize, ySize: TDesignSize) {
  return cn(pick(size, BUTTON_TEXT_SIZE_CLASS), pick(xSize, BUTTON_X_SIZE_CLASS), pick(ySize, BUTTON_Y_SIZE_CLASS));
}

export function buttonRoundedClass(rounded: TDesignRounded, size: TDesignSize) {
  const isInner = pick(size, {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    smInner: true,
    mdInner: true,
    lgInner: true,
  });

  return pick(rounded, isInner ? BUTTON_ROUNDED_INNER_CLASS : BUTTON_ROUNDED_BASE_CLASS);
}

export interface ButtonStylesParams {
  design: TDesignContextProps;
  interactive: boolean;
  forceHover: boolean;
  forceActive: boolean;
}

export function innerPrimaryFilled(
  primary: TDesignPrimary,
  filled: TDesignFilled,
): {
  primary: TDesignPrimary;
  filled: TDesignFilled;
} {
  const filledStr = pickBoolStrict(filled, "filled", "transparent");
  const primaryStr = pickBoolStrict(primary, "primary", "base");
  const filled_primary = `${filledStr}_${primaryStr}` as const;

  return pick(filled_primary, {
    filled_primary: { primary: true, filled: true },
    filled_base: { primary: false, filled: true },
    transparent_primary: { primary: false, filled: true },
    transparent_base: { primary: false, filled: true },
  });
}

export function buttonClassName({ design, interactive, forceHover, forceActive }: ButtonStylesParams) {
  const { filled, hoverFilled, primary, rounded, size, xSize, ySize } = resolveDesignProps(design);
  const filledStr = pickBoolStrict(filled, "filled", "transparent");
  const primaryStr = pickBoolStrict(primary, "primary", "base");
  const filled_primary = `${filledStr}_${primaryStr}` as const;

  const variantClassBase = pick(filled_primary, {
    filled_primary: cn(tw`bg-dynamic-600 text-white`),
    filled_base: cn(tw`bg-white/5 text-dynamic-200`),
    transparent_primary: cn(tw`bg-transparent text-dynamic-300`),
    transparent_base: cn(tw`bg-transparent text-white`),
  });

  const activeClass = cn(
    tw`active:bg-dynamic-700 active:text-white`,
    forceActive && tw`bg-dynamic-700 text-white`,
    tw`data-focus-visible:active:bg-dynamic-700 data-focus-visible:active:text-white`,
    forceActive && tw`data-focus-visible:bg-dynamic-700 data-focus-visible:text-white`,
    tw`aria-disabled:active:bg-dynamic-700 aria-disabled:active:text-white/50`,
    forceActive && tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50`,
  );

  const disabledClass = pick(filled_primary, {
    filled_primary: cn(tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50`),
    filled_base: cn(tw`aria-disabled:bg-white/5 aria-disabled:text-dynamic-200/50`),
    transparent_primary: cn(tw`aria-disabled:text-dynamic-200/40`),
    transparent_base: cn(tw`aria-disabled:text-white/40`),
  });

  const hoverFilledBaseClass = pickBoolStrict(
    hoverFilled,
    cn(
      tw`hover:bg-dynamic-500 hover:text-white`,
      forceHover && tw`bg-dynamic-500 text-white`,

      // Disabled hover style
      tw`aria-disabled:hover:bg-dynamic-700 aria-disabled:hover:text-white/50`,
      forceHover && tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50`,
    ),
    cn(
      tw`hover:bg-white/5 hover:text-dynamic-200`,
      forceHover && tw`bg-white/5 text-dynamic-200`,

      // Disabled hover style
      tw`aria-disabled:hover:bg-white/5 aria-disabled:hover:text-dynamic-200/50`,
      forceHover && tw`aria-disabled:bg-white/5 aria-disabled:text-dynamic-200/50`,
    ),
  );

  const hoverFilledFocusClass = pickBoolStrict(
    hoverFilled,
    cn(
      // Focused style
      tw`data-focus-visible:bg-dynamic-600 data-focus-visible:text-white`,
      tw`data-focus-visible:inset-ring-white data-focus-visible:inset-ring-1`,
      tw`data-focus-visible:ring-white data-focus-visible:ring-1`,
      // Copy disabled hover style
      tw`aria-disabled:data-focus-visible:bg-dynamic-700 aria-disabled:data-focus-visible:text-white/50`,
      forceHover && tw`aria-disabled:data-focus-visible:bg-dynamic-700 aria-disabled:data-focus-visible:text-white/50`,
    ),
    cn(
      // Focused style
      tw`data-focus-visible:bg-white/5 data-focus-visible:text-dynamic-200`,
      tw`data-focus-visible:inset-ring-dynamic-200 data-focus-visible:inset-ring-1`,
      tw`data-focus-visible:ring-dynamic-200 data-focus-visible:ring-1`,
      // Copy disabled hover style
      tw`aria-disabled:data-focus-visible:bg-white/5 aria-disabled:data-focus-visible:text-dynamic-200/50`,
      forceHover &&
        tw`aria-disabled:data-focus-visible:bg-white/5 aria-disabled:data-focus-visible:text-dynamic-200/50`,
    ),
  );

  return cn(
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-hidden`,
    buttonRoundedClass(rounded, size),
    buttonSizeClass(size, xSize, ySize),
    variantClassBase,
    interactive && disabledClass,
    interactive && hoverFilledBaseClass,
    interactive && hoverFilledFocusClass,
    interactive && activeClass,
    tw`disabled:cursor-not-allowed data-focus-visible:z-10`,
  );
}
