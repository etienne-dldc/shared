import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignButtonHeight, TDesignVariant } from "../core/DesignContext";

export const buttonLikeClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
          borderWidth: "0_x",
        },
      },
      subtle: { bg: "white/5", color: "colorPalette.200" },
      ghost: { color: "colorPalette.200" },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    height: {
      "2x": { rounded: "0x" },
      "3": { rounded: "0x" },
      "3x": { rounded: "0x" },
      "4": { rounded: "1_x" },
      "4x": { rounded: "1_x" },
      "5": { rounded: "1_x" },
      "5x": { rounded: "1_x" },
      "6": { rounded: "1_x" },
      "6x": { rounded: "1_x" },
      "7": { rounded: "1_x" },
      "7x": { rounded: "1_x" },
      "8": { rounded: "1_x" },
      "9": { rounded: "1_x" },
      "10": { rounded: "1_x" },
      "12": { rounded: "1_x" },
    } satisfies Record<TDesignButtonHeight, SystemStyleObject>,
  },
});

export const buttonClass = cva({
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
    } satisfies Record<TDesignVariant, SystemStyleObject>,
    hoverVariant: {
      solid: {
        _hover: {
          bg: "colorPalette.500",
          color: "neutral.100",
          _after: {
            borderColor: "transparent",
          },
          _focusVisible: {
            _after: {
              borderColor: "neutral.200",
            },
          },
        },
      },
      surface: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          _after: {
            borderColor: "colorPalette.700",
            borderWidth: "0_x",
          },
        },
      },
      subtle: {
        _hover: {
          bg: "white/10",
          color: "colorPalette.100",
          _after: {
            borderColor: "transparent",
          },
          _focusVisible: {
            _after: {
              borderColor: "neutral.200",
            },
          },
        },
      },
      ghost: {
        _hover: { bg: "white/5", color: "colorPalette.100" },
      },
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});

export const buttonGroupClass = cva({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
        _firstChild: {
          borderEndRadius: "0",
          _focusVisible: { _after: { right: "-0_x" } },
          _hover: { _after: { right: "-0_x" } },
        },
        _betweenChild: {
          rounded: "0",
          _focusVisible: { _after: { left: "-0_x", right: "-0_x" } },
          _hover: { _after: { left: "-0_x", right: "-0_x" } },
        },
        _lastChild: {
          borderStartRadius: "0",
          _focusVisible: { _after: { left: "-0_x" } },
          _hover: { _after: { left: "-0_x" } },
        },
      },
      vertical: {
        flexDirection: "column",
        _firstChild: {
          borderBottomRadius: "0",
          _focusVisible: { _after: { bottom: "-0_x" } },
          _hover: { _after: { bottom: "-0_x" } },
        },
        _betweenChild: {
          rounded: "0",
          _focusVisible: { _after: { top: "-0_x", bottom: "-0_x" } },
          _hover: { _after: { top: "-0_x", bottom: "-0_x" } },
        },
        _lastChild: {
          borderTopRadius: "0",
          _focusVisible: { _after: { top: "-0_x" } },
          _hover: { _after: { top: "-0_x" } },
        },
      },
    },
    variant: {
      solid: {},
      surface: {},
      subtle: {},
      ghost: {},
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
  compoundVariants: [
    {
      direction: "horizontal",
      variant: "surface",
      css: {
        _firstChild: {
          _after: { borderRightWidth: "0" },
          _focusVisible: { _after: { borderRightWidth: "0_x" } },
          _hover: { _after: { borderRightWidth: "0_x" } },
        },
        _betweenChild: {
          _after: { borderXWidth: "0" },
          _focusVisible: { _after: { borderXWidth: "0_x" } },
          _hover: { _after: { borderXWidth: "0_x" } },
        },
        _lastChild: {
          _after: { borderLeftWidth: "0" },
          _focusVisible: { _after: { borderLeftWidth: "0_x" } },
          _hover: { _after: { borderLeftWidth: "0_x" } },
        },
      },
    },
    {
      direction: "vertical",
      variant: "surface",
      css: {
        _firstChild: {
          _after: { borderBottomWidth: "0" },
          _focusVisible: { _after: { borderBottomWidth: "0_x" } },
          _hover: { _after: { borderBottomWidth: "0_x" } },
        },
        _betweenChild: {
          _after: { borderYWidth: "0" },
          _focusVisible: { _after: { borderYWidth: "0_x" } },
          _hover: { _after: { borderYWidth: "0_x" } },
        },
        _lastChild: {
          _after: { borderTopWidth: "0" },
          _focusVisible: { _after: { borderTopWidth: "0_x" } },
          _hover: { _after: { borderTopWidth: "0_x" } },
        },
      },
    },
  ],
});

export const separatorClass = cva({
  base: {
    alignSelf: "stretch",
  },
  variants: {
    direction: {
      horizontal: { w: "0_x" },
      vertical: { h: "0_x" },
    },
    variant: {
      solid: { bg: "colorPalette.700" },
      surface: { bg: "neutral.800" },
      subtle: {},
      ghost: {},
    } satisfies Record<TDesignVariant, SystemStyleObject>,
  },
});
