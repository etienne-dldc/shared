import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { Frame } from "../frame/Frame";
import { TItemContentFragmentProps } from "../item-content/types";

export type ButtonProps = Merge<
  Omit<ComponentProps<"button">, "title" | "height" | "color" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Button
      render?: Ariakit.ButtonProps["render"];

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Button(inProps: ButtonProps) {
  const { type = "button", ...frameProps } = inProps;

  return <Ariakit.Button type={type} render={<Frame render={<button />} />} interactive {...(frameProps as any)} />;
}
