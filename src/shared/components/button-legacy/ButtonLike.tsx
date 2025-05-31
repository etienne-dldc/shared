import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn } from "../../styles/utils";
import { DesignContext, TDesignRounded, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ButtonContent } from "./ButtonContent";
import { buttonClassName } from "./styles";

export type ButtonLikeProps = Merge<
  ComponentPropsWithoutRef<"div">,
  {
    // Design
    color?: TDynamicColor;
    size?: TDesignSize;
    rounded?: TDesignRounded;

    filled?: boolean;
    primary?: boolean;

    // For content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    title?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;
  }
>;

/**
 * ButtonLike is a component that looks like a button but is a div and has not hover styles/active styles
 */
export const ButtonLike = forwardRef((inProps: ButtonLikeProps, ref: React.Ref<HTMLDivElement>) => {
  const [
    design,
    {
      color,

      title,
      icon,
      endIcon,
      endAction,
      details,
      loading,
      children = <ButtonContent interactive={false} {...{ title, icon, endIcon, endAction, details, loading }} />,

      className,
      ...divProps
    },
  ] = DesignContext.useProps(inProps);

  const mainClass = useMemo(
    () => buttonClassName({ design, interactive: false, forceActive: false, forceHover: false }),
    [design],
  );

  return (
    <DesignContext.Provider value={design}>
      <DynamicColorProvider color={color}>
        <div ref={ref} className={cn(mainClass, className)} {...divProps}>
          {children}
        </div>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
});
