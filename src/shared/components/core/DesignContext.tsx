import { createPropsContext } from "../../utils/propsContext";

export type TDesignSize = "xs" | "sm" | "md" | "lg";
export type TDesignPriority = "base" | "primary";
export type TDesignVariant = "filled" | "transparent";
export type TDesignHover = "base" | "primary" | undefined;
export type TDesignRounded = "left" | "right" | "top" | "bottom" | "none" | "all";

export interface DesignContextProps {
  size: TDesignSize;
  priority: TDesignPriority;
  variant: TDesignVariant;
  rounded: TDesignRounded;
  hover: TDesignHover;
  disabled: boolean;
}

export const DesignContext = createPropsContext<DesignContextProps>("Design", {
  size: "md",
  priority: "base",
  variant: "filled",
  rounded: "all",
  hover: undefined,
  disabled: false,
});
