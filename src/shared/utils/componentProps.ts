import { ElementType, HTMLProps } from "react";
import { Merge } from "type-fest";
import { Assign, HTMLStyledProps, OmittedHTMLProps } from "../../../styled-system/types";

export type SanitizePropsBase<HTMLElemeType, Props extends Record<string, any>> = Assign<
  Omit<HTMLProps<HTMLElemeType>, OmittedHTMLProps | "title">,
  Props
>;

/**
 * Base type for component props that merge HTML element props with custom props.
 * - Add `css` prop support.
 * - Omit common HTML attributes that are usually managed by design system props.
 * - Use `Merge` to combine HTML props with custom props, allowing custom props to override HTML props.
 */
export type ComponentPropsBase<T extends ElementType, Props> = Merge<
  Omit<HTMLStyledProps<T>, "title" | "color" | "translate" | "transition" | "width" | "height" | "content">,
  Props
>;
