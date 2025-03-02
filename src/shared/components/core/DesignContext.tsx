import { createPropsContext } from "../../utils/propsContext";

export type TDesignSize = "xs" | "sm" | "md" | "lg";
export type TDesignPriority = "base" | "primary";
export type TDesignVariant = "filled" | "transparent";
export type TDesignRounded = "left" | "right" | "top" | "bottom" | "none" | "all";

export interface DesignContextProps {
  size: TDesignSize;
  priority: TDesignPriority;
  variant: TDesignVariant;
  rounded: TDesignRounded;
  disabled: boolean;
}

export const DesignContext = createPropsContext<DesignContextProps>("Design", {
  size: "md",
  priority: "base",
  variant: "filled",
  rounded: "all",
  disabled: false,
});
