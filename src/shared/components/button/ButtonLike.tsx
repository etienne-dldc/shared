import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn } from "../../styles/utils";
import {
  DesignContext,
  TDesignRounded,
  TDesignSize,
  TDesignVariant,
} from "../core/DesignContext";
import {
  DynamicColorProvider,
  TDynamicColor,
} from "../core/DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { buttonClassName } from "./styles";

export type ButtonLikeProps = Merge<
  ComponentPropsWithoutRef<"div">,
  {
    // Design
    color?: TDynamicColor;
    size?: TDesignSize;
    variant?: TDesignVariant;
    rounded?: TDesignRounded;

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
export const ButtonLike = forwardRef(
  (inProps: ButtonLikeProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      color,
      rounded,
      size,
      variant,

      title,
      icon,
      endIcon,
      details,
      loading,
      children = (
        <ButtonContent {...{ title, icon, endIcon, details, loading }} />
      ),

      className,
      ...divProps
    } = DesignContext.useProps(inProps);

    const mainClass = useMemo(
      () => buttonClassName({ size, variant, rounded, interactive: false }),
      [size, variant, rounded]
    );

    return (
      <DesignContext.Provider {...{ rounded, size, variant }}>
        <DynamicColorProvider color={color}>
          <div ref={ref} className={cn(mainClass, className)} {...divProps}>
            {children}
          </div>
        </DynamicColorProvider>
      </DesignContext.Provider>
    );
  }
);
