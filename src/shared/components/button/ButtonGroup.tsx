import * as Ariakit from "@ariakit/react";
import { SystemStyleObject } from "@pandacss/dev";
import { Children, cloneElement, ComponentPropsWithoutRef, ForwardedRef, forwardRef, Fragment } from "react";
import { Merge } from "type-fest";
import { css } from "../../../../styled-system/css";
import { cn } from "../../styles/utils";
import { colorPaletteClass } from "../common/styles";
import { DesignContext, TDesignCrossSize, TDesignMainSize, TDesignVariant, TPaletteColor } from "../core/DesignContext";
import { buttonGroupClass, separatorClass } from "./styles";

export type ButtonGroupProps = Merge<
  ComponentPropsWithoutRef<"div">,
  {
    // Design
    disabled?: boolean;
    crossSize?: TDesignCrossSize;
    contentSize?: TDesignCrossSize;
    mainSize?: TDesignMainSize;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;
    color?: TPaletteColor;
    css?: SystemStyleObject;
    rounded?: boolean;

    direction?: "horizontal" | "vertical";
    outerDividers?: "start" | "end" | "both" | "none";
    innerDividers?: boolean;
  }
>;

export const ButtonGroup = forwardRef(function ButtonGroup(
  inProps: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [design, props] = DesignContext.useProps(inProps);

  const { variant } = design;
  const {
    color,
    className,
    children,
    direction = "horizontal",
    outerDividers = "none",
    innerDividers = true,
    rounded = true,
    ...divProps
  } = props;

  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);

  const dividerBefore = outerDividers === "start" || outerDividers === "both";
  const dividerAfter = outerDividers === "end" || outerDividers === "both";

  if (childrenLength === 0) return null;

  return (
    <DesignContext.Define
      crossSize={inProps.crossSize}
      mainSize={inProps.mainSize}
      contentSize={inProps.contentSize}
      variant={inProps.variant}
      hoverVariant={inProps.hoverVariant}
    >
      <Ariakit.Role
        ref={ref}
        className={cn(
          css(
            buttonGroupClass.raw({ direction, variant }),
            inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
          ),
          className,
        )}
        {...divProps}
      >
        {dividerBefore && <span className={separatorClass({ direction, variant })} />}
        {Children.map(childrenFiltered, (child, i) => {
          if (!child) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;
          const roundStart = rounded && !dividerBefore && isFirst;
          const roundEnd = rounded && !dividerAfter && isLast;
          const roundedBase = roundStart && roundEnd ? "all" : roundStart ? "start" : roundEnd ? "end" : "none";

          return (
            <Fragment>
              {innerDividers && !isFirst && <span className={separatorClass({ direction, variant })} />}
              {cloneElement(child as any, {
                ["data-first"]: roundedBase === "start" ? "true" : undefined,
                ["data-last"]: roundedBase === "end" ? "true" : undefined,
                ["data-between"]: roundedBase === "none" ? "true" : undefined,
              })}
            </Fragment>
          );
        })}
        {dividerAfter && <span className={separatorClass({ direction, variant })} />}
      </Ariakit.Role>
    </DesignContext.Define>
  );
});
