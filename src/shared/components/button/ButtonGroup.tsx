import { Children, ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cn, pick, tw } from "../../styles/utils";
import { DesignContext, TDesignSize, TDesignVariant } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";

interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
  variant?: TDesignVariant;
  color?: TDynamicColor;
  size?: TDesignSize;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ButtonGroup = forwardRef(function ButtonGroup(
  { className, children, ...props }: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const childrenFiltered = Children.toArray(children).filter((c) => c);
  console.log(childrenFiltered);

  const childrenLength = Children.count(childrenFiltered);
  const { color, size, variant, disabled, ...divProps } = DesignContext.useProps(props);

  const separatorClass = pick(variant, {
    primary: tw`bg-dynamic-700`,
    secondary: tw``,
    tertiary: tw``,
  });

  const groupClass = cn("flex flex-row rounded-md", className);

  if (childrenLength === 0) return null;

  return (
    <DynamicColorProvider color={color}>
      <div ref={ref} className={groupClass} {...divProps}>
        {Children.map(childrenFiltered, (c, i) => {
          if (!c) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;

          return (
            <DesignContext.Provider
              size={size}
              variant={variant}
              disabled={disabled}
              rounded={isFirst && isLast ? "all" : isFirst ? "start" : isLast ? "end" : "none"}
            >
              {!isFirst && <span className={cn("w-px", separatorClass)} />}
              {c}
            </DesignContext.Provider>
          );
        })}
      </div>
    </DynamicColorProvider>
  );
});
