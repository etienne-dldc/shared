import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn, TInteractiveState } from "../../styles/utils";
import { DesignContext, TDesignRounded, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { buttonClassName, mapBooleanProps } from "./styles";

export type ButtonLinkProps = Merge<
  ComponentPropsWithoutRef<"a">,
  {
    // Design
    dynamicColor?: TDynamicColor;
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

export const ButtonLink = forwardRef((inProps: ButtonLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  const {
    dynamicColor,
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
    () => buttonClassName({ size, variant, priority, rounded, interactive: true, forceActive, forceHover }),
    [size, variant, priority, rounded, forceActive, forceHover],
  );

  return (
    <DesignContext.Provider {...{ rounded, size, variant }}>
      <DynamicColorProvider color={dynamicColor}>
        <a
          ref={ref}
          className={cn(mainClass, className)}
          {...(forceFocus ? { "data-focus-visible": true } : {})}
          {...divProps}
        >
          {children}
        </a>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
});
