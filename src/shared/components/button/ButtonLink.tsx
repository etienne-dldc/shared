import * as Ariakit from "@ariakit/react";

import { TDesignProps, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TFrameContentFragmentProps } from "../frame/FrameContentFragment";

export type ButtonLinkProps = ComponentPropsBase<
  "a",
  TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;

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

ButtonLink.displayName = "ButtonLink";
