import { clsx } from "clsx";
import { dynamicColor } from "./dynamicColor.css";
import { frameBorderSizeClass } from "./frame.css";
import {
  frameGroupClass,
  frameGroupDirectionClass,
  frameGroupSeparatorClass,
  frameGroupSeparatorDirectionClass,
  frameGroupSeparatorVariantClass,
  frameGroupVariantsClass,
} from "./frameGroup.css";
import { TDesignVariant, TPaletteColor } from "./types";

export interface FrameGroupStylesParams {
  direction: "horizontal" | "vertical";
  color: TPaletteColor | undefined;
  variant: TDesignVariant;
}

export function frameGroupStyles(params: FrameGroupStylesParams): [className: string, styles: React.CSSProperties] {
  const { direction, color, variant } = params;

  return [
    clsx(
      frameGroupClass,
      frameGroupDirectionClass[direction],
      frameBorderSizeClass[variant],
      frameGroupVariantsClass[variant],
      color && dynamicColor[color],
    ),
    {},
  ];
}

export interface FrameGroupSeparatorStylesParams {
  direction: "horizontal" | "vertical";
  variant: TDesignVariant;
}

export function frameGroupSeparatorStyles(
  params: FrameGroupSeparatorStylesParams,
): [className: string, styles: React.CSSProperties] {
  const { direction, variant } = params;

  return [
    clsx(
      frameGroupSeparatorClass,
      frameGroupSeparatorDirectionClass[direction],
      frameGroupSeparatorVariantClass[variant],
    ),
    {},
  ];
}
