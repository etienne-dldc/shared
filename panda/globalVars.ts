import { Config } from "@pandacss/dev";

export const designHeightVar = "--design-height";
export const designRoundedVar = "--design-rounded";
export const contentSizeVar = "--content-size";
export const spacingGapVar = "--spacing-gap";
export const heightPowerVar = "--height-power";

export const globalVars = {
  [designHeightVar]: {
    initialValue: "var(--sizes-7)",
    inherits: false,
    syntax: "<length>",
  },
  [designRoundedVar]: {
    initialValue: "var(--sizes-1)",
    inherits: false,
    syntax: "<length>",
  },
  [contentSizeVar]: {
    initialValue: "var(--sizes-4)",
    inherits: false,
    syntax: "<length>",
  },
  [spacingGapVar]: {
    initialValue: "var(--sizes-1x)",
    inherits: false,
    syntax: "<length>",
  },
  [heightPowerVar]: {
    initialValue: "0.68",
    inherits: true,
    syntax: "<number>",
  },

  // From ariakit
  "--popover-anchor-width": "0",
  "--popover-available-width": "100vw",
  "--popover-available-height": "100vh",
} satisfies Config["globalVars"];
