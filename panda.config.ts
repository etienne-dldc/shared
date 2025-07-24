import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { globalCss } from "./panda/globalCss";
import { globalVars } from "./panda/globalVars";
import { patterns } from "./panda/patterns";
import { textStyles } from "./panda/textStyles";
import { tokens } from "./panda/tokens";
import { utilities } from "./panda/utilities";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: "react",
  presets: [],
  globalCss,
  globalVars,
  theme: {
    extend: {
      ...pandaPreset.theme,
      tokens,
      textStyles,
    },
  },
  utilities: {
    extend: utilities,
  },
  patterns: {
    extend: patterns,
  },
  conditions: {
    extend: {
      activeItem: "&[data-active-item]",
      disabled: "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
      roundedStart: "&[data-rounded-start]",
      roundedEnd: "&[data-rounded-end]",
      firstChild: "& *[data-first]",
      betweenChild: "& *[data-between]",
      lastChild: "& *[data-last]",
    },
  },
});
