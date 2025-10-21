import { cva } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { TDesignVariant } from "./types";

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
          _before: { borderEndWidth: "0" },
          _after: { right: "-0_x" },
          _hover: { _before: { borderEndWidth: "0" } },
        },
        _betweenChild: {
          rounded: "0",
          _before: { borderXWidth: "0" },
          _after: { insetInline: "-0_x" },
          _hover: { _before: { borderXWidth: "0" } },
        },
        _lastChild: {
          borderStartRadius: "0",
          _before: { borderStartWidth: "0" },
          _after: { left: "-0_x" },
          _hover: { _before: { borderStartWidth: "0" } },
        },
      },
      vertical: {
        flexDirection: "column",
        _firstChild: {
          borderBottomRadius: "0",
          _before: { borderBottomWidth: "0" },
          _hover: { _before: { borderBottomWidth: "0" } },
        },
        _betweenChild: {
          rounded: "0",
          _before: { borderYWidth: "0" },
          _hover: { _before: { borderYWidth: "0" } },
        },
        _lastChild: {
          borderTopRadius: "0",
          _before: { borderTopWidth: "0" },
          _hover: { _before: { borderTopWidth: "0" } },
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
