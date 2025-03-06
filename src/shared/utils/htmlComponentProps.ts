import { ComponentPropsWithRef, ElementType } from "react";
import { Merge } from "type-fest";

export type HtmlComponentProps<T extends ElementType, Props> = Merge<ComponentPropsWithRef<T>, Props>;
