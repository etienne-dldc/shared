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

export interface TDesignProps {
  height?: TDesignSize | null;
  contentHeight?: TDesignSize | null;
  rounded?: TDesignSize | null;
  spacing?: TDesignSize | null;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant | null;
}

export interface TDefaultDesignContext {
  height: TDesignSize | null;
  contentHeight: TDesignSize | null;
  rounded: TDesignSize | null;
  spacing: TDesignSize | null;
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
