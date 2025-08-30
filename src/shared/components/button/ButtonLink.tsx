import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { Frame } from "../frame/Frame";
import { TItemContentFragmentProps } from "../item-content/types";

export type ButtonLinkProps = Merge<
  Omit<ComponentProps<"a">, "title" | "height" | "color" | "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      css?: SystemStyleObject;

      // Forward to Button
      render?: React.ReactElement<any>;

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function ButtonLink(inProps: ButtonLinkProps) {
  const { href, ...frameProps } = inProps;

  return <Ariakit.Role href={href} render={<Frame render={<a />} />} interactive {...(frameProps as any)} />;
}
