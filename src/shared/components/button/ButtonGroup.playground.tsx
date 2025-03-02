import { CaretRight, House } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn } from "../../styles/utils";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

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
} as const;

const SIZE_VARIANTS = {
  default: undefined,
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

const PRIMARY_VARIANTS = { default: undefined, base: false, primary: true } as const;

const FILLED_VARIANTS = { default: undefined, filled: true, base: false } as const;

const BACKGROUND_COLORS = {
  none: "",
  blue: "bg-blue-900",
  indigo: "bg-indigo-900",
  green: "bg-green-900",
  orange: "bg-orange-900",
  teal: "bg-teal-900",
  red: "bg-red-900",
  slate: "bg-slate-900",
} as const;

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
        color: DYNAMIC_COLOR_VARIANTS,
        size: SIZE_VARIANTS,
        primary: PRIMARY_VARIANTS,
        filled: FILLED_VARIANTS,
        disabled: DISABLED_VARIANTS,
        background: BACKGROUND_COLORS,
        margin: MARGIN_VARIANTS,
        direction: DIRECT_VARIANTS,
        roundedGroup: ROUNDED_GROUP_VARIANTS,
        innerDividers: INNER_DIVIDERS_VARIANTS,
        outerDividers: OUTER_DIVIDERS_VARIANTS,
      }}
      defaultSelected={{
        color: "blue",
        size: "md",
        primary: "default",
        filled: "default",
        disabled: "no",
        background: "none",
        margin: "no",
        direction: "default",
        roundedGroup: "default",
        innerDividers: "yes",
        outerDividers: "none",
      }}
      initialAxis={{ column: [], row: [] }}
      render={({ background, margin, ...props }) => (
        <div className={cn("w-full h-full", background, margin)}>
          <ButtonGroup {...props}>
            <Button title="text" />
            <Button title="text and icon" icon={<House />} />
            <Button icon={<House />} />
            <Button title="text and 2 icon" icon={<House />} endIcon={<CaretRight />} />
          </ButtonGroup>
        </div>
      )}
    />
  );
}
