/* eslint-disable react-refresh/only-export-components */

import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { resolveContainerDesignProps } from "../../design/sizes";
import {
  TDefaultDesignContext,
  TDesignContextResolved,
  TNestedDefaultDesignContext,
  TNestedDesignValues,
  TParentDesignContext,
} from "../../design/types";
import { BaseRecord } from "../../utils/propsSplitters";
import { withoutUndefined } from "../../utils/withoutUndefined";

export const ParentDesignContext = createContext<TParentDesignContext | null>(null);

export function SizeContextProvider({
  height,
  contentHeight,
  rounded,
  children,
  depth,
}: PropsWithChildren<TParentDesignContext>) {
  const value = useMemo(() => ({ height, contentHeight, rounded, depth }), [height, contentHeight, rounded, depth]);
  return <ParentDesignContext.Provider value={value}>{children}</ParentDesignContext.Provider>;
}

export const DEFAULT_DESIGN: TDefaultDesignContext = {
  height: null,
  contentHeight: null,
  rounded: null,
  spacing: null,
  variant: "surface",
  hoverVariant: null,
};

const DESIGN_KEYS = Object.keys(DEFAULT_DESIGN) as Array<keyof TDefaultDesignContext>;

export function designPropsSplitter(props: BaseRecord): Partial<TDefaultDesignContext> {
  const result: Partial<TDefaultDesignContext> = {};
  DESIGN_KEYS.forEach((key) => {
    if (key in props && props[key] !== undefined) {
      result[key] = (props as any)[key];
    }
  });
  return result;
}

// export const DefaultDesignContext = createPropsContext<TDefaultDesignContext>("Design", {
//   height: null,
//   contentHeight: null,
//   rounded: null,
//   spacing: null,
//   variant: "surface",
//   hoverVariant: null,
// });

// export function designPropsSplitter(props: Partial<TDefaultDesignContext>) {
//   const base = DefaultDesignContext.propsSplitter(props);
//   return withoutUndefined({
//     ...base,
//     // Use null as default value for height and contentHeight
//     // height: base.height === null ? BASE_HEIGHT : base.height,
//     // contentHeight: base.contentHeight === null ? BASE_HEIGHT_RATIO : base.contentHeight,
//   });
// }

export function useContainerDesignProps(localProps: Partial<TDefaultDesignContext>): TDesignContextResolved {
  const sizeCtx = useContext(ParentDesignContext);
  const deepCtx = useContext(NestedDefaultDesignContext);
  return resolveContainerDesignProps(sizeCtx, deepCtx, localProps);
}

export const NestedDefaultDesignContext = createContext<TNestedDefaultDesignContext | null>(null);

export function NestedDefaultDesignProvider({ children, values }: PropsWithChildren<{ values: TNestedDesignValues }>) {
  const sizeCtx = useContext(ParentDesignContext);
  const parentNestedCtx = useContext(NestedDefaultDesignContext);

  const depth = sizeCtx?.depth ?? 0;

  const parentValues = useMemo(() => {
    if (!parentNestedCtx) {
      return [];
    }
    const diff = depth - parentNestedCtx.depth;
    return parentNestedCtx.values.slice(diff);
  }, [depth, parentNestedCtx]);

  const value = useMemo((): TNestedDefaultDesignContext => {
    const result = [...parentValues];
    values.forEach((v, i) => {
      result[i] = {
        ...withoutUndefined(result[i] ?? {}),
        ...withoutUndefined(v),
      };
    });
    return { depth, values: result };
  }, [depth, parentValues, values]);

  return <NestedDefaultDesignContext.Provider value={value}>{children}</NestedDefaultDesignContext.Provider>;
}

export function DefaultDesignProvider({ children, ...props }: PropsWithChildren<Partial<TDefaultDesignContext>>) {
  const values = useMemo(() => [withoutUndefined(props)], [props]);
  return <NestedDefaultDesignProvider values={values}>{children}</NestedDefaultDesignProvider>;
}
