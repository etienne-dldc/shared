import { ComponentType, Fragment, PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useMemoRecord } from "../hooks/useMemoRecord";
import { TPropsSplitter } from "./propsSplitters";
import { withoutUndefined } from "./withoutUndefined";

export type TDefineProps<Props extends Record<string, any>, Meta> = PropsWithChildren<Partial<Props> & { meta: Meta }>;

export interface TPropsContext<Props extends Record<string, any>> {
  defaultProps: Props;
  Define: ComponentType<PropsWithChildren<Partial<Props>>>;
  Provider: ComponentType<PropsWithChildren<{ value: Props }>>;
  useProps(): Props;
  propsSplitter: TPropsSplitter<Partial<Props>>;
}

export function createPropsContext<Props extends Record<string, any>>(
  name: string,
  defaultProps: Props,
): TPropsContext<Props> {
  const InternalContext = createContext<Props>(defaultProps);

  const keys = Object.keys(defaultProps) as Array<keyof Props>;

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
      () => ({ ...parentProps, ...withoutUndefined(pickedProps) }),
      [parentProps, pickedProps],
    );

    return <InternalContext.Provider value={mergedProps}>{children ?? <Fragment />}</InternalContext.Provider>;
  };
  Define.displayName = `${name}Props.Define`;

  const propsSplitter: TPropsSplitter<Partial<Props>> = (props) => {
    const result: Partial<Props> = {};
    keys.forEach((key) => {
      if (key in props) {
        result[key] = (props as any)[key];
      }
    });
    return result;
  };

  return {
    defaultProps,
    Define,
    Provider: InternalContext.Provider,
    useProps,
    propsSplitter,
  };

  function useProps(): Props {
    return useContext(InternalContext);
  }
}
