import { CaretDownIcon, CirclesFourIcon, UserIcon } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn, tw } from "../../styles/utils";
import { ButtonLike } from "./ButtonLike";

const TEXT_VARIANTS = {
  none: undefined,
  short: "Label",
  long: "Much longer text",
  very_long: "Much much longer text with biiiiiiiiiiig words",
} as const;

const DYNAMIC_COLOR_VARIANTS = {
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
} as const;

const ICON_VARIANTS = {
  none: undefined,
  user: <UserIcon />,
  workspace: <CirclesFourIcon />,
  select: <CaretDownIcon />,
} as const;

const SIZE_VARIANTS = { xs: "xs", sm: "sm", md: "md", lg: "lg" } as const;
const DIR_SIZE_VARIANTS = { default: undefined, xs: "xs", sm: "sm", md: "md", lg: "lg" } as const;

const PRIMARY_VARIANTS = { default: undefined, primary: true, unprimary: false } as const;

const FILLED_VARIANTS = { default: undefined, filled: true, unfilled: false } as const;

const HOVER_PRIMARY_VARIANTS = { default: undefined, hoverPrimary: true, hoverUnprimary: false } as const;

const ROUND_VARIANTS = {
  all: "all",
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  none: "none",
} as const;

const BACKGROUND_COLORS = {
  none: "",
  blue: tw`bg-blue-950`,
  indigo: tw`bg-indigo-950`,
  green: tw`bg-green-950`,
  orange: tw`bg-orange-950`,
  teal: tw`bg-teal-950`,
  red: tw`bg-red-950`,
  slate: tw`bg-slate-950`,
} as const;

const DISABLED_VARIANTS = { no: undefined, yes: true } as const;

const LOADING_VARIANTS = { no: undefined, yes: true } as const;

const FULL_WIDTH_VARIANTS = { no: false, yes: true } as const;

export default function ButtonLikePlayground() {
  return (
    <Variants
      localStorageKey="button-like"
      cellMinWidth={200}
      dimensions={{
        color: DYNAMIC_COLOR_VARIANTS,
        size: SIZE_VARIANTS,
        xSize: DIR_SIZE_VARIANTS,
        ySize: DIR_SIZE_VARIANTS,
        primary: PRIMARY_VARIANTS,
        filled: FILLED_VARIANTS,
        hoverFilled: HOVER_PRIMARY_VARIANTS,
        rounded: ROUND_VARIANTS,
        disabled: DISABLED_VARIANTS,
        title: TEXT_VARIANTS,
        details: TEXT_VARIANTS,
        loading: LOADING_VARIANTS,
        icon: ICON_VARIANTS,
        endIcon: ICON_VARIANTS,
        background: BACKGROUND_COLORS,
        fullWidth: FULL_WIDTH_VARIANTS,
      }}
      defaultSelected={{
        color: "blue",
        title: "short",
        details: "none",
        rounded: "all",
        disabled: "no",
        size: "md",
        xSize: "default",
        ySize: "default",
        primary: "default",
        filled: "default",
        hoverFilled: "default",
        loading: "no",
        icon: "user",
        endIcon: "none",
        background: "none",
        fullWidth: "no",
      }}
      presets={{
        base: { column: [], row: [], selected: {} },
        "size & color": { column: ["size"], row: ["color"], selected: { primary: "primary", filled: "filled" } },
        content: {
          column: ["title"],
          row: ["details", "icon", "endIcon"],
          selected: { primary: "primary", filled: "filled" },
        },
        sizes: {
          column: ["xSize"],
          row: ["ySize"],
          selected: { primary: "primary", filled: "filled" },
        },
      }}
      render={({ fullWidth, background, ...props }) => (
        <div className={cn("w-full h-full", background)}>
          <ButtonLike {...props} className={cn(fullWidth ? "w-full" : "")} />
        </div>
      )}
    />
  );
}
