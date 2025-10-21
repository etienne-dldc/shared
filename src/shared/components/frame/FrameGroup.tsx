import * as Ariakit from "@ariakit/react";
import { Children, cloneElement, Fragment } from "react";
import { css, cx } from "../../../../styled-system/css";
import { colorPaletteClass } from "../../design/colors";
import { frameGroupClass, separatorClass } from "../../design/frameGroup";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";

export type FrameGroupProps = ComponentPropsBase<
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

  const { variant } = useContainerDesignProps(localDesign, "subtle");
  const {
    color,
    className,
    children,
    direction = "horizontal",
    innerDividers = true,
    roundedEnds = "both",
    css: cssProps,
    ...divProps
  } = props;

  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);

  if (childrenLength === 0) return null;

  const roundedStart = roundedEnds === "start" || roundedEnds === "both";
  const roundedEnd = roundedEnds === "end" || roundedEnds === "both";

  const separatorClassName = separatorClass({ direction, variant });

  return (
    <DefaultDesignProvider {...localDesign}>
      <Ariakit.Role
        className={cx(css(frameGroupClass.raw({ direction }), color && colorPaletteClass[color], cssProps), className)}
        {...divProps}
      >
        {Children.map(childrenFiltered, (child, i) => {
          if (!child) return null;

          const isFirst = i === 0;
          const isLast = i === childrenLength - 1;
          const roundStart = roundedStart && isFirst;
          const roundEnd = roundedEnd && isLast;
          const roundedBase = roundStart && roundEnd ? "all" : roundStart ? "start" : roundEnd ? "end" : "none";

          return (
            <Fragment>
              {innerDividers && !isFirst && <span className={separatorClassName} />}
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
