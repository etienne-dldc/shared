import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass, contentSize, heightStyles, roundedStyles } from "../../design/styles";
import { TDesignVariant, TPaletteColor } from "../../design/types";

export const frameBaseClass = cva({
  base: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "start",
    outline: "none",
    position: "relative",
    "& [data-item-main-icon]": {
      opacity: 0.6,
    },
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
        _after: {
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
        _after: {
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
    },
    _focusVisible: {
      _after: {
        borderColor: "neutral.300",
        borderWidth: "0_x",
      },
    },
  },
  variants: {
    variant: {
      solid: {
        _focusVisible: {
          bg: "colorPalette.800",
          _after: {
            borderColor: "neutral.200",
            borderWidth: "0x",
          },
        },
        _disabled: {
          bg: "colorPalette.900",
          color: "neutral.200/60",
        },
      },
      surface: {
        _disabled: {
          color: "colorPalette.200/40",
          bg: "white/3",
          _after: {
            borderColor: "neutral.900",
          },
        },
      },
      subtle: {
        _disabled: {
          color: "colorPalette.200/40",
          bg: "white/3",
        },
      },
      ghost: {
        _disabled: {
          color: "colorPalette.200/40",
        },
      },
      input: {
        _disabled: {
          color: "colorPalette.200/40",
          bg: "black/3",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    hoverVariant: {
      solid: {
        _hover: {
          bg: "colorPalette.500",
          color: "neutral.100",
        },
      },
      surface: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
        },
      },
      subtle: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
        },
      },
      ghost: {
        _hover: {
          bg: "white/5",
          color: "colorPalette.100",
        },
      },
      input: {
        _hover: {
          bg: "black/5",
          color: "colorPalette.100",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
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
}

export function frameStyles(params: FrameStylesParams): [css: SystemStyleObject, styles: React.CSSProperties] {
  const { height, contentHeight, rounded, variant, color, interactive, hoverVariant } = params;

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
      color && colorPaletteClass.raw({ colorPalette: color }),
    ),
    {
      ...heightInline,
      ...contentInline,
      ...roundedInline,
    },
  ];
}

export const frameGroupClass = cva({
  base: {
    display: "inline-flex",
    position: "relative",
    isolation: "isolate",
    _firstChild: { zIndex: 2, position: "relative" },
    _betweenChild: { zIndex: 2, position: "relative" },
    _lastChild: { zIndex: 2, position: "relative" },
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
        _firstChild: {
          borderEndRadius: "0",
          _after: { borderEndWidth: "0" },
        },
        _betweenChild: {
          rounded: "0",
          _after: { borderXWidth: "0" },
        },
        _lastChild: {
          borderStartRadius: "0",
          _after: { borderStartWidth: "0" },
        },
      },
      vertical: {
        flexDirection: "column",
        _firstChild: {
          borderBottomRadius: "0",
          _after: { borderBottomWidth: "0" },
        },
        _betweenChild: {
          rounded: "0",
          _after: { borderYWidth: "0" },
        },
        _lastChild: {
          borderTopRadius: "0",
          _after: { borderTopWidth: "0" },
        },
      },
    },
  },
});

export const separatorClass = cva({
  base: {
    alignSelf: "stretch",
    position: "relative",
    zIndex: 1,
    _after: {
      pointerEvents: "none",
      content: "''",
      position: "absolute",
      inset: "0",
    },
  },
  variants: {
    direction: {
      horizontal: { w: "0_x" },
      vertical: { h: "0_x" },
    },
    variant: {
      solid: {
        bg: "colorPalette.700",
      },
      surface: {
        bg: "white/5",
        _after: {
          bg: "white/10",
        },
      },
      subtle: {},
      ghost: {},
      input: {
        bg: "black/15",
        _after: {
          bg: "black/30",
        },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
  compoundVariants: [
    {
      variant: "surface",
      direction: "horizontal",
      css: { w: "0__x" },
    },
    {
      variant: "surface",
      direction: "vertical",
      css: { h: "0__x" },
    },
  ],
});
