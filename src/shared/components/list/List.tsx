import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { TDesignSize } from "../../design/types";
import { DefaultDesignProvider } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";

export type ListProps = Merge<
  ComponentPropsWithRef<"div">,
  {
    size?: TDesignSize;
    color?: TDynamicColor;
    disabled?: boolean;

    direction?: "horizontal" | "vertical";

    render?: React.ReactElement<any>;
  }
>;

export function List(inProps: ListProps) {
  // const [{ localDesign }, props] = pipePropsSplitters(inProps, {
  //   localDesign: designPropsSplitter,
  // });

  const {
    color,

    // direction = "vertical",

    render,

    children,
    className,
    ref,
    ...divProps
  } = inProps;

  // const dirClass = direction === "horizontal" ? "flex-row" : "flex-col";
  // const groupClass = cn(tw`flex gap-1`, dirClass, className);

  return (
    <DefaultDesignProvider
    // height={inProps.height}
    // direction={direction}
    // variant={localDesign.variant}
    // hoverVariant={localDesign.hoverVariant}
    >
      <DynamicColorProvider color={color}>
        <Ariakit.Role
          ref={ref}
          // className={groupClass}
          {...divProps}
          render={render}
        >
          {children}
        </Ariakit.Role>
      </DynamicColorProvider>
    </DefaultDesignProvider>
  );
}
