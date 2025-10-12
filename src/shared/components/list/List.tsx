import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { TDesignHeight, TPaletteColor } from "../../design/types";
import { DefaultDesignProvider } from "../core/DesignContext";

export type ListProps = Merge<
  ComponentPropsWithRef<"div">,
  {
    height?: TDesignHeight;
    color?: TPaletteColor;
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
      <Ariakit.Role
        ref={ref}
        // className={groupClass}
        {...divProps}
        render={render}
      >
        {children}
      </Ariakit.Role>
    </DefaultDesignProvider>
  );
}
