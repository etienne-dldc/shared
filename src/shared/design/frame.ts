import { css, cva } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { colorPaletteClass } from "./colors";
import { contentSize, heightStyles, roundedStyles } from "./styles";
import { TDesignVariant, TPaletteColor } from "./types";

export const frameBaseClass = cva({
  base: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    outline: "none",
    position: "relative",
    "& [data-item-main-icon]": {
      opacity: 0.6,
    },
    // Used for visual border for input and surface variants
    _before: {
      rounded: "[inherit]",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: "0",
    },
    // Used for focus and highlight border
    _after: {
      rounded: "[inherit]",
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: "0",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "colorPalette.600",
        color: "neutral.200",
      },
      surface: {
        bg: "white/5",
        color: "colorPalette.200",
        _before: {
          borderColor: "white/10",
          borderWidth: "0__x",
        },
      },
      subtle: {
        bg: "white/5",
        color: "colorPalette.200",
      },
      ghost: {
        color: "colorPalette.200",
      },
      input: {
        bg: "black/15",
        color: "colorPalette.200",
        _before: {
          borderColor: "black/30",
          borderWidth: "0_x",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});

export const frameInteractiveClass = cva({
  base: {
    _hover: {
      "& [data-item-main-icon]": {
        opacity: 1,
      },
      _disabled: {
        "& [data-item-main-icon]": {
          opacity: 0.6,
        },
      },
    },
    _focusWithin: {
      "& [data-item-main-icon]": {
        opacity: 1,
      },
    },
    _focusVisible: {
      _after: {
        borderColor: "neutral.300",
        borderWidth: "0_x",
      },
    },
  },
  variants: {
    // Hover styles based on hoverVariant
    // Also apply hover style on focusWithin for input-like variants
    // Focus styles extends hover styles hence is also defined here
    hoverVariant: {
      solid: {
        _hover: {
          bg: "colorPalette.500",
          color: "neutral.100",
          _before: { borderWidth: "0" },
        },
        _focusWithin: {
          bg: "colorPalette.500",
          color: "neutral.100",
          _before: { borderWidth: "0" },
        },
        // Special focus style for solid variant
        _focusVisible: {
          bg: "colorPalette.700",
          color: "neutral.100",
          _after: {
            borderColor: "neutral.200",
            borderWidth: "0x",
          },
        },
      },
      surface: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          _before: {
            borderColor: "white/10",
            borderWidth: "0__x",
          },
        },
        _focusWithin: {
          bg: "white/10",
          color: "colorPalette.100",
          _before: {
            borderColor: "white/10",
            borderWidth: "0__x",
          },
        },
      },
      subtle: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          _before: { borderWidth: "0" },
        },
        _focusWithin: {
          bg: "white/10",
          color: "colorPalette.100",
          _before: { borderWidth: "0" },
        },
      },
      ghost: {
        _hover: {
          bg: "white/5",
          color: "colorPalette.100",
          _before: { borderWidth: "0" },
        },
        _focusWithin: {
          bg: "white/5",
          color: "colorPalette.100",
          _before: { borderWidth: "0" },
        },
      },
      input: {
        _hover: {
          bg: "black/5",
          color: "colorPalette.100",
          _before: {
            borderColor: "black/30",
            borderWidth: "0_x",
          },
        },
        _focusWithin: {
          bg: "black/5",
          color: "colorPalette.100",
          _before: {
            borderColor: "black/30",
            borderWidth: "0_x",
          },
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,

    // Disabled styles based on variant
    variant: {
      solid: {
        _disabledHover: {
          bg: "colorPalette.800",
          color: "neutral.200/60",
        },
      },
      surface: {
        _disabledHover: {
          color: "colorPalette.200/40",
          bg: "white/3",
        },
      },
      subtle: {
        _disabledHover: {
          color: "colorPalette.200/40",
          bg: "white/3",
        },
      },
      ghost: {
        _disabledHover: {
          color: "colorPalette.200/40",
          bg: "transparent",
        },
      },
      input: {
        _disabledHover: {
          color: "colorPalette.200/40",
          bg: "black/3",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});

export const frameHighlightClass = cva({
  base: {
    _after: {
      borderWidth: "0x",
    },
  },
  variants: {
    highlightColor: {
      red: { _after: { borderColor: "red.600" } },
      orange: { _after: { borderColor: "orange.600" } },
      amber: { _after: { borderColor: "amber.600" } },
      yellow: { _after: { borderColor: "yellow.600" } },
      lime: { _after: { borderColor: "lime.600" } },
      green: { _after: { borderColor: "green.600" } },
      emerald: { _after: { borderColor: "emerald.600" } },
      teal: { _after: { borderColor: "teal.600" } },
      cyan: { _after: { borderColor: "cyan.600" } },
      sky: { _after: { borderColor: "sky.600" } },
      blue: { _after: { borderColor: "blue.600" } },
      indigo: { _after: { borderColor: "indigo.600" } },
      violet: { _after: { borderColor: "violet.600" } },
      purple: { _after: { borderColor: "purple.600" } },
      fuchsia: { _after: { borderColor: "fuchsia.600" } },
      pink: { _after: { borderColor: "pink.600" } },
      rose: { _after: { borderColor: "rose.600" } },

      gray: { _after: { borderColor: "gray.600" } },
      slate: { _after: { borderColor: "slate.600" } },
      neutral: { _after: { borderColor: "neutral.600" } },
      stone: { _after: { borderColor: "stone.600" } },
      zinc: { _after: { borderColor: "zinc.600" } },
    } satisfies Record<TPaletteColor, SystemStyleObject>,
  },
});

interface FrameStylesParams {
  height: number;
  contentHeight: number;
  rounded: number;
  variant: TDesignVariant;
  color: TPaletteColor | undefined;
  hoverVariant: TDesignVariant;
  interactive: boolean;
  highlightColor: TPaletteColor;
  highlighted: boolean;
}

export function frameStyles(params: FrameStylesParams): [css: SystemStyleObject, styles: React.CSSProperties] {
  const { height, contentHeight, rounded, variant, color, interactive, hoverVariant, highlightColor, highlighted } =
    params;

  const [heightCss, heightInline] = heightStyles(height);
  const [roundedCss, roundedInline] = roundedStyles(rounded);
  const [contentCss, contentInline] = contentSize(contentHeight);

  return [
    css.raw(
      heightCss,
      frameBaseClass.raw({ variant }),
      interactive && frameInteractiveClass.raw({ hoverVariant, variant }),
      contentCss,
      roundedCss,
      color && colorPaletteClass[color],
      highlighted && frameHighlightClass.raw({ highlightColor }),
    ),
    {
      ...heightInline,
      ...contentInline,
      ...roundedInline,
    },
  ];
}
