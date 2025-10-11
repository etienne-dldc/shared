import * as Ariakit from "@ariakit/react";

import { TDesignProps, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TFrameContentFragmentProps } from "../frame/FrameContentFragment";

export type ButtonProps = ComponentPropsBase<
  "button",
  TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;

      // Forward to Button
      render?: Ariakit.ButtonProps["render"];

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Button(inProps: ButtonProps) {
  const { type = "button", render, ...frameProps } = inProps;

  return (
    <Ariakit.Button type={type} render={<Frame render={render ?? <button />} />} interactive {...(frameProps as any)} />
  );
}
