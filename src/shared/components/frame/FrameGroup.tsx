import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import { Children, cloneElement, Fragment } from "react";
import { frameGroupSeparatorStyles, frameGroupStyles } from "../../css/frameGroup";
import { TDesignProps, TPaletteColor } from "../../css/types";
import { ComponentPropsBaseWith } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";

export type FrameGroupProps = ComponentPropsBaseWith<
  "div",
  TDesignProps & {
    disabled?: boolean;

    color?: TPaletteColor;

    direction?: "horizontal" | "vertical";
    roundedEnds?: "start" | "end" | "both" | "none";
    innerDividers?: boolean;
  }
>;

export function FrameGroup(inProps: FrameGroupProps) {
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const { variant } = useContainerDesignProps(localDesign, "surface");
  const {
    color,
    className,
    children,
    direction = "horizontal",
    innerDividers = true,
    roundedEnds = "both",
    style,
    ...divProps
  } = props;

  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);

  if (childrenLength === 0) return null;

  const roundedStart = roundedEnds === "start" || roundedEnds === "both";
  const roundedEnd = roundedEnds === "end" || roundedEnds === "both";

  const [baseClass, baseInline] = frameGroupStyles({ direction, color, variant });
  const [separatorClass, separatorInline] = frameGroupSeparatorStyles({ direction, variant });

  return (
    <DefaultDesignProvider {...localDesign}>
      <Ariakit.Role className={clsx(baseClass, className)} style={{ ...baseInline, ...style }} {...divProps}>
        {Children.map(childrenFiltered, (child, i) => {
          if (!child) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;
          const roundStart = roundedStart && isFirst;
          const roundEnd = roundedEnd && isLast;
          const roundedBase = roundStart && roundEnd ? "all" : roundStart ? "start" : roundEnd ? "end" : "none";

          return (
            <Fragment>
              {innerDividers && !isFirst && <span className={separatorClass} style={separatorInline} />}
              {cloneElement(child as any, {
                ["data-first"]: roundedBase === "start" ? "true" : undefined,
                ["data-last"]: roundedBase === "end" ? "true" : undefined,
                ["data-between"]: roundedBase === "none" ? "true" : undefined,
              })}
            </Fragment>
          );
        })}
      </Ariakit.Role>
    </DefaultDesignProvider>
  );
}

FrameGroup.displayName = "FrameGroup";
