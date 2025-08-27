import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: "react",
  presets: ["@dldc/panda-preset"],
  globalCss: {
    extend: {
      html: {
        bg: "neutral.950",
      },
    },
  },
});
