import { cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignCrossSize } from "../core/DesignContext";

export const buttonClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    bg: "slate.700",
    color: "white",
    rounded: "1_x",
  },
  variants: {
    crossSize: {
      "2x": { minH: "2x", textStyle: "f2x" },
      "3": { minH: "3", textStyle: "f3" },
      "3x": { minH: "3x", textStyle: "f3x" },
      "4": { minH: "4", textStyle: "f4" },
      "4x": { minH: "4x", textStyle: "f4x" },
      "5": { minH: "5", textStyle: "f5" },
      "6": { minH: "6", textStyle: "f6" },
      "7": { minH: "7", textStyle: "f7" },
      "8": { minH: "8", textStyle: "f8" },
      "10": { minH: "10", textStyle: "f10" },
      "12": { minH: "12", textStyle: "f12" },
    } satisfies Record<TDesignCrossSize, SystemStyleObject>,
  },
});
