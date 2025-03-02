import { CaretDown, CirclesFour, User } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn, tw } from "../../styles/utils";
import { Button } from "./Button";

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
  user: <User />,
  workspace: <CirclesFour />,
  select: <CaretDown />,
} as const;

const SIZE_VARIANTS = { xs: "xs", sm: "sm", md: "md", lg: "lg" } as const;

const PRIMARY_VARIANTS = { default: undefined, base: false, primary: true } as const;

const FILLED_VARIANTS = { default: undefined, filled: true, base: false } as const;

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

const INTERACTIVE_STATE = {
  base: null,
  hover: "hover",
  active: "active",
  focus: "focus",
} as const;

const DISABLED_VARIANTS = { no: undefined, yes: true } as const;

const LOADING_VARIANTS = { no: undefined, yes: true } as const;

const FULL_WIDTH_VARIANTS = { no: false, yes: true } as const;

export default function ButtonPlayground() {
  return (
    <Variants
      localStorageKey="button"
      cellMinWidth={200}
      dimensions={{
        color: DYNAMIC_COLOR_VARIANTS,
        size: SIZE_VARIANTS,
        primary: PRIMARY_VARIANTS,
        filled: FILLED_VARIANTS,
        rounded: ROUND_VARIANTS,
        disabled: DISABLED_VARIANTS,
        title: TEXT_VARIANTS,
        details: TEXT_VARIANTS,
        loading: LOADING_VARIANTS,
        icon: ICON_VARIANTS,
        endIcon: ICON_VARIANTS,
        background: BACKGROUND_COLORS,
        fullWidth: FULL_WIDTH_VARIANTS,
        state: INTERACTIVE_STATE,
      }}
      defaultSelected={{
        color: "blue",
        title: "short",
        details: "none",
        rounded: "all",
        disabled: "no",
        size: "md",
        primary: "default",
        filled: "default",
        loading: "no",
        icon: "user",
        endIcon: "none",
        background: "none",
        fullWidth: "no",
        state: "base",
      }}
      initialAxis={{ column: [], row: [] }}
      render={({ fullWidth, background, state, ...props }) => (
        <div className={cn("w-full h-full", background)}>
          <Button {...props} className={cn(fullWidth ? "w-full" : "")} __forceState={state} />
        </div>
      )}
    />
  );
}
