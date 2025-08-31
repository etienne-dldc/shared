import { IntRange } from "type-fest";

type L1 = "x";
type L2 = `x${L1 | ""}` | `_${L1}`;
type L3 = `x${L2 | ""}` | `_${L2}`;

export type TDesignHeight = `${IntRange<2, 13>}${"" | L1}` | number;
export type TDesignRounded = `${IntRange<0, 5>}${"" | L3}` | `${IntRange<5, 10>}${"" | L1}` | number;
export type TDesignSpacing = `${IntRange<0, 5>}${"" | L2}` | `${IntRange<5, 10>}${"" | L1}` | number;

export type TDesignSize = `${"" | "-"}${IntRange<0, 100>}${"" | L3}` | number;

export type TDesignVariant = "solid" | "surface" | "subtle" | "ghost" | "input";

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

export interface TDesignProps {
  height?: TDesignHeight | null;
  contentHeight?: TDesignHeight | null;
  rounded?: TDesignRounded | null;
  spacing?: TDesignSpacing | null;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant | null;
}

export interface TDefaultDesignContext {
  height: TDesignHeight | null;
  contentHeight: TDesignHeight | null;
  rounded: TDesignRounded | null;
  spacing: TDesignSpacing | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export interface TParentDesignContext {
  depth: number;
  height: number;
  contentHeight: number;
  rounded: number;
}

export interface TDesignContextResolved {
  depth: number;
  height: number;
  contentHeight: number;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant;
  spacing: number | null;
  rounded: number;
}

export type TNestedDesignValues = Partial<TDefaultDesignContext>[];

export interface TNestedDefaultDesignContext {
  depth: number;
  values: TNestedDesignValues;
}
