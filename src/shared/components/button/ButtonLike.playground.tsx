import { CaretDownIcon, CirclesFourIcon, DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { TVariantsValues, Variants } from "../../../playground/LegacyVariants";
import { TDesignSize, TDesignVariant, TPaletteColor } from "../../design/types";
import { ButtonLike } from "./ButtonLike";

const TEXT_VARIANTS = {
  default: "Label",
  none: undefined,
  short: "Label",
  long: "Much longer text",
  very_long: "Much much longer text with biiiiiiiiiiig words",
} as const;

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

const ICON_VARIANTS = {
  default: undefined,
  none: undefined,
  user: <UserIcon />,
  workspace: <CirclesFourIcon />,
  select: <CaretDownIcon />,
} as const;

const END_ACTION_VARIANTS = {
  default: undefined,
  none: undefined,
  dotsButton: <ButtonLike startIcon={<DotsThreeVerticalIcon />} />,
  caretButton: <ButtonLike startIcon={<CaretDownIcon />} />,
  cancelButton: <ButtonLike color="red">Cancel</ButtonLike>,
  solidDotsButton: <ButtonLike startIcon={<DotsThreeVerticalIcon />} variant="solid" />,
  surfaceDotsButton: <ButtonLike startIcon={<DotsThreeVerticalIcon />} variant="surface" />,
} as const;

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

const LOADING_VARIANTS = { default: undefined, no: false, yes: true } as const;

const VARIANT_VARIANTS = {
  default: undefined,
  solid: "solid",
  surface: "surface",
  subtle: "subtle",
  ghost: "ghost",
} satisfies TVariantsValues<TDesignVariant, TDesignVariant | undefined>;

export default function ButtonLikePlayground() {
  return (
    <Variants
      localStorageKey="button-like"
      cellMinWidth={200}
      dimensions={{
        height: SIZE_VARIANTS,
        nestedHeight: SIZE_VARIANTS,
        spacing: SIZE_VARIANTS,
        variant: VARIANT_VARIANTS,
        hoverVariant: VARIANT_VARIANTS,
        color: DYNAMIC_COLOR_VARIANTS,

        children: TEXT_VARIANTS,
        loading: LOADING_VARIANTS,
        startIcon: ICON_VARIANTS,
        endIcon: ICON_VARIANTS,
        endAction: END_ACTION_VARIANTS,
      }}
      defaultSelected={{
        height: "default",
        nestedHeight: "default",
        spacing: "default",
        variant: "default",
        hoverVariant: "default",
        color: "default",

        children: "default",
        loading: "default",
        startIcon: "default",
        endIcon: "default",
        endAction: "default",
      }}
      presets={{
        base: { column: [], row: [], selected: {} },
        // "size & color": { column: ["size"], row: ["color"], selected: { primary: "primary", filled: "filled" } },
        // content: {
        //   column: ["title"],
        //   row: ["details", "icon", "endIcon"],
        //   selected: { primary: "primary", filled: "filled" },
        // },
        // sizes: {
        //   column: ["xSize"],
        //   row: ["ySize"],
        //   selected: { primary: "primary", filled: "filled" },
        // },
        "size & color": { column: ["height"], row: ["color"], selected: { variant: "solid" } },
        content: {
          column: ["children"],
          row: ["startIcon", "endIcon"],
          selected: { variant: "solid", color: "blue" },
        },
        sizes: {
          column: ["height"],
          row: ["spacing"],
          selected: { variant: "solid", color: "blue" },
        },
      }}
      render={({ ...props }) => (
        <div
        // className={cn("w-full h-full", fullWidth ? "" : "flex flex-row")}
        >
          <ButtonLike
            {...props}
            // className={cn(fullWidth ? "w-full" : "")}
          />
        </div>
      )}
    />
  );
}
