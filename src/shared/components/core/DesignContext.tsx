/* eslint-disable react-refresh/only-export-components */
import { createPropsContext } from "../../utils/propsContext";

export type TDesignSize = "2x" | "3" | "3x" | "4" | "4x" | "5" | "6" | "7" | "8" | "10" | "12";

// Can be thought as all possible height a button can have
export type TDesignCrossSize = TDesignSize;
// Inherits from TDesignCrossSize for nested content
export type TDesignContentSize = TDesignSize;
// Main size is based on icon width
export type TDesignMainSize = TDesignSize;
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
  crossSize: TDesignCrossSize | null;
  mainSize: TDesignMainSize | null;
  variant: TDesignVariant;
  hoverVariant: TDesignVariant | null;
}

export const DesignContext = createPropsContext(
  "Design",
  {
    contentSize: null,
    crossSize: null,
    mainSize: null,
    variant: "surface",
    hoverVariant: null,
  } as TDesignContextProps,
  (parent, props) => ({ ...parent, ...props }),
);

const DEFAULT_SIZE_MAPPING: Record<
  TDesignCrossSize,
  { cross: TDesignCrossSize; content: TDesignContentSize; main: TDesignMainSize }
> = {
  "2x": { cross: "2x", content: "2x", main: "2x" },
  "3": { cross: "3", content: "2x", main: "2x" },
  "3x": { cross: "3x", content: "2x", main: "2x" },
  "4": { cross: "4", content: "3", main: "3" },
  "4x": { cross: "4x", content: "3", main: "3" },
  "5": { cross: "5", content: "3", main: "3" },
  "6": { cross: "6", content: "3x", main: "3x" },
  "7": { cross: "7", content: "4", main: "4" },
  "8": { cross: "8", content: "4x", main: "4x" },
  "10": { cross: "10", content: "5", main: "5" },
  "12": { cross: "12", content: "6", main: "6" },
};

const DEFAULT_SIZE_MAPPING_LIST = Object.values(DEFAULT_SIZE_MAPPING);

export const contentToCross: Record<TDesignContentSize, TDesignCrossSize | undefined> = {} as any;
export const crossToContent: Record<TDesignCrossSize | TDesignContentSize, TDesignContentSize | undefined> = {} as any;
export const contentToMain: Record<TDesignContentSize, TDesignMainSize | undefined> = {} as any;
export const mainToContent: Record<TDesignMainSize, TDesignContentSize | undefined> = {} as any;
export const crossToMain: Record<TDesignCrossSize, TDesignMainSize | undefined> = {} as any;
export const mainToCross: Record<TDesignMainSize, TDesignCrossSize | undefined> = {} as any;

export const contentToNestedCross: Record<TDesignContentSize, TDesignCrossSize | undefined> = {} as any;

DEFAULT_SIZE_MAPPING_LIST.forEach(({ content, cross, main }) => {
  contentToCross[content] = cross;
  crossToContent[cross] = content;
  contentToMain[content] = main;
  mainToContent[main] = content;
  crossToMain[cross] = main;
  mainToCross[main] = cross;

  // Find item that has current content as cross
  const crossItem = DEFAULT_SIZE_MAPPING_LIST.find((item) => item.cross === content);
  if (crossItem) {
    contentToNestedCross[content] = crossItem.cross;
  }
});

const DEFAULT_SIZE = {
  contentSize: "3x" satisfies TDesignContentSize,
  crossSize: "6" satisfies TDesignCrossSize,
  mainSize: "3x" satisfies TDesignMainSize,
} as const;

export type TResolvedDesignProps = ReturnType<typeof resolveDesignProps>;

export function resolveDesignProps(props: TDesignContextProps) {
  const { contentSize, crossSize, mainSize, variant, hoverVariant } = props;

  return {
    variant,
    hoverVariant: hoverVariant ?? variant,
    ...DEFAULT_SIZE,
    ...resolveDesignSizes(contentSize, crossSize, mainSize),
  };
}

function resolveDesignSizes(
  contentSize: TDesignContentSize | null,
  crossSize: TDesignCrossSize | null,
  mainSize: TDesignMainSize | null,
): {
  contentSize?: TDesignContentSize;
  crossSize?: TDesignCrossSize;
  mainSize?: TDesignMainSize;
} {
  if (contentSize) {
    return {
      contentSize,
      crossSize: crossSize ?? contentToCross[contentSize],
      mainSize: mainSize ?? contentToMain[contentSize],
    };
  }
  if (crossSize) {
    return {
      crossSize,
      contentSize: contentSize ?? crossToContent[crossSize],
      mainSize: mainSize ?? crossToMain[crossSize],
    };
  }
  if (mainSize) {
    return {
      mainSize,
      contentSize: contentSize ?? mainToContent[mainSize],
      crossSize: crossSize ?? mainToCross[mainSize],
    };
  }
  return {};
}
