import { DEFAULT_DESIGN } from "../components/core/DesignContext";
import { clamp } from "../utils/math";
import { withoutUndefined } from "../utils/withoutUndefined";
import {
  TDefaultDesignContext,
  TDesignContextResolved,
  TDesignSize,
  TDesignVariant,
  TNestedDefaultDesignContext,
  TParentDesignContext,
} from "./types";

export const BASE_HEIGHT = 7;
export const MIN_HEIGHT = 2.5;
export const BASE_HEIGHT_RATIO = 0.7;
export const BASE_ROUNDED = parseSize("1");

export function resolveSmallRounded(height: number): boolean {
  return height <= 4;
}

export function roundToSize(value: number): number {
  const valRounded = Math.round(value * 2) / 2;
  return clamp(valRounded, 0, Infinity);
}

export function clampHeightRatio(value: number): number {
  return clamp(value, 0.1, 1);
}

export function parseSize(size: TDesignSize | (string & {})): number {
  if (typeof size === "number") {
    return size;
  }
  const base = parseInt(size, 10);
  const rest = (size.match(/[_x]*$/)?.[0] ?? "")
    .split("")
    .map((char, index) => {
      if (char === "x") return 1 / Math.pow(2, index + 1);
      return 0;
    })
    .reduce((a, b) => a + b, 0);
  return base + (base < 0 ? -rest : rest);
}

export function parseMaybeSize(size: TDesignSize | (string & {}) | null | undefined): number | null {
  if (size === null || size === undefined) {
    return null;
  }
  return parseSize(size);
}

export function sizeToRem(size: TDesignSize | (string & {})): number {
  const parsedSize = typeof size === "number" ? size : parseSize(size);
  return (parsedSize * 4) / 16;
}

export function sizeToRemString(size: TDesignSize | (string & {})): string {
  return `${sizeToRem(size)}rem`;
}

export function sizeToFontSize(size: TDesignSize | (string & {})) {
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
  parentCtx: TParentDesignContext | null,
  nestedCtx: TNestedDefaultDesignContext | null,
  localProps: Partial<TDefaultDesignContext>,
  overrideDefaultVariant?: TDesignVariant,
): TDesignContextResolved {
  const depth = !parentCtx ? 0 : parentCtx.depth + 1;
  const props = resolveProps(nestedCtx, localProps, depth, overrideDefaultVariant);
  const contentHeightFromNestedHeight = resolveProps(nestedCtx, {}, depth + 1).height;
  const contentHeightProp = parseMaybeSize(props.contentHeight ?? contentHeightFromNestedHeight);

  const hoverVariant = props.hoverVariant ?? props.variant;
  const spacing = parseMaybeSize(props.spacing);

  if (!parentCtx) {
    // We are in a root context
    const height = parseSize(props.height ?? BASE_HEIGHT);
    const rounded = parseSize(props.rounded ?? BASE_ROUNDED);
    const contentHeight = resolveContentHeight(height, contentHeightProp);

    return { height, contentHeight, variant: props.variant, hoverVariant, spacing, rounded, depth };
  }
  // We are in a nested context
  const autoHeight = parentCtx.contentHeight;
  const height = parseSize(props.height ?? autoHeight);
  const contentHeight = resolveContentHeight(height, contentHeightProp);

  const padding = (parentCtx.height - height) / 2;

  const autoRounded = resolvedAutoRounded(parentCtx.rounded, padding);
  const rounded = parseSize(props.rounded ?? autoRounded);

  return { height, contentHeight, variant: props.variant, hoverVariant, spacing, rounded, depth };
}

function resolvedAutoRounded(parentRadius: number, padding: number): number {
  if (parentRadius === 0) {
    return 0;
  }
  return clamp(roundToSize(radiusScale(parentRadius, padding)), 0.5, Infinity);
}

function resolveProps(
  nestedCtx: TNestedDefaultDesignContext | null,
  localProps: Partial<TDefaultDesignContext>,
  depth: number,
  overrideDefaultVariant?: TDesignVariant,
): TDefaultDesignContext {
  const resolvedDefault = resolveDefaultProps(nestedCtx, depth);
  return {
    ...resolvedDefault,
    ...(overrideDefaultVariant ? { variant: overrideDefaultVariant } : {}),
    ...withoutUndefined(localProps),
  };
}

function resolveDefaultProps(nestedCtx: TNestedDefaultDesignContext | null, depth: number): TDefaultDesignContext {
  if (!nestedCtx) {
    return DEFAULT_DESIGN;
  }
  const parentDepth = nestedCtx.depth;
  if (depth < parentDepth) {
    return DEFAULT_DESIGN;
  }
  const diff = depth - parentDepth;
  const values = nestedCtx.values[diff] ?? {};
  return {
    ...DEFAULT_DESIGN,
    ...withoutUndefined(values),
  };
}

function resolveContentHeight(height: number, contentHeight: number | null): number {
  if (contentHeight !== null) {
    return clamp(contentHeight, MIN_HEIGHT, height);
  }
  // Auto content height based on the height
  return autoContentHeight(height);
}

function radiusScale(parentRadius: number, distance: number, scale = 1): number {
  return parentRadius * Math.exp(-(scale * distance) / parentRadius);
}

export function powerValue(value: number, power: number): number {
  const powerClamped = clamp(power, 0, 1);
  return Math.pow(value + 1, powerClamped) - 1;
}

export function powerSize(size: number, power: number = 0.68): number {
  if (size < MIN_HEIGHT) {
    return size;
  }
  const val = powerValue(size, power);
  return roundToSize(val);
}

export function autoContentHeight(height: number, heightRatio = BASE_HEIGHT_RATIO): number {
  return clamp(powerSize(height, heightRatio), MIN_HEIGHT, height);
}
