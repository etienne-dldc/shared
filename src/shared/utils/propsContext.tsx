import { ComponentType, Fragment, PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useMemoRecord } from "../hooks/useMemoRecord";
import { TPropsSplitter } from "./propsSplitters";

export interface TPropsContext<Props extends Record<string, any>> {
  defaultProps: Props;
  Define: ComponentType<PropsWithChildren<Partial<Props>>>;
  Provider: ComponentType<PropsWithChildren<{ value: Props }>>;
  useProps<P>(directProps?: P & Partial<Props>): [props: Props, rest: Omit<P, keyof Props>];
  usePropsSplitter(): TPropsSplitter<Props>;
}

export function createPropsContext<Props extends Record<string, any>>(
  name: string,
  defaultProps: Props,
  mergeProps: (parent: Props, child: Partial<Props>) => Props,
): TPropsContext<Props> {
  const InternalContext = createContext<Props>(defaultProps);

  const keys = Object.keys(defaultProps) as Array<keyof Props>;

  function pickProps(props: Record<string, any>): Partial<Props> {
    const pickedProps: Partial<Props> = {};
    keys.forEach((key) => {
      if (key in props && (props as any)[key] !== undefined) {
        pickedProps[key] = (props as any)[key];
      }
    });
    return pickedProps;
  }

  const Define: ComponentType<PropsWithChildren<Partial<Props>>> = ({ children, ...props }) => {
    const parentProps = useContext(InternalContext);
    const pickedProps = useMemoRecord(pickProps(props));

    const mergedProps = useMemo(() => mergeProps(parentProps, pickedProps), [parentProps, pickedProps]);

    return <InternalContext.Provider value={mergedProps}>{children ?? <Fragment />}</InternalContext.Provider>;
  };
  Define.displayName = `${name}Props.Define`;

  return {
    defaultProps,
    Define,
    Provider: InternalContext.Provider,
    useProps,
    usePropsSplitter,
  };

  function useProps<P extends Partial<Props>>(directProps?: P): [props: Props, rest: Omit<P, keyof Props>] {
    const parentProps = useContext(InternalContext);
    const pickedProps = useMemoRecord(pickProps(directProps ?? {}));
    const mergedProps = useMemo(() => mergeProps(parentProps, pickedProps), [parentProps, pickedProps]);

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
      const mergedProps = mergeProps(parentProps, pickProps(props));
      return mergedProps;
    };
  }
}
