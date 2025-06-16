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
  height: TDesignButtonHeight | null;
  spacing: TDesignSpacing | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export const DEFAULT_DESIGN_CONTEXT = {
  height: "7",
  spacing: "3",
  variant: "surface",
  hoverVariant: null,
} as const satisfies TDesignContextProps;

export const DesignContext = createPropsContext(
  "Design",
  {
    height: null,
    spacing: null,
    variant: "surface",
    hoverVariant: null,
  } as TDesignContextProps,
  (parent, props) => ({ ...parent, ...props }),
);

export function resolveDesignProps(props: TDesignContextProps) {
  const variant = props.variant ?? DEFAULT_DESIGN_CONTEXT.variant;

  return {
    variant,
    hoverVariant: props.hoverVariant ?? variant,
    spacing: props.spacing ?? undefined,
    height: props.height ?? DEFAULT_DESIGN_CONTEXT.height,
  };
}

const DEFAULT_INNER_SIZE_MAPPING: Record<TDesignButtonHeight, TDesignButtonHeight> = {
  "2x": "2x",
  "3": "2x",
  "3x": "2x",
  "4": "3",
  "4x": "3",
  "5": "3",
  "5x": "3x",
  "6": "3x",
  "6x": "3x",
  "7": "4",
  "7x": "4",
  "8": "4",
  "9": "4",
  "10": "4x",
  "12": "5",
};

export function resolveDefaultNestedHeight(height: TDesignButtonHeight): TDesignButtonHeight {
  return DEFAULT_INNER_SIZE_MAPPING[height] ?? DEFAULT_INNER_SIZE_MAPPING[DEFAULT_DESIGN_CONTEXT.height];
}

export type TNestedDesignHeight = TDesignButtonHeight | ((height: TDesignButtonHeight) => TDesignButtonHeight);

export function resolveNestedHeight(
  height: TDesignButtonHeight,
  nestedHeight: TNestedDesignHeight | undefined,
): TDesignButtonHeight {
  if (typeof nestedHeight === "function") {
    return nestedHeight(height);
  }
  return nestedHeight ?? resolveDefaultNestedHeight(height);
}
