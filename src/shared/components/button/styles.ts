import { cn, tw } from "../../styles/utils";
import { pick, pickBoolStrict } from "../../utils/pick";
import { TDesignContextProps, TDesignRounded, TDesignSize, resolveDesignProps } from "../core/DesignContext";

export function buttonSizeClass(size: TDesignSize, xSize: TDesignSize, ySize: TDesignSize) {
  return cn(
    pick(size, {
      xs: tw`text-sm`,
      sm: tw`text-sm`,
      md: tw`text-base`,
      lg: tw`text-lg`,
    }),
    pick(xSize, {
      xs: tw`min-w-7`,
      sm: tw`min-w-8`,
      md: tw`min-w-10`,
      lg: tw`min-w-14`,
    }),
    pick(ySize, {
      xs: tw`min-h-7`,
      sm: tw`min-h-8`,
      md: tw`min-h-10`,
      lg: tw`min-h-14`,
    }),
  );
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
  design: TDesignContextProps;
  interactive: boolean;
  forceHover: boolean;
  forceActive: boolean;
}

export function buttonClassName({ design, interactive, forceHover, forceActive }: ButtonStylesParams) {
  const { filled, hoverFilled, primary, rounded, size, xSize, ySize } = resolveDesignProps(design);
  const filledStr = pickBoolStrict(filled, "filled", "transparent");
  const primaryStr = pickBoolStrict(primary, "primary", "base");
  const filled_primary = `${filledStr}_${primaryStr}` as const;

  const variantClassBase = pick(filled_primary, {
    filled_base: cn(tw`bg-white/5 text-dynamic-200`),
    filled_primary: cn(tw`bg-dynamic-600 text-white`),
    transparent_base: cn(tw`bg-transparent text-white`),
    transparent_primary: cn(tw`bg-transparent text-dynamic-300`),
  });

  const activeClass = cn(tw`active:bg-dynamic-700 active:text-white`, forceActive && tw`bg-dynamic-700 text-white`);

  const variantClassInteractive = pick(filled_primary, {
    filled_base: cn(
      tw`text-white`,

      tw`aria-disabled:bg-white/5 aria-disabled:text-dynamic-200/50 aria-disabled:ring-dynamic-500/50`,
    ),
    filled_primary: cn(tw`aria-disabled:bg-dynamic-700 aria-disabled:text-white/50 aria-disabled:ring-dynamic-500/30`),
    transparent_base: cn(tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-dynamic-700/50`),
    transparent_primary: cn(tw`aria-disabled:text-dynamic-200/40 aria-disabled:ring-dynamic-700/50`),
  });

  /**
   * Focus visible style is:
   * - hover style + ring of hover bg color + inset ring for contrast
   * Active item style (when in a list) is:
   * - Only hover style (we need to undo the active style)
   */

  const hoverClassInteractive = pickBoolStrict(
    hoverFilled,
    cn(
      tw`hover:bg-dynamic-500 hover:text-white`,
      forceHover && tw`bg-dynamic-500 text-white`,

      tw`data-focus-visible:bg-dynamic-500 data-focus-visible:text-white`,
      tw`data-focus-visible:ring-dynamic-500 data-focus-visible:ring-2`,
      tw`data-focus-visible:inset-ring-dynamic-200 data-focus-visible:inset-ring-1`,

      tw`data-focus-visible:active:bg-dynamic-700`,

      tw`data-focus-visible:data-active-item:ring-0 data-focus-visible:data-active-item:inset-ring-0`,
    ),
    cn(
      tw`hover:bg-white/5 hover:text-dynamic-300`,
      forceHover && tw`bg-white/5 text-dynamic-300`,

      tw`data-focus-visible:bg-white/5 data-focus-visible:text-dynamic-300`,
      tw`data-focus-visible:inset-ring-dynamic-300 data-focus-visible:inset-ring-1`,

      tw`data-focus-visible:active:bg-dynamic-700 data-focus-visible:active:text-white`,

      tw`data-focus-visible:data-active-item:ring-0 data-focus-visible:data-active-item:inset-ring-0`,
    ),
  );

  return cn(
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-hidden`,
    buttonRoundedClass(rounded),
    buttonSizeClass(size, xSize, ySize),
    variantClassBase,
    interactive && variantClassInteractive,
    interactive && hoverClassInteractive,
    interactive && activeClass,
    tw`disabled:cursor-not-allowed data-focus-visible:z-10`,
  );
}

export const BUTTON_ICON_SIZE: Record<TDesignSize, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 26,
};
