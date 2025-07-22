import { clamp } from "../utils/math";
import {
  TDefaultDesignContext,
  TDesignContextResolved,
  TDesignSize,
  THeightRatio,
  TParentDesignContext,
} from "./types";

export const BASE_HEIGHT = 7;
export const BASE_HEIGHT_RATIO = 0.68;

// small: {
//   rounded: "0x",
// },
// medium: {
//   rounded: "1_x",
// },
// large: {
//   rounded: "2",
// },

export const ROUNDED = {
  small: parseSize("0x"),
  base: parseSize("1_x"),
  medium: parseSize("1"),
};

export function resolveSmallRounded(height: number): boolean {
  return height <= 4;
}

export function powerValue(value: number, power: number): number {
  const powerClamped = clamp(power, 0, 1);
  return Math.pow(value + 1, powerClamped) - 1;
}

export function powerSize(size: number, power: number = 0.68): number {
  if (size < 2.5) {
    return size;
  }
  const val = powerValue(size, power);
  return roundToSize(val);
}

export function roundToSize(value: number): number {
  const valRounded = Math.round(value * 2) / 2;
  return clamp(valRounded, 0, Infinity);
}

export function clampHeightRatio(value: number): number {
  return clamp(value, 0.1, 1);
}

export function parseSize(size: string | number): number {
  if (typeof size === "number") {
    return size;
  }
  const base = parseInt(size, 10);
  if (size.endsWith("_x")) {
    return base + 1 / 4;
  }
  if (size.endsWith("xx")) {
    return base + 3 / 4;
  }
  if (size.endsWith("x")) {
    return base + 2 / 4;
  }
  return base;
}

export function parseMaybeSize(size: string | number | null | undefined): number | null {
  if (size === null || size === undefined) {
    return null;
  }
  return parseSize(size);
}

export function sizeToRem(size: string | number): number {
  const parsedSize = typeof size === "number" ? size : parseSize(size);
  return (parsedSize * 4) / 16;
}

export function sizeToRemString(size: string | number): string {
  return `${sizeToRem(size)}rem`;
}

export function sizeToFontSize(size: string | number) {
  const lineHeightRem = sizeToRem(size);
  const fontSizeRem = lineHeightRem - 0.56 * Math.exp(-Math.pow(1.76 - lineHeightRem, 2) / Math.pow(0.8, 2));
  const fontSizeRemRounded = Math.round(fontSizeRem * 16) / 16; // Round to 2px
  return `${fontSizeRemRounded}rem`;
}

export function spacingToGapRem(spacing: TDesignSize): string {
  const size = sizeToRem(spacing);
  const nested = sizeToRem(powerSize(size));
  const gap = (size - nested) / 2;
  const value = clamp(gap, 0, Infinity);
  return `${value}rem`;
}

export function resolveContainerDesignProps(
  sizeCtx: TParentDesignContext | null,
  defaultDesignCtx: TDefaultDesignContext,
  localProps: Partial<TDefaultDesignContext>,
): TDesignContextResolved {
  const variant = localProps.variant ?? defaultDesignCtx.variant;
  const hoverVariant = localProps.hoverVariant ?? defaultDesignCtx.hoverVariant ?? variant;
  const spacing = parseMaybeSize(localProps.spacing);

  const heightRatioValue = localProps.heightRatio ?? defaultDesignCtx.heightRatio ?? BASE_HEIGHT_RATIO;
  const heightRatio = resolveHeightRatio(
    heightRatioValue,
    resolveHeightRatio(sizeCtx?.heightRatio ?? defaultDesignCtx.heightRatio ?? BASE_HEIGHT_RATIO, BASE_HEIGHT_RATIO),
  );

  if (sizeCtx) {
    // We are in a nested context
    const autoHeight = powerSize(sizeCtx.height, sizeCtx.heightRatio);
    const height = parseSize(localProps.height ?? autoHeight);
    const contentHeight = powerSize(height, heightRatio);

    const padding = (sizeCtx.height - height) / 2;

    const autoRounded = clamp(roundToSize(radiusScale(sizeCtx.rounded, padding)), 0.5, Infinity);
    const rounded = parseSize(localProps.rounded ?? autoRounded);

    console.log({
      height,
      contentHeight,
      parentRounded: sizeCtx.rounded,
      padding,
      rounded,
    });

    return { height, heightRatio, contentHeight, variant, hoverVariant, spacing, rounded };
  }
  // We are in a root context
  const height = parseSize(localProps.height ?? defaultDesignCtx.height ?? BASE_HEIGHT);
  const rounded = parseSize(localProps.rounded ?? defaultDesignCtx.rounded ?? ROUNDED.base);
  const contentHeight = powerSize(height, heightRatio);

  return {
    height,
    heightRatio,
    contentHeight,
    variant,
    hoverVariant,
    spacing,
    rounded,
  };
}

function resolveHeightRatio(value: THeightRatio, parentHeight: number): number {
  if (typeof value === "function") {
    return clampHeightRatio(value(parentHeight));
  }
  return clampHeightRatio(value);
}

function radiusScale(parentRadius: number, distance: number, scale = 1): number {
  return parentRadius * Math.exp(-(scale * distance) / parentRadius);
}
