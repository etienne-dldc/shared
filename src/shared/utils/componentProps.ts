import { ElementType } from "react";
import { Merge } from "type-fest";
import { HTMLStyledProps } from "../../../styled-system/types";

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
