import {
  defineConfig,
  defineGlobalStyles,
  definePattern,
  defineTextStyles,
  defineUtility,
  Tokens,
} from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";

const spacing = {
  "0": { value: "0rem" },
  "0_x": { value: "0.0625rem" }, // 1px
  "0x": { value: "0.125rem" }, // 2px
  "0xx": { value: "0.1875rem" }, // 3px
  "1": { value: "0.25rem" }, // 4px
  "1_x": { value: "0.3125rem" }, // 5px
  "1x": { value: "0.375rem" }, // 6px
  "1xx": { value: "0.4375rem" }, // 7px
  "2": { value: "0.5rem" }, // 8px
  "2_x": { value: "0.5625rem" }, // 9px
  "2x": { value: "0.625rem" }, // 10px
  "3": { value: "0.75rem" }, // 12px
  "3x": { value: "0.875rem" }, // 14px
  "4": { value: "1rem" }, // 16px
  "4x": { value: "1.125rem" }, // 18px
  "5": { value: "1.25rem" }, // 20px
  "5x": { value: "1.375rem" }, // 22px
  "6": { value: "1.5rem" }, // 24px
  "6x": { value: "1.625rem" }, // 26px
  "7": { value: "1.75rem" }, // 28px
  "7x": { value: "1.875rem" }, // 30px
  "8": { value: "2rem" }, // 32px
  "9": { value: "2.25rem" }, // 36px
  "10": { value: "2.5rem" }, // 40px
  "11": { value: "2.75rem" }, // 44px
  "12": { value: "3rem" }, // 48px
  "13": { value: "3.25rem" }, // 52px
  "14": { value: "3.5rem" }, // 56px
  "15": { value: "3.75rem" }, // 60px
  "16": { value: "4rem" }, // 64px
  "18": { value: "4.5rem" }, // 72px
  "20": { value: "5rem" }, // 80px
  "24": { value: "6rem" }, // 96px
  "28": { value: "7rem" },
  "32": { value: "8rem" },
  "36": { value: "9rem" },
  "40": { value: "10rem" },
  "44": { value: "11rem" },
  "48": { value: "12rem" },
  "52": { value: "13rem" },
  "56": { value: "14rem" },
  "60": { value: "15rem" },
  "64": { value: "16rem" },
  "72": { value: "18rem" },
  "80": { value: "20rem" },
  "96": { value: "24rem" },
} satisfies Tokens["spacing"];

const sizes = {
  "0": { value: "0rem" },
  "0_x": { value: "0.0625rem" }, // 1px
  "0x": { value: "0.125rem" }, // 2px
  "0xx": { value: "0.1875rem" }, // 3px
  "1": { value: "0.25rem" }, // 4px
  "1_x": { value: "0.3125rem" }, // 5px
  "1x": { value: "0.375rem" }, // 6px
  "1xx": { value: "0.4375rem" }, // 7px
  "2": { value: "0.5rem" }, // 8px
  "2_x": { value: "0.5625rem" }, // 9px
  "2x": { value: "0.625rem" }, // 10px
  "3": { value: "0.75rem" }, // 12px
  "3x": { value: "0.875rem" }, // 14px
  "4": { value: "1rem" }, // 16px
  "4x": { value: "1.125rem" },
  "5": { value: "1.25rem" },
  "6": { value: "1.5rem" },
  "7": { value: "1.75rem" },
  "8": { value: "2rem" },
  "9": { value: "2.25rem" },
  "10": { value: "2.5rem" },
  "11": { value: "2.75rem" },
  "12": { value: "3rem" },
  "14": { value: "3.5rem" },
  "16": { value: "4rem" },
  "20": { value: "5rem" },
  "24": { value: "6rem" },
  "28": { value: "7rem" },
  "32": { value: "8rem" },
  "36": { value: "9rem" },
  "40": { value: "10rem" },
  "44": { value: "11rem" },
  "48": { value: "12rem" },
  "52": { value: "13rem" },
  "56": { value: "14rem" },
  "60": { value: "15rem" },
  "64": { value: "16rem" },
  "72": { value: "18rem" },
  "80": { value: "20rem" },
  "96": { value: "24rem" },

  // xs: { value: '20rem' },
  // sm: { value: '24rem' },
  // md: { value: '28rem' },
  // lg: { value: '32rem' },
  // xl: { value: '36rem' },
  // '2xl': { value: '42rem' },
  // '3xl': { value: '48rem' },
  // '4xl': { value: '56rem' },
  // '5xl': { value: '64rem' },
  // '6xl': { value: '72rem' },
  // '7xl': { value: '80rem' },
  // '8xl': { value: '90rem' },

  prose: { value: "65ch" },
  full: { value: "100%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
} satisfies Tokens["sizes"];

const radii = {
  "1_x": { value: "0.3125rem" }, // 5px
  "2": { value: "0.5rem" }, // 8px
  // xs: { value: '0.125rem' },
  // sm: { value: '0.25rem' },
  // md: { value: '0.375rem' },
  // lg: { value: '0.5rem' },
  // xl: { value: '0.75rem' },
  // '2xl': { value: '1rem' },
  // '3xl': { value: '1.5rem' },
  // '4xl': { value: '2rem' },
  full: { value: "9999px" },
} as Tokens["radii"];

const textStyles = defineTextStyles({
  // Based on line height size
  // const fontSizeRem = lineHeightRem - 0.56 * Math.exp(-Math.pow(1.76 - lineHeightRem, 2) / Math.pow(0.8, 2));
  // const fontSizeRemRounded = Math.round(fontSizeRem * 16) / 16; // Round to 2px
  "2x": { value: { lineHeight: "0.625rem", fontSize: "0.5rem" } },
  "3": { value: { lineHeight: "0.75rem", fontSize: "0.625rem" } },
  "3x": { value: { lineHeight: "0.875rem", fontSize: "0.75rem" } },
  "4": { value: { lineHeight: "1rem", fontSize: "0.75rem" } },
  "4x": { value: { lineHeight: "1.125rem", fontSize: "0.875rem" } },
  "5": { value: { lineHeight: "1.25rem", fontSize: "0.875rem" } },
  "5x": { value: { lineHeight: "1.375rem", fontSize: "0.875rem" } },
  "6": { value: { lineHeight: "1.5rem", fontSize: "1rem" } },
  "6x": { value: { lineHeight: "1.625rem", fontSize: "1.125rem" } },
  "7": { value: { lineHeight: "1.75rem", fontSize: "1.25rem" } },
  "7x": { value: { lineHeight: "1.875rem", fontSize: "1.375rem" } },
  "8": { value: { lineHeight: "2rem", fontSize: "1.5rem" } },
  "9": { value: { lineHeight: "2.25rem", fontSize: "1.875rem" } },
  "10": { value: { lineHeight: "2.5rem", fontSize: "2.25rem" } },
  "11": { value: { lineHeight: "2.75rem", fontSize: "2.625rem" } },
  "12": { value: { lineHeight: "3rem", fontSize: "3rem" } },
  "13": { value: { lineHeight: "3.25rem", fontSize: "3.25rem" } },
  "14": { value: { lineHeight: "3.5rem", fontSize: "3.5rem" } },
  "15": { value: { lineHeight: "3.75rem", fontSize: "3.75rem" } },
  "16": { value: { lineHeight: "4rem", fontSize: "4rem" } },
  "18": { value: { lineHeight: "4.5rem", fontSize: "4.5rem" } },
  "20": { value: { lineHeight: "5rem", fontSize: "5rem" } },
  "24": { value: { lineHeight: "6rem", fontSize: "6rem" } },
  "28": { value: { lineHeight: "7rem", fontSize: "7rem" } },
  "32": { value: { lineHeight: "8rem", fontSize: "8rem" } },
  // Based on font size (isch)
  // The actual font size is 1 size under and lineHeight = name height
  f2x: { value: { fontSize: "0.5rem", lineHeight: "0.625rem" } },
  f3: { value: { fontSize: "0.625rem", lineHeight: "0.75rem" } },
  f3x: { value: { fontSize: "0.75rem", lineHeight: "0.875rem" } },
  f4: { value: { fontSize: "0.875rem", lineHeight: "1rem" } },
  f4x: { value: { fontSize: "1rem", lineHeight: "1.125rem" } },
  f5: { value: { fontSize: "1.125rem", lineHeight: "1.25rem" } },
  f5x: { value: { fontSize: "1.25rem", lineHeight: "1.375rem" } },
  f6: { value: { fontSize: "1.375rem", lineHeight: "1.5rem" } },
  f6x: { value: { fontSize: "1.5rem", lineHeight: "1.625rem" } },
  f7: { value: { fontSize: "1.625rem", lineHeight: "1.75rem" } },
  f7x: { value: { fontSize: "1.75rem", lineHeight: "1.875rem" } },
  f8: { value: { fontSize: "1.875rem", lineHeight: "2rem" } },
  f9: { value: { fontSize: "2rem", lineHeight: "2.25rem" } },
  f10: { value: { fontSize: "2.25rem", lineHeight: "2.5rem" } },
  f12: { value: { fontSize: "2.5rem", lineHeight: "3rem" } },
});

const borders = {
  ...pandaPreset.theme.tokens.borders,
  // surface: { value: "1px solid" },
} satisfies Tokens["borders"];

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

// h-full bg-zinc-950 [color-scheme:dark]
const globalCss = defineGlobalStyles({
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

const insetRingWidthVar = "--inset-ring-width";
const insetRingColorVar = "--inset-ring-color";
const insetRingColorMixVar = "--inset-ring-color-mix";
const insetRingBoxShadow = `inset 0 0 0 var(${insetRingWidthVar}, 1px) var(${insetRingColorVar}, white)`;

const insetRing = {
  insetRing: defineUtility({
    className: "ir",
    values: ["none", "solid"],
    property: "boxShadow",
    transform: (value) => {
      if (value === "none") {
        return { boxShadow: "none" };
      }
      if (value === "solid") {
        return {
          boxShadow: insetRingBoxShadow,
        };
      }
      return undefined;
    },
  }),
  insetRingColor: defineUtility({
    className: "ir",
    values: "colors",
    property: "boxShadow",
    transform: (value, args) => {
      const mix = args.utils.colorMix(value);
      if (mix.invalid) {
        return {
          [insetRingColorVar]: value,
        };
      }
      return {
        [insetRingColorMixVar]: mix.value,
        [insetRingColorVar]: `var(${insetRingColorMixVar}, ${mix.color})`,
      };
    },
  }),
  insetRingWidth: defineUtility({
    className: "irw",
    values: "borderWidths",
    property: "boxShadow",
    transform: (value) => {
      return {
        [insetRingWidthVar]: value,
      };
    },
  }),
};

const ellipsis = definePattern({
  description: "Text ellipsis",
  jsxElement: "span",
  properties: {},
  defaultValues: {},
  transform(props) {
    const { truncate, ...rest } = props;
    return {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      ...rest,
    };
  },
});

const paper = definePattern({
  description: "Paper component",
  jsxElement: "div",
  properties: {
    level: {
      type: "enum",
      value: ["select", "modal"],
    },
  },
  transform(props) {
    const { level = "modal", ...rest } = props;
    switch (level) {
      case "select":
        return {
          overflow: "hidden",
          background: "neutral.900",
          borderColor: "neutral.800",
          borderRadius: "2",
          borderWidth: "0_x",
          boxShadow: "md",
          ...rest,
        };
      case "modal":
        return {
          overflow: "hidden",
          background: "neutral.950",
          borderColor: "neutral.900",
          borderRadius: "2",
          borderWidth: "0_x",
          boxShadow: "xl",
          ...rest,
        };
      default:
        return rest;
    }
  },
});

const colors = {
  ...pandaPreset.theme.tokens.colors,
  neutral: {
    ...pandaPreset.theme.tokens.colors.neutral,
    "925": { value: "#101010" },
  },
} satisfies Tokens["colors"];

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
  theme: {
    extend: {
      ...pandaPreset.theme,
      tokens: {
        ...pandaPreset.theme.tokens,
        spacing,
        sizes,
        radii,
        borders,
        shadows,
        borderWidths,
        colors,
      },
      textStyles,
    },
  },
  utilities: {
    extend: {
      ...insetRing,
    },
  },
  patterns: {
    extend: {
      ellipsis,
      paper,
    },
  },
  conditions: {
    extend: {
      activeItem: "&[data-active-item]",
      disabled: "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
    },
  },
});
