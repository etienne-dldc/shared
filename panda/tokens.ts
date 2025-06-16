import { Tokens } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { buildSizeTokenMap, range, serializeSize } from "./utils";

const SIZES_VALUES = [...range(0, 16 - 1, 1), ...range(16, 40 - 1, 2), ...range(40, 80, 4)];
const PX_SIZES_VALUES = [...range(80 + 1, 1024 + 1, 32)];

const spacing = {
  ...buildSizeTokenMap(SIZES_VALUES, serializeSize),
} satisfies Tokens["spacing"];

const sizes = {
  ...buildSizeTokenMap(SIZES_VALUES, serializeSize),
  ...buildSizeTokenMap(PX_SIZES_VALUES, (value) => `${value}px`),

  prose: { value: "65ch" },
  full: { value: "100%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
} satisfies Tokens["sizes"];

const radii = {
  "0": { value: "0rem" },
  "0x": { value: "0.125rem" }, // 2px
  "1_x": { value: "0.3125rem" }, // 5px
  "2": { value: "0.5rem" }, // 8px

  full: { value: "9999px" },
} as Tokens["radii"];

const shadows = {
  ...pandaPreset.theme.tokens.shadows,
  // 1px inset ring
  focusRing: { value: "inset 0 0 0 1px {colors.white}" },
  surface: { value: "inset 0 0 0 1px {colors.white}" },
};

const borderWidths = {
  "0": { value: "0rem" },
  "0_x": { value: "0.0625rem" }, // 1px
  "0x": { value: "0.125rem" }, // 2px
  "0xx": { value: "0.1875rem" }, // 3px
  "1": { value: "0.25rem" }, // 4px
  "1_x": { value: "0.3125rem" }, // 5px
  "1x": { value: "0.375rem" }, // 6px
  "1xx": { value: "0.4375rem" }, // 7px
  "2": { value: "0.5rem" }, // 8px
} satisfies Tokens["borderWidths"];

const colors = {
  ...pandaPreset.theme.tokens.colors,
  neutral: {
    ...pandaPreset.theme.tokens.colors.neutral,
    "725": { value: "#3A3A3A" },
    "750": { value: "#333333" },
    "775": { value: "#2D2D2D" },
    "825": { value: "#222222" },
    "850": { value: "#1F1F1F" },
    "875": { value: "#1B1B1B" },
    "925": { value: "#101010" },
  },
} satisfies Tokens["colors"];

export const tokens = {
  ...pandaPreset.theme.tokens,
  spacing,
  sizes,
  radii,
  shadows,
  borderWidths,
  colors,
};
