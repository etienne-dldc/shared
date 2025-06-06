import * as Ariakit from "@ariakit/react";
import { Children, ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Merge } from "type-fest";
import { cn, tw } from "../../styles/utils";
import { pick, pickBoolStrict } from "../../utils/pick";
import { DesignContext, TDesignRounded, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";

export type ButtonGroupProps = Merge<
  ComponentPropsWithoutRef<"div">,
  {
    color?: TDynamicColor;
    size?: TDesignSize;
    filled?: boolean;
    primary?: boolean;
    disabled?: boolean;

    roundedGroup?: boolean;

    direction?: "horizontal" | "vertical";
    outerDividers?: "start" | "end" | "both" | "none";
    innerDividers?: boolean;
  }
>;

export const ButtonGroup = forwardRef(function ButtonGroup(
  inProps: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [
    design,
    {
      color,
      className,
      children,
      direction = "horizontal",
      roundedGroup = true,
      outerDividers = "none",
      innerDividers = true,
      ...divProps
    },
  ] = DesignContext.useProps(inProps);

  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);

  const filledStr = pickBoolStrict(design.filled, "filled", "transparent");
  const primaryStr = pickBoolStrict(design.primary, "primary", "base");
  const filled_primary = `${filledStr}_${primaryStr}` as const;

  const separatorColorClass = pick(filled_primary, {
    filled_base: tw``,
    filled_primary: tw`bg-dynamic-700`,
    transparent_base: tw`bg-white/10`,
    transparent_primary: tw`bg-white/10`,
  });

  const separatorDirClass = pick(direction, {
    horizontal: tw`self-stretch w-px`,
    vertical: tw`self-stretch h-px`,
  });

  const separatorClass = cn(separatorColorClass, separatorDirClass);

  const dirClass = direction === "horizontal" ? "flex-row" : "flex-col";
  const groupClass = cn("flex", dirClass, className);

  const dividerBefore = outerDividers === "start" || outerDividers === "both";
  const dividerAfter = outerDividers === "end" || outerDividers === "both";

  if (childrenLength === 0) return null;

  return (
    <DynamicColorProvider color={color}>
      <Ariakit.Role ref={ref} className={groupClass} {...divProps}>
        {dividerBefore && <span className={separatorClass} />}
        {Children.map(childrenFiltered, (child, i) => {
          if (!child) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;
          const roundedBase =
            roundedGroup === false ? "none" : isFirst && isLast ? "all" : isFirst ? "start" : isLast ? "end" : "none";

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
            <DesignContext.Provider value={{ ...design, rounded: childRounded }}>
              {innerDividers && !isFirst && <span className={separatorClass} />}
              {child}
            </DesignContext.Provider>
          );
        })}
        {dividerAfter && <span className={separatorClass} />}
      </Ariakit.Role>
    </DynamicColorProvider>
  );
});
