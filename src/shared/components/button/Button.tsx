import * as Ariakit from "@ariakit/react";
import { IconContext } from "@phosphor-icons/react";
import { ComponentProps, useMemo } from "react";
import { Merge } from "type-fest";
import { cn, TInteractiveState } from "../../styles/utils";
import { pick } from "../../utils/pick";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DesignContext,
  TDesignDirSize,
  TDesignFilled,
  TDesignHoverFilled,
  TDesignPrimary,
  TDesignRounded,
  TDesignSize,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { BUTTON_ICON_SIZE, buttonClassName } from "./styles";

export type ButtonProps = Merge<
  ComponentProps<"button">,
  {
    // Design
    disabled?: boolean;
    size?: TDesignSize;
    xSize?: TDesignDirSize;
    ySize?: TDesignDirSize;
    rounded?: TDesignRounded;
    filled?: TDesignFilled;
    primary?: TDesignPrimary;
    hoverFilled?: TDesignHoverFilled;

    color?: TDynamicColor;
    __forceState?: null | TInteractiveState;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    title?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;

    // Forward to Button
    render?: React.ReactElement<any>;
  }
>;

export const Button = (inProps: ButtonProps) => {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });

  const {
    color,
    __forceState,

    title,
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
    <ButtonContent interactive {...{ title, icon, endIcon, endAction, details, loading }} />
  );

  const forceHover = __forceState === "hover";
  const forceActive = __forceState === "active";
  const forceFocus = __forceState === "focus";

  const mainClass = useMemo(
    () => buttonClassName({ design, interactive: true, forceActive, forceHover }),
    [design, forceActive, forceHover],
  );

  const iconProps = useMemo(() => ({ size: pick(design.size, BUTTON_ICON_SIZE) }), [design.size]);

  return (
    <DesignContext.Provider value={design}>
      <IconContext.Provider value={iconProps}>
        <DynamicColorProvider color={color}>
          <Ariakit.Button
            ref={ref}
            className={cn(mainClass, className)}
            disabled={disabled.disabled}
            type={type}
            {...(forceFocus ? { "data-focus-visible": true } : {})}
            {...buttonProps}
          >
            {childrenResolved}
          </Ariakit.Button>
        </DynamicColorProvider>
      </IconContext.Provider>
    </DesignContext.Provider>
  );
};
