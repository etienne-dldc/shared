import * as Ariakit from "@ariakit/react";

import { WithCss } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { SanitizePropsBase } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TFrameContentFragmentProps } from "../frame/FrameContentFragment";

export type ButtonProps = SanitizePropsBase<
  HTMLButtonElement,
  WithCss &
    TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      type?: "button" | "submit" | "reset" | undefined;

      // Forward to Button
      render?: Ariakit.ButtonProps["render"];

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Button(inProps: ButtonProps) {
  const { type = "button", render, disabled = false, ref, ...frameProps } = inProps;

  return (
    <Ariakit.Button
      type={type}
      disabled={disabled}
      ref={ref}
      render={<Frame disabled={disabled} render={render ?? <button />} interactive {...frameProps} />}
    />
  );
}

Button.displayName = "Button";
