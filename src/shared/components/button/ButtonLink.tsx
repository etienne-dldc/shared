import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn } from "../../styles/utils";
import { DesignContext, TDesignRounded, TDesignSize, TDesignVariant } from "../DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { buttonClassName } from "./styles";

export type ButtonLinkProps = Merge<
  ComponentPropsWithoutRef<"a">,
  {
    // Design
    dynamicColor?: TDynamicColor;
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

export const ButtonLink = forwardRef((inProps: ButtonLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  const {
    dynamicColor,
    rounded,
    size,
    variant,

    title,
    icon,
    endIcon,
    details,
    loading,
    children = <ButtonContent {...{ title, icon, endIcon, details, loading }} />,

    className,
    ...divProps
  } = DesignContext.useProps(inProps);

  const mainClass = useMemo(
    () => buttonClassName({ size, variant, rounded, interactive: true }),
    [size, variant, rounded],
  );

  return (
    <DesignContext.Provider {...{ rounded, size, variant }}>
      <DynamicColorProvider color={dynamicColor}>
        <a ref={ref} className={cn(mainClass, className)} {...divProps}>
          {children}
        </a>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
});
