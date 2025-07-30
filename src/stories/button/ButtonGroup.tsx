import { CaretRightIcon, HouseIcon } from "@phosphor-icons/react";
import { TVariantsValues, Variants } from "../../playground/LegacyVariants";
import { Button } from "../../shared/components/button/Button";
import { ButtonGroup } from "../../shared/components/button/ButtonGroup";
import { TDesignSize, TDesignVariant, TPaletteColor } from "../../shared/design/types";

const DYNAMIC_COLOR_VARIANTS = {
  default: undefined,
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
  rose: "rose",
  slate: "slate",
  gray: "gray",
  zinc: "zinc",
  neutral: "neutral",
  stone: "stone",
} satisfies TVariantsValues<TPaletteColor, TPaletteColor | undefined>;

const SIZE_VARIANTS = {
  default: undefined,
  size_2x: "2x",
  size_3: "3",
  size_3x: "3x",
  size_4: "4",
  size_4x: "4x",
  size_5: "5",
  size_5x: "5x",
  size_6: "6",
  size_6x: "6x",
  size_7: "7",
  size_7x: "7x",
  size_8: "8",
  size_8x: "8x",
  size_9: "9",
  size_9x: "9x",
  size_10: "10",
  size_10x: "10x",
  size_11: "11",
  size_11x: "11x",
  size_12: "12",
} satisfies TVariantsValues<`size_${TDesignSize}`, TDesignSize | undefined>;

const VARIANT_VARIANTS = {
  default: undefined,
  solid: "solid",
  surface: "surface",
  subtle: "subtle",
  ghost: "ghost",
} satisfies TVariantsValues<TDesignVariant, TDesignVariant | undefined>;

// const BACKGROUND_COLORS = {
//   none: "",
//   blue: "bg-blue-900",
//   indigo: "bg-indigo-900",
//   green: "bg-green-900",
//   orange: "bg-orange-900",
//   teal: "bg-teal-900",
//   red: "bg-red-900",
//   slate: "bg-slate-900",
// } as const;

const DISABLED_VARIANTS = { no: undefined, yes: true } as const;

const MARGIN_VARIANTS = { no: undefined, yes: "p-4" } as const;

const ROUNDED_GROUP_VARIANTS = { default: undefined, yes: true, no: false } as const;

const INNER_DIVIDERS_VARIANTS = { no: false, yes: true } as const;
const OUTER_DIVIDERS_VARIANTS = { none: "none", start: "start", end: "end", both: "both" } as const;

const DIRECT_VARIANTS = {
  default: undefined,
  vertical: "vertical",
  horizontal: "horizontal",
} as const;

export default function ButtonPlayground() {
  return (
    <Variants
      localStorageKey="button-group"
      cellMinWidth={200}
      dimensions={{
        height: SIZE_VARIANTS,
        spacing: SIZE_VARIANTS,
        variant: VARIANT_VARIANTS,
        hoverVariant: VARIANT_VARIANTS,
        color: DYNAMIC_COLOR_VARIANTS,
        disabled: DISABLED_VARIANTS,
        direction: DIRECT_VARIANTS,

        margin: MARGIN_VARIANTS,
        roundedGroup: ROUNDED_GROUP_VARIANTS,
        innerDividers: INNER_DIVIDERS_VARIANTS,
        outerDividers: OUTER_DIVIDERS_VARIANTS,
      }}
      defaultSelected={{
        color: "default",
        direction: "default",
        height: "default",
        innerDividers: "yes",
        disabled: "no",
        outerDividers: "none",
        roundedGroup: "yes",
        variant: "default",
        hoverVariant: "default",
        margin: "no",
        spacing: "default",
      }}
      presets={{
        base: { column: [], row: [], selected: {} },
      }}
      render={({ margin: _margin, ...props }) => (
        <div
        // className={cn("w-full h-full", background, margin)}
        >
          <ButtonGroup {...props}>
            <Button>text</Button>
            <Button>text</Button>
            <Button>text and icon</Button>
            <Button startIcon={<HouseIcon />} variant="solid">
              text
            </Button>
            <Button>text</Button>
            <Button>text</Button>
            <Button startIcon={<HouseIcon />} endIcon={<CaretRightIcon />}>
              text and 2 icon
            </Button>
          </ButtonGroup>
        </div>
      )}
    />
  );
}
