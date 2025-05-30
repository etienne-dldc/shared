import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { cn, tw } from "../../styles/utils";
import { DesignContext, TDesignSize } from "../core/DesignContext";
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
  const [
    design,
    {
      color,

      direction = "vertical",

      render,

      children,
      className,
      ref,
      ...divProps
    },
  ] = DesignContext.useProps(inProps);

  const dirClass = direction === "horizontal" ? "flex-row" : "flex-col";
  const groupClass = cn(tw`flex gap-1`, dirClass, className);

  return (
    <DesignContext.Provider value={design}>
      <DynamicColorProvider color={color}>
        <Ariakit.Role ref={ref} className={groupClass} {...divProps} render={render}>
          {children}
        </Ariakit.Role>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
}
