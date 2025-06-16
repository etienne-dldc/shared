import { ComponentType, Fragment, PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useMemoRecord } from "../hooks/useMemoRecord";
import { TPropsSplitter } from "./propsSplitters";

export interface TPropsContext<Props extends Record<string, any>> {
  defaultProps: Props;
  Define: ComponentType<PropsWithChildren<Partial<Props>>>;
  Provider: ComponentType<PropsWithChildren<{ value: Props }>>;
  useProps<P>(directProps?: P & Partial<Props>): [props: Props, rest: Omit<P, keyof Props>];
  useContextProps(): Props;
  usePropsSplitter(): TPropsSplitter<Props>;
}

export function createPropsContext<Props extends Record<string, any>>(
  name: string,
  defaultProps: Props,
  mergeProps: (parent: Props, child: Partial<Props>) => Props,
): TPropsContext<Props> {
  const InternalContext = createContext<Props>(defaultProps);

  const keys = Object.keys(defaultProps) as Array<keyof Props>;

  function withoutUndefined<T extends Record<string, any>>(value: T): T {
    const result: Record<string, any> = {};
    for (const key in value) {
      if (value[key] !== undefined) {
        result[key] = value[key];
      }
    }
    return result as T;
  }

  function pickProps(props: Record<string, any>): Partial<Props> {
    const pickedProps: Partial<Props> = {};
    keys.forEach((key) => {
      pickedProps[key] = key in props ? (props as any)[key] : undefined;
    });
    return pickedProps;
  }

  const Define: ComponentType<PropsWithChildren<Partial<Props>>> = ({ children, ...props }) => {
    const parentProps = useContext(InternalContext);
    const pickedProps = useMemoRecord(pickProps(props));

    const mergedProps = useMemo(
      () => mergeProps(parentProps, withoutUndefined(pickedProps)),
      [parentProps, pickedProps],
    );

    return <InternalContext.Provider value={mergedProps}>{children ?? <Fragment />}</InternalContext.Provider>;
  };
  Define.displayName = `${name}Props.Define`;

  return {
    defaultProps,
    Define,
    Provider: InternalContext.Provider,
    useProps,
    useContextProps,
    usePropsSplitter,
  };

  function useContextProps(): Props {
    return useContext(InternalContext);
  }

  function useProps<P extends Partial<Props>>(directProps?: P): [props: Props, rest: Omit<P, keyof Props>] {
    const parentProps = useContext(InternalContext);
    const pickedProps = useMemoRecord(pickProps(directProps ?? {}));
    const mergedProps = useMemo(
      () => mergeProps(parentProps, withoutUndefined(pickedProps)),
      [parentProps, pickedProps],
    );

    const remainingProps = { ...directProps } as Omit<P, keyof Props>;
    keys.forEach((key) => {
      if (key in remainingProps) {
        delete (remainingProps as any)[key];
      }
    });

    return [mergedProps, remainingProps];
  }

  function usePropsSplitter(): TPropsSplitter<Props> {
    const parentProps = useContext(InternalContext);
    return (props) => {
      const mergedProps = mergeProps(parentProps, withoutUndefined(pickProps(props)));
      return mergedProps;
    };
  }
}
