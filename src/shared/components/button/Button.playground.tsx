import { CaretDown, CirclesFour, User } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn } from "../../styles/utils";
import { Button } from "./Button";

const TEXT_VARIANTS = {
  none: undefined,
  short: "Label",
  long: "Much longer text",
  very_long: "Much much longer text with biiiiiiiiiiig words",
} as const;

const DYNAMIC_COLOR_VARIANTS = {
  blue: "blue",
  indigo: "indigo",
  green: "green",
  orange: "orange",
  teal: "teal",
  red: "red",
  slate: "slate",
} as const;

const ICON_VARIANTS = {
  none: undefined,
  user: <User />,
  workspace: <CirclesFour />,
  select: <CaretDown />,
} as const;

const SIZE_VARIANTS = { xs: "xs", sm: "sm", md: "md", lg: "lg" } as const;

const VARIANT_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
} as const;

const ROUND_VARIANTS = {
  all: "all",
  start: "start",
  end: "end",
  none: "none",
} as const;

const BACKGROUND_COLORS = {
  none: "",
  paper: `bg-paper`,
  background: `bg-background`,
  blue: "bg-blue-900",
  indigo: "bg-indigo-900",
  green: "bg-green-900",
  orange: "bg-orange-900",
  teal: "bg-teal-900",
  red: "bg-red-900",
  slate: "bg-slate-900",
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
        variant: VARIANT_VARIANTS,
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
        variant: "primary",
        loading: "no",
        icon: "user",
        endIcon: "none",
        background: "none",
        fullWidth: "no",
      }}
      initialAxis={{ column: [], row: [] }}
      render={({ fullWidth, background, ...props }) => (
        <div className={cn("w-full h-full", background)}>
          <Button {...props} className={fullWidth ? "w-full" : ""} />
        </div>
      )}
    />
  );
}
