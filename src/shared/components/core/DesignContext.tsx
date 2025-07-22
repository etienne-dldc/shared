/* eslint-disable react-refresh/only-export-components */

import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { BASE_HEIGHT, BASE_HEIGHT_RATIO, resolveContainerDesignProps } from "../../design/sizes";
import { TDefaultDesignContext, TDesignContextResolved, TParentDesignContext } from "../../design/types";
import { createPropsContext } from "../../utils/propsContext";
import { withoutUndefined } from "../../utils/withoutUndefined";

export const ParentDesignContext = createContext<TParentDesignContext | null>(null);

export function SizeContextProvider({
  height,
  heightRatio,
  rounded,
  children,
}: PropsWithChildren<TParentDesignContext>) {
  const value = useMemo(() => ({ height, heightRatio, rounded }), [height, heightRatio, rounded]);
  return <ParentDesignContext.Provider value={value}>{children}</ParentDesignContext.Provider>;
}

export const DefaultDesignContext = createPropsContext<TDefaultDesignContext>("Design", {
  height: null,
  heightRatio: null,
  rounded: null,
  spacing: null,
  variant: "surface",
  hoverVariant: null,
});

export function designPropsSplitter(props: Partial<TDefaultDesignContext>) {
  const base = DefaultDesignContext.propsSplitter(props);
  return withoutUndefined({
    ...base,
    // Use null as default value for height and heightRatio
    height: base.height === null ? BASE_HEIGHT : base.height,
    heightRatio: base.heightRatio === null ? BASE_HEIGHT_RATIO : base.heightRatio,
  });
}

export function useContainerDesignProps(localProps: Partial<TDefaultDesignContext>): TDesignContextResolved {
  const sizeCtx = useContext(ParentDesignContext);
  const parentCtx = DefaultDesignContext.useProps();
  return resolveContainerDesignProps(sizeCtx, parentCtx, localProps);
}
