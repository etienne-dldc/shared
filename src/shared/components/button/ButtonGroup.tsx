import { Children, ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cn, pick, tw } from "../../styles/utils";
import { DesignContext, TDesignRounded, TDesignSize, TDesignVariant } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";

interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
  variant?: TDesignVariant;
  color?: TDynamicColor;
  size?: TDesignSize;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  rounded?: boolean;
}

export const ButtonGroup = forwardRef(function ButtonGroup(
  { className, children, direction = "horizontal", rounded = true, ...props }: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);
  const { color, size, variant, disabled, ...divProps } = DesignContext.useProps(props);

  const separatorColorClass = pick(variant, {
    primary: tw`bg-dynamic-700`,
    secondary: tw``,
    tertiary: tw`bg-white/10`,
  });

  const separatorDirClass = pick(direction, {
    horizontal: tw`self-stretch w-px`,
    vertical: tw`self-stretch h-px`,
  });

  const separatorClass = cn(separatorColorClass, separatorDirClass);

  const dirClass = direction === "horizontal" ? "flex-row" : "flex-col";
  const groupClass = cn("flex", dirClass, className);

  if (childrenLength === 0) return null;

  return (
    <DynamicColorProvider color={color}>
      <div ref={ref} className={groupClass} {...divProps}>
        {Children.map(childrenFiltered, (child, i) => {
          if (!child) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;
          const roundedBase =
            rounded === false ? "none" : isFirst && isLast ? "all" : isFirst ? "start" : isLast ? "end" : "none";

          const childRounded: TDesignRounded = pick(roundedBase, {
            all: "all",
            none: "none",
            start: pick(direction, {
              horizontal: "left",
              vertical: "top",
            }),
            end: pick(direction, {
              horizontal: "right",
              vertical: "bottom",
            }),
          });

          return (
            <DesignContext.Provider size={size} variant={variant} disabled={disabled} rounded={childRounded}>
              {!isFirst && <span className={separatorClass} />}
              {child}
            </DesignContext.Provider>
          );
        })}
      </div>
    </DynamicColorProvider>
  );
});
