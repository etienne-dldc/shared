import { createPropsContext } from "../../utils/propsContext";

export type TDesignSize = "xs" | "sm" | "md" | "lg";
export type TDesignVariant = "primary" | "secondary" | "tertiary";
export type TDesignRounded = "left" | "right" | "top" | "bottom" | "none" | "all";

export interface DesignContextProps {
  size: TDesignSize;
  variant: TDesignVariant;
  rounded: TDesignRounded;
  disabled: boolean;
}

export const DesignContext = createPropsContext<DesignContextProps>("Design", {
  size: "md",
  variant: "secondary",
  rounded: "all",
  disabled: false,
});
