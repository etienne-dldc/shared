import { ComponentPropsWithRef, ElementType } from "react";
import { Merge } from "type-fest";

export type OmittedHTMLProps =
  | "color"
  | "translate"
  | "transition"
  | "width"
  | "height"
  | "content"
  | "title"
  | "value";

/**
 * Omit common HTML attributes that are usually managed by design system props.
 */
export type ComponentPropsBase<T extends ElementType> = Omit<ComponentPropsWithRef<T>, OmittedHTMLProps>;

/**
 * Use `Merge` to combine HTML props with custom props, allowing custom props to override HTML props.
 */
export type ComponentPropsBaseWith<T extends ElementType, Props> = Merge<ComponentPropsBase<T>, Props>;
