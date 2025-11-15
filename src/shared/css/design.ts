import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  designContentSizeClass,
  designContentSizeVar,
  designHeightClass,
  designHeightVar,
  designRoundedClass,
  designRoundedVar,
} from "./design.css";
import { sizeToRemString } from "./utils";

export function heightStyles(height: number): [classNames: string, styles: React.CSSProperties] {
  return [designHeightClass, assignInlineVars({ [designHeightVar]: sizeToRemString(height) })];
}

export function roundedStyles(rounded: number): [classNames: string, styles: React.CSSProperties] {
  return [designRoundedClass, assignInlineVars({ [designRoundedVar]: sizeToRemString(rounded) })];
}

export function contentSize(height: number): [classNames: string, styles: React.CSSProperties] {
  return [designContentSizeClass, assignInlineVars({ [designContentSizeVar]: sizeToRemString(height) })];
}
