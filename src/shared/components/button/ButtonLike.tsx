import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn, TInteractiveState } from "../../styles/utils";
import { DesignContext, TDesignRounded, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { buttonClassName, mapBooleanProps } from "./styles";

export type ButtonLikeProps = Merge<
  ComponentPropsWithoutRef<"div">,
  {
    // Design
    color?: TDynamicColor;
    size?: TDesignSize;
    rounded?: TDesignRounded;

    filled?: boolean;
    primary?: boolean;

    __forceState?: null | TInteractiveState;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    title?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;
  }
>;

/**
 * ButtonLike is a component that looks like a button but is a div and has not hover styles/active styles
 */
export const ButtonLike = forwardRef((inProps: ButtonLikeProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    color,
    rounded,
    size,
    variant,
    priority,
    __forceState,

    title,
    icon,
    endIcon,
    details,
    loading,
    children = <ButtonContent {...{ title, icon, endIcon, details, loading }} />,

    className,
    ...divProps
  } = DesignContext.useProps(mapBooleanProps(inProps));

  const forceHover = __forceState === "hover";
  const forceActive = __forceState === "active";
  const forceFocus = __forceState === "focus";

  const mainClass = useMemo(
    () => buttonClassName({ size, variant, priority, rounded, interactive: false, forceActive, forceHover }),
    [size, variant, priority, rounded, forceActive, forceHover],
  );

  return (
    <DesignContext.Provider {...{ rounded, size, variant }}>
      <DynamicColorProvider color={color}>
        <div
          ref={ref}
          className={cn(mainClass, className)}
          {...(forceFocus ? { "data-focus-visible": true } : {})}
          {...divProps}
        >
          {children}
        </div>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
});
