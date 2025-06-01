import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TPaletteColor } from "../core/DesignContext";

export const colorPaletteClass = cva({
  variants: {
    colorPalette: {
      red: { colorPalette: "red" },
      orange: { colorPalette: "orange" },
      amber: { colorPalette: "amber" },
      yellow: { colorPalette: "yellow" },
      lime: { colorPalette: "lime" },
      green: { colorPalette: "green" },
      emerald: { colorPalette: "emerald" },
      teal: { colorPalette: "teal" },
      cyan: { colorPalette: "cyan" },
      sky: { colorPalette: "sky" },
      blue: { colorPalette: "blue" },
      indigo: { colorPalette: "indigo" },
      violet: { colorPalette: "violet" },
      purple: { colorPalette: "purple" },
      fuchsia: { colorPalette: "fuchsia" },
      pink: { colorPalette: "pink" },
      rose: { colorPalette: "rose" },

      gray: { colorPalette: "gray" },
      slate: { colorPalette: "slate" },
      neutral: { colorPalette: "neutral" },
      stone: { colorPalette: "stone" },
      zinc: { colorPalette: "zinc" },
    } satisfies Record<TPaletteColor, SystemStyleObject>,
  },
});
