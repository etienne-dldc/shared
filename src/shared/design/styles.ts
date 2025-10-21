import { css } from "../../../styled-system/css";
import { SystemStyleObject } from "../../../styled-system/types";
import { sizeToRemString } from "./utils";

export function heightStyles(height: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [css.raw({ minH: "var(--design-height)" }), { ["--design-height" as string]: sizeToRemString(height) }];
}

export function roundedStyles(rounded: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [
    css.raw({ borderRadius: "var(--design-rounded)" }),
    { ["--design-rounded" as string]: sizeToRemString(rounded) },
  ];
}

export function contentSize(height: number): [css: SystemStyleObject, styles: React.CSSProperties] {
  return [css.raw({ textStyle: "dynamic" }), { ["--content-size" as string]: sizeToRemString(height) }];
}
