import * as Ariakit from "@ariakit/react";
import { Merge } from "type-fest";

import { css } from "../../../../styled-system/css";
import { ComponentProps, SystemStyleObject } from "../../../../styled-system/types";
import { TInteractiveState } from "../../styles/utils";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DesignContext,
  resolveDesignProps,
  TDesignCrossSize,
  TDesignMainSize,
  TDesignRounded,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ItemContent } from "../item-content/ItemContent";
import { itemContentFontSizeClass } from "../item-content/styles";
import { buttonClass } from "./styles";

export type ButtonProps = Merge<
  ComponentProps<"button">,
  {
    // Design
    disabled?: boolean;
    crossSize?: TDesignCrossSize;
    mainSize?: TDesignMainSize;
    rounded?: TDesignRounded;
    // size?: TDesignSize;
    // xSize?: TDesignDirSize;
    // ySize?: TDesignDirSize;
    // filled?: TDesignFilled;
    // primary?: TDesignPrimary;
    // hoverFilled?: TDesignHoverFilled;
    css?: SystemStyleObject;

    color?: TDynamicColor;
    __forceState?: null | TInteractiveState;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    content?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;

    // Forward to Button
    render?: React.ReactElement<any>;
  }
>;

export function Button(inProps: ButtonProps) {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });
  const { contentSize, crossSize } = resolveDesignProps(design);

  const {
    color,
    css: cssProp,
    __forceState,

    content,
    icon,
    endIcon,
    endAction,
    details,
    loading,
    children,

    className,
    type = "button",
    ref,
    ...buttonProps
  } = props;

  const childrenResolved = children ?? (
    <ItemContent {...{ icon, endIcon, endAction, details, loading }}>{content}</ItemContent>
  );

  const forceHover = __forceState === "hover";
  const forceActive = __forceState === "active";
  const forceFocus = __forceState === "focus";

  return (
    <DesignContext.Define crossSize={inProps.crossSize} mainSize={inProps.mainSize}>
      <DynamicColorProvider color={color}>
        <Ariakit.Button
          ref={ref}
          className={css(
            buttonClass.raw({ crossSize }),
            itemContentFontSizeClass.raw({ contentSize, crossSize }),
            cssProp,
          )}
          disabled={disabled.disabled}
          type={type}
          {...(forceFocus ? { "data-focus-visible": true } : {})}
          {...buttonProps}
        >
          {childrenResolved}
        </Ariakit.Button>
      </DynamicColorProvider>
    </DesignContext.Define>
  );
}
