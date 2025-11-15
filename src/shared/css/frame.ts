import { clsx } from "clsx";
import { TDesignVariant, TPaletteColor } from "../design/types";
import { contentSize, heightStyles, roundedStyles } from "./design";
import { dynamicColor } from "./dynamicColor.css";
import {
  frameBorderSizeClass,
  frameClass,
  frameHighlightClass,
  frameHighlightColorsClass,
  frameInteractiveClass,
  frameInteractiveHoverVariantsClass,
  frameInteractiveVariantsClass,
  frameVariantsClass,
} from "./frame.css";

interface FrameStylesParams {
  height: number;
  contentHeight: number;
  rounded: number;
  variant: TDesignVariant;
  color: TPaletteColor | undefined;
  hoverVariant: TDesignVariant;
  interactive: boolean;
  highlightColor: TPaletteColor;
  highlighted: boolean;
}

export function frameStyles(params: FrameStylesParams): [className: string, styles: React.CSSProperties] {
  const { height, contentHeight, rounded, variant, color, interactive, hoverVariant, highlightColor, highlighted } =
    params;

  const [heightClass, heightInline] = heightStyles(height);
  const [roundedClass, roundedInline] = roundedStyles(rounded);
  const [contentClass, contentInline] = contentSize(contentHeight);

  return [
    clsx(
      heightClass,
      frameClass,
      frameVariantsClass[variant],
      frameBorderSizeClass[variant],
      interactive && frameInteractiveClass,
      interactive && frameInteractiveVariantsClass[variant],
      interactive && frameInteractiveHoverVariantsClass[hoverVariant],
      contentClass,
      roundedClass,
      color && dynamicColor[color],
      highlighted && frameHighlightClass,
      highlighted && frameHighlightColorsClass[highlightColor],
    ),
    {
      ...heightInline,
      ...contentInline,
      ...roundedInline,
    },
  ];
}
