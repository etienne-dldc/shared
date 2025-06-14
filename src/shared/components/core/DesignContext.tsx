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
  | "9"
  | "10"
  | "12";

export type TDesignButtonHeight = TDesignSize;
export type TDesignSpacing = TDesignSize; // Horizontal spacing based on icon width
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
  height: TDesignButtonHeight;
  spacing: TDesignSpacing | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export const DesignContext = createPropsContext(
  "Design",
  {
    height: "7",
    spacing: null,
    variant: "surface",
    hoverVariant: null,
  } as TDesignContextProps,
  (parent, props) => ({ ...parent, ...props }),
);

export function resolveDesignProps(props: TDesignContextProps) {
  const { height, spacing, variant, hoverVariant } = props;

  return {
    variant,
    hoverVariant: hoverVariant ?? variant,
    spacing,
    height,
  };
}

const INNER_SIZE_MAPPING: Record<TDesignButtonHeight, TDesignButtonHeight> = {
  "2x": "2x",
  "3": "2x",
  "3x": "2x",
  "4": "2x",
  "4x": "3",
  "5": "3",
  "5x": "3",
  "6": "3x",
  "6x": "3x",
  "7": "4",
  "7x": "4",
  "8": "4",
  "9": "4",
  "10": "4x",
  "12": "5",
};

export function resolveNestedHeight(height: TDesignButtonHeight): TDesignButtonHeight {
  return INNER_SIZE_MAPPING[height] || INNER_SIZE_MAPPING["7"];
}

const INNER_SIZE_MAPPING_REVERSED: Record<TDesignButtonHeight, TDesignButtonHeight> = Object.fromEntries(
  Object.entries(INNER_SIZE_MAPPING).map(([key, value]) => [value, key]),
) as Record<TDesignButtonHeight, TDesignButtonHeight>;

export function resolveOuterHeight(nestedHeight: TDesignButtonHeight): TDesignButtonHeight {
  return INNER_SIZE_MAPPING_REVERSED[nestedHeight] || INNER_SIZE_MAPPING_REVERSED["7"];
}
