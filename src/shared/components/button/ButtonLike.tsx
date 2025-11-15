import * as Ariakit from "@ariakit/react";

import { TDesignProps, TPaletteColor } from "../../design/types";
import { ComponentPropsBaseWith } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TFrameContentFragmentProps } from "../frame/FrameContentFragment";

export type ButtonLikeProps = ComponentPropsBaseWith<
  "div",
  TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];
    }
>;

export function ButtonLike(inProps: ButtonLikeProps) {
  return <Ariakit.Role render={<Frame {...(inProps as any)} />} />;
}

ButtonLike.displayName = "ButtonLike";
