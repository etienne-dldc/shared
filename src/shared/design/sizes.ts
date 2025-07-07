import { clamp } from "../utils/math";
import { TDesignContext, TDesignContextResolved, TDesignSize, THeightRatio, TRoundedSize, TSizeContext } from "./types";

export const BASE_HEIGHT = 7;
export const BASE_HEIGHT_RATIO = 0.68;

export function resolveSmallRounded(height: number): boolean {
  return height <= 4;
}

export function powerSize(size: number, power: number = 0.68): number {
  if (size < 2.5) {
    return size;
  }
  const powerClamped = clamp(power, 0, 1);
  const val = Math.pow(size, powerClamped);
  const valRounded = Math.round(val * 2) / 2;
  return clamp(valRounded, 2.5, size);
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
  sizeCtx: TSizeContext | null,
  designCtx: TDesignContext,
  localProps: Partial<TDesignContext>,
): TDesignContextResolved {
  const heightFromParent = sizeCtx ? powerSize(sizeCtx.parentHeight, sizeCtx.parentHeightRatio) : null;

  const height = parseSize(localProps.height ?? heightFromParent ?? designCtx.height ?? BASE_HEIGHT);
  const heightRatioValue = localProps.heightRatio ?? designCtx.heightRatio ?? BASE_HEIGHT_RATIO;
  const heightRatio = resolveHeightRatio(
    heightRatioValue,
    resolveHeightRatio(sizeCtx?.parentHeightRatio ?? designCtx.heightRatio ?? BASE_HEIGHT_RATIO, BASE_HEIGHT_RATIO),
  );
  const contentHeight = powerSize(height, heightRatio);

  const variant = localProps.variant ?? designCtx.variant;
  const hoverVariant = localProps.hoverVariant ?? designCtx.hoverVariant ?? variant;
  const spacing = parseMaybeSize(localProps.spacing);

  const rounded: TRoundedSize = sizeCtx ? "small" : "medium";

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
