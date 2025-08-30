import * as Ariakit from "@ariakit/react";
import { Children, cloneElement, ComponentPropsWithoutRef, ForwardedRef, forwardRef, Fragment } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass } from "../../design/styles";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DefaultDesignProvider, designPropsSplitter, useContainerDesignProps } from "../core/DesignContext";
import { buttonGroupClass, separatorClass } from "./styles";

export type ButtonGroupProps = Merge<
  Omit<ComponentPropsWithoutRef<"div">, "title" | "height" | "color">,
  TDesignProps & {
    disabled?: boolean;

    color?: TPaletteColor;
    css?: SystemStyleObject;

    direction?: "horizontal" | "vertical";
    roundedEnds?: "start" | "end" | "both" | "none";
    innerDividers?: boolean;
  }
>;

export const ButtonGroup = forwardRef(function ButtonGroup(
  inProps: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const { variant } = useContainerDesignProps(localDesign);
  const {
    color,
    className,
    children,
    direction = "horizontal",
    innerDividers = true,
    roundedEnds = "both",
    css: cssProp,
    ...divProps
  } = props;

  const childrenFiltered = Children.toArray(children).filter((c) => c);
  const childrenLength = Children.count(childrenFiltered);

  const roundedStart = roundedEnds === "start" || roundedEnds === "both";
  const roundedEnd = roundedEnds === "end" || roundedEnds === "both";

  if (childrenLength === 0) return null;

  return (
    <DefaultDesignProvider {...localDesign}>
      <Ariakit.Role
        ref={ref}
        className={cx(
          css(
            buttonGroupClass.raw({ direction, variant }),
            color && colorPaletteClass.raw({ colorPalette: color }),
            cssProp,
          ),
          className,
        )}
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
              {innerDividers && !isFirst && <span className={css(separatorClass(variant, direction))} />}
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
});
