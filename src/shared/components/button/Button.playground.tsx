import { CaretDownIcon, CirclesFourIcon, DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { styled } from "../../../../styled-system/jsx";
import { TVariantsValues, Variants } from "../../../playground/LegacyVariants";
import { cn } from "../../styles/utils";
import { TDesignSize, TDesignVariant, TPaletteColor } from "../core/DesignContext";
import { Button } from "./Button";
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
  dotsButton: <ButtonLike icon={<DotsThreeVerticalIcon />} />,
  caretButton: <ButtonLike icon={<CaretDownIcon />} />,
  cancelButton: <ButtonLike content="Cancel" color="red" />,
  primaryDotsButton: <ButtonLike icon={<DotsThreeVerticalIcon />} />,
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
  size_9: "9",
  size_10: "10",
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
//   blue: tw`bg-blue-950`,
//   indigo: tw`bg-indigo-950`,
//   green: tw`bg-green-950`,
//   orange: tw`bg-orange-950`,
//   teal: tw`bg-teal-950`,
//   red: tw`bg-red-950`,
//   slate: tw`bg-slate-950`,
// } as const;

const INTERACTIVE_STATE = {
  default: undefined,
  base: null,
  hover: "hover",
  focus: "focus",
} as const;

const DISABLED_VARIANTS = {
  default: undefined,
  no: false,
  yes: true,
} as const;

const LOADING_VARIANTS = { default: undefined, no: false, yes: true } as const;

const FULL_WIDTH_VARIANTS = { default: undefined, no: false, yes: true } as const;

export default function ButtonPlayground() {
  return (
    <Variants
      title="Button"
      localStorageKey="button"
      cellMinWidth={200}
      dimensions={{
        disabled: DISABLED_VARIANTS,
        height: SIZE_VARIANTS,
        contentSize: SIZE_VARIANTS,
        spacing: SIZE_VARIANTS,
        variant: VARIANT_VARIANTS,
        hoverVariant: VARIANT_VARIANTS,
        color: DYNAMIC_COLOR_VARIANTS,

        content: TEXT_VARIANTS,
        loading: LOADING_VARIANTS,
        icon: ICON_VARIANTS,
        endIcon: ICON_VARIANTS,
        endAction: END_ACTION_VARIANTS,

        // background: BACKGROUND_COLORS,
        fullWidth: FULL_WIDTH_VARIANTS,
        state: INTERACTIVE_STATE,
      }}
      defaultSelected={{
        disabled: "default",
        height: "default",
        contentSize: "default",
        spacing: "default",
        variant: "default",
        hoverVariant: "default",
        color: "default",

        content: "default",
        loading: "default",
        icon: "default",
        endIcon: "default",
        endAction: "default",

        // background: "default",
        fullWidth: "default",
        state: "default",
      }}
      presets={{
        base: { column: [], row: [], selected: {} },
        variants: { column: ["state"], row: ["variant", "hoverVariant"], selected: {} },
        focused: {
          column: ["color"],
          row: ["height", "variant"],
          selected: { state: "focus" },
        },
        "size & color": { column: ["height"], row: ["color"], selected: { variant: "solid" } },
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
      }}
      render={({ fullWidth, state, ...props }) => (
        <styled.div className={cn("w-full h-full")}>
          <Button
            {...props}
            css={{ w: fullWidth ? "full" : "auto" }}
            data-focus-visible={state === "focus" ? true : undefined}
            data-hover={state === "hover" ? true : undefined}
          />
        </styled.div>
      )}
    />
  );
}
