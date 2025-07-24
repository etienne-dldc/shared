import { defineConfig } from "@pandacss/dev";
import { dldcPreset } from "./panda/preset";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: "react",
  presets: [dldcPreset],
});
