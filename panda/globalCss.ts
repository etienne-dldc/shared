import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  html: {
    h: "full",
    bg: "zinc.950",
    colorScheme: "dark",
    colorPalette: "neutral",
  },
  "#root": {
    minHeight: "100vh",
  },
});
