import { assignInlineVars } from "@vanilla-extract/dynamic";
import { designContentSizeVar } from "./design.css";
import { iconClass } from "./icons.css";
import { TDesignHeight } from "./types";
import { sizeToRemString } from "./utils";

export function iconStyles(size: TDesignHeight | undefined): [classNames: string, styles: React.CSSProperties] {
  return [
    iconClass,
    assignInlineVars({
      [designContentSizeVar]: size ? sizeToRemString(size) : undefined,
    }),
  ];
}
