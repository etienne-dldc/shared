/* eslint-disable react-refresh/only-export-components */

import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { BASE_HEIGHT, BASE_HEIGHT_RATIO, resolveContainerDesignProps } from "../../design/sizes";
import { TDesignContext, TDesignContextResolved, TSizeContext } from "../../design/types";
import { createPropsContext } from "../../utils/propsContext";
import { withoutUndefined } from "../../utils/withoutUndefined";

export const SizeContext = createContext<TSizeContext | null>(null);

export function SizeContextProvider({ parentHeight, parentHeightRatio, children }: PropsWithChildren<TSizeContext>) {
  const value = useMemo(() => ({ parentHeight, parentHeightRatio }), [parentHeight, parentHeightRatio]);
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
}

export const DesignContext = createPropsContext<TDesignContext>("Design", {
  height: null,
  heightRatio: null,
  spacing: null,
  variant: "surface",
  hoverVariant: null,
});

export function designPropsSplitter(props: Partial<TDesignContext>) {
  const base = DesignContext.propsSplitter(props);
  return withoutUndefined({
    ...base,
    // Use null as default value for height and heightRatio
    height: base.height === null ? BASE_HEIGHT : base.height,
    heightRatio: base.heightRatio === null ? BASE_HEIGHT_RATIO : base.heightRatio,
  });
}

export function useContainerDesignProps(localProps: Partial<TDesignContext>): TDesignContextResolved {
  const sizeCtx = useContext(SizeContext);
  const parentCtx = DesignContext.useProps();
  return resolveContainerDesignProps(sizeCtx, parentCtx, localProps);
}
