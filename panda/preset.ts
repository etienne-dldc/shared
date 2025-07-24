import { definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { globalCss } from "./globalCss";
import { globalVars } from "./globalVars";
import { patterns } from "./patterns";
import { textStyles } from "./textStyles";
import { tokens } from "./tokens";
import { utilities } from "./utilities";

export const dldcPreset = definePreset({
  name: "dldc-preset",
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
