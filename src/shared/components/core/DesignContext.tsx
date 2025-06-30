/* eslint-disable react-refresh/only-export-components */
import { createPropsContext } from "../../utils/propsContext";

export type TDesignSize =
  | "2x"
  | "3"
  | "3x"
  | "4"
  | "4x"
  | "5"
  | "5x"
  | "6"
  | "6x"
  | "7"
  | "7x"
  | "8"
  | "8x"
  | "9"
  | "9x"
  | "10"
  | "10x"
  | "11"
  | "11x"
  | "12"
  | number;

export type TDesignVariant = "solid" | "surface" | "subtle" | "ghost";

export type TPaletteColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

export interface TDesignContextProps {
  height: TDesignSize | null;
  spacing: TDesignSize | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export const DEFAULT_DESIGN_CONTEXT = {
  height: 7,
  spacing: null,
  variant: "surface",
  hoverVariant: null,
} as const satisfies TDesignContextProps;

export const DesignContext = createPropsContext<TDesignContextProps>(
  "Design",
  {
    height: null,
    spacing: null,
    variant: "surface",
    hoverVariant: null,
  },
  (parent, props) => ({ ...parent, ...props }),
);

export function resolveDesignProps(props: TDesignContextProps) {
  const variant = props.variant ?? DEFAULT_DESIGN_CONTEXT.variant;
  const height = parseSize(props.height ?? DEFAULT_DESIGN_CONTEXT.height);

  return {
    variant,
    hoverVariant: props.hoverVariant ?? variant,
    spacing: props.spacing ? parseSize(props.spacing) : undefined,
    height,
  };
}

export type TNestedDesignHeight = TDesignSize | ((height: number) => TDesignSize);

export function resolveNestedHeight(height: number, nestedHeight: TNestedDesignHeight | undefined): number {
  if (typeof nestedHeight === "function") {
    return parseSize(nestedHeight(height));
  }
  return parseSize(nestedHeight ?? powerSize(height));
}

export function resolveSmallRounded(height: number): boolean {
  return height <= 4;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function powerSize(size: number, power: number = 0.37): number {
  if (size < 2.5) {
    return size;
  }
  const powerClamped = clamp(power, 0.1, 0.7);
  const val = 2 * Math.pow(size - 1.5, powerClamped);
  const valRounded = Math.round(val * 2) / 2;
  return clamp(valRounded, 2.5, size);
}

export function dynamicNestedHeight(power: number = 0.37) {
  return (height: number): TDesignSize => powerSize(height, power);
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

interface DefineNestedHeightProps {
  nestedHeight?: TNestedDesignHeight;
  children: React.ReactNode;
}

export function DefineNestedHeight(props: DefineNestedHeightProps) {
  const { nestedHeight, children } = props;
  const [design] = DesignContext.useProps();
  const { height } = resolveDesignProps(design);
  const nestedHeightResolved = resolveNestedHeight(height, nestedHeight);
  return <DesignContext.Define height={nestedHeightResolved}>{children}</DesignContext.Define>;
}
