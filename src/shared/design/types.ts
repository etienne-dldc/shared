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

export type THeightRatio = number | ((parent: number) => number);

export interface TDesignProps {
  height?: TDesignSize | null;
  heightRatio?: THeightRatio | null;
  rounded?: TDesignSize | null;
  spacing?: TDesignSize | null;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant | null;
}

export interface TDefaultDesignContext {
  height: TDesignSize | null;
  heightRatio: THeightRatio | null;
  rounded: TDesignSize | null;
  spacing: TDesignSize | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export interface TParentDesignContext {
  height: number;
  heightRatio: number;
  rounded: number;
}

export interface TDesignContextResolved {
  height: number;
  heightRatio: number;
  contentHeight: number;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant;
  spacing: number | null;
  rounded: number;
}
