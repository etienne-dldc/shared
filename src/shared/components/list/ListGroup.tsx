import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { cn } from "../../styles/utils";
import { pick } from "../../utils/pick";
import { DesignContext, resolveDesignProps, TDesignDirSize, TDesignSize } from "../core/DesignContext";

export interface ListGroupProps extends ComponentPropsWithRef<"div"> {
  title?: string;
  size?: TDesignSize;
  xSize?: TDesignDirSize;
  ySize?: TDesignDirSize;
}

export function ListGroup(props: ListGroupProps) {
  const [design, { title, children, className, ...htmlProps }] = DesignContext.useProps(props);
  const { xSize } = resolveDesignProps(design);

  const sizeClass = pick(xSize, {
    xs: cn("ml-1"),
    sm: cn("ml-1"),
    md: cn("ml-2"),
    lg: cn("ml-3"),
  });

  return (
    <DesignContext.Provider value={design}>
      <Ariakit.CompositeGroup {...htmlProps} className={cn("flex flex-col gap-1", className)}>
        <Ariakit.CompositeGroupLabel
          className={cn("uppercase text-xs px-1 py-0.5 mt-3 tracking-wide text-white/70", sizeClass)}
        >
          {title}
        </Ariakit.CompositeGroupLabel>
        {children}
      </Ariakit.CompositeGroup>
    </DesignContext.Provider>
  );
}
