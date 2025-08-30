import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { Frame } from "../frame/Frame";
import { TItemContentFragmentProps } from "../item-content/types";

export type ButtonLikeProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height" | "color" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Element
      render?: Ariakit.RoleProps["render"];
    }
>;

export function ButtonLike(inProps: ButtonLikeProps) {
  return <Ariakit.Role render={<Frame {...(inProps as any)} />} />;
}
