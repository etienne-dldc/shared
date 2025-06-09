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
export type TDesignContentSize = TDesignSize;
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
  contentSize: TDesignContentSize | null;
  height: TDesignButtonHeight | null;
  spacing: TDesignSpacing | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export const DesignContext = createPropsContext(
  "Design",
  {
    contentSize: null,
    height: null,
    spacing: null,
    variant: "surface",
    hoverVariant: null,
  } as TDesignContextProps,
  (parent, props) => ({ ...parent, ...props }),
);

const DEFAULT_SIZE_MAPPING: Record<
  TDesignButtonHeight,
  { height: TDesignButtonHeight; contentSize: TDesignContentSize; spacing: TDesignSpacing }
> = {
  "2x": { height: "2x", contentSize: "2x", spacing: "2x" },
  "3": { height: "3", contentSize: "2x", spacing: "3" },
  "3x": { height: "3x", contentSize: "2x", spacing: "3x" },
  "4": { height: "4", contentSize: "2x", spacing: "4" },
  "4x": { height: "4x", contentSize: "3", spacing: "4x" },
  "5": { height: "5", contentSize: "3", spacing: "5" },
  "5x": { height: "5x", contentSize: "3", spacing: "5x" },
  "6": { height: "6", contentSize: "3x", spacing: "6" },
  "6x": { height: "6x", contentSize: "3x", spacing: "6x" },
  "7": { height: "7", contentSize: "3x", spacing: "7" },
  "7x": { height: "7x", contentSize: "4", spacing: "7x" },
  "8": { height: "8", contentSize: "4", spacing: "8" },
  "9": { height: "9", contentSize: "4", spacing: "9" },
  "10": { height: "10", contentSize: "4x", spacing: "10" },
  "12": { height: "12", contentSize: "5", spacing: "12" },
};

const DEFAULT_SIZE_MAPPING_LIST = Object.values(DEFAULT_SIZE_MAPPING);

export const contentToHeight: Record<TDesignContentSize, TDesignButtonHeight | undefined> = {} as any;
export const heightToContent: Record<TDesignButtonHeight | TDesignContentSize, TDesignContentSize | undefined> =
  {} as any;
export const contentToSpacing: Record<TDesignContentSize, TDesignSpacing | undefined> = {} as any;
export const spacingToContent: Record<TDesignSpacing, TDesignContentSize | undefined> = {} as any;
export const heightToSpacing: Record<TDesignButtonHeight, TDesignSpacing | undefined> = {} as any;
export const spacingToHeight: Record<TDesignSpacing, TDesignButtonHeight | undefined> = {} as any;

export const contentToNestedHeight: Record<TDesignContentSize, TDesignButtonHeight | undefined> = {} as any;

DEFAULT_SIZE_MAPPING_LIST.forEach(({ contentSize: content, height, spacing }) => {
  contentToHeight[content] = height;
  heightToContent[height] = content;
  contentToSpacing[content] = spacing;
  spacingToContent[spacing] = content;
  heightToSpacing[height] = spacing;
  spacingToHeight[spacing] = height;

  // Find item that has current content as height
  const heightItem = DEFAULT_SIZE_MAPPING_LIST.find((item) => item.height === content);
  if (heightItem) {
    contentToNestedHeight[content] = heightItem.height;
  }
});

const DEFAULT_SIZE = DEFAULT_SIZE_MAPPING["6"];

export type TResolvedDesignProps = ReturnType<typeof resolveDesignProps>;

export function resolveDesignProps(props: TDesignContextProps) {
  const { contentSize, height, spacing, variant, hoverVariant } = props;

  return {
    variant,
    hoverVariant: hoverVariant ?? variant,
    ...DEFAULT_SIZE,
    ...resolveDesignSizes(contentSize, height, spacing),
  };
}

function resolveDesignSizes(
  contentSize: TDesignContentSize | null,
  height: TDesignButtonHeight | null,
  spacing: TDesignSpacing | null,
): {
  contentSize?: TDesignContentSize;
  height?: TDesignButtonHeight;
  spacing?: TDesignSpacing;
} {
  if (height) {
    return {
      height,
      contentSize: contentSize ?? heightToContent[height],
      spacing: spacing ?? heightToSpacing[height],
    };
  }
  if (contentSize) {
    return {
      contentSize,
      height: height ?? contentToHeight[contentSize],
      spacing: spacing ?? contentToSpacing[contentSize],
    };
  }
  if (spacing) {
    return {
      spacing,
      contentSize: contentSize ?? spacingToContent[spacing],
      height: height ?? spacingToHeight[spacing],
    };
  }
  return {};
}
