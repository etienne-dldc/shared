/* eslint-disable react-refresh/only-export-components */
import { createPropsContext } from "../../utils/propsContext";

// null = infer value from other props
export type TDesignSize = "xs" | "sm" | "md" | "lg";
export type TDesignDirSize = TDesignSize | null;
export type TDesignPrimary = boolean;
export type TDesignFilled = boolean;
export type TDesignHoverFilled = boolean | null;
export type TDesignRounded = "left" | "right" | "top" | "bottom" | "none" | "all";

export interface TDesignContextProps {
  size: TDesignSize;
  xSize: TDesignDirSize;
  ySize: TDesignDirSize;
  primary: TDesignPrimary;
  filled: TDesignFilled;
  rounded: TDesignRounded;
  hoverFilled: TDesignHoverFilled;
}

export const DesignContext = createPropsContext(
  "Design",
  {
    size: "md",
    xSize: null,
    ySize: null,
    primary: false,
    filled: true,
    hoverFilled: null,
    rounded: "all",
  } as TDesignContextProps,
  (parent, props) => ({ ...parent, ...props }),
);

export function resolveDesignProps(props: TDesignContextProps) {
  const { filled, primary, size, xSize, ySize, hoverFilled, rounded } = props;

  return {
    filled,
    primary,
    size,
    xSize: xSize ?? size,
    ySize: ySize ?? size,
    hoverFilled: hoverFilled ?? primary,
    rounded,
  };
}
