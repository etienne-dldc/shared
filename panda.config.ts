import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: "react",
  jsxStyleProps: "minimal",
  presets: ["@dldc/panda-preset"],
  globalCss: {
    extend: {
      html: {
        bg: "neutral.950",
      },
    },
  },
  conditions: {
    extend: {
      // Set both disabled and disabled:hover styles
      disabledHover:
        "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]), &:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]):is(:hover, [data-hover])",
    },
  },
});
