import { JSX } from "react";

export const VARIANT_TREE = Symbol("VARIANT_TREE");

export type TBaseProps = Record<string, any>;

export interface TVariantsTreeValue<Props extends TBaseProps> {
  readonly [VARIANT_TREE]: true;
  readonly props: Props;
}

export interface TVariantsTreeRoot<Props extends TBaseProps, T extends TVariantsTree<Props>> {
  readonly [VARIANT_TREE]: Props;
  readonly data: T;
}

export type TVariantsTreeRootAny<Props extends TBaseProps = TBaseProps> = TVariantsTreeRoot<Props, any>;

export type TVariantsTreeProps<T extends TVariantsTreeRootAny> = T[typeof VARIANT_TREE];

export interface TVariantsTree<Props extends TBaseProps> {
  readonly [key: string]: TVariantsTreeValue<Props> | TVariantsTree<Props>;
}

export type TSimplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type TVarientsKeys<T extends TVariantsTree<any>> = TSimplify<
  {
    [K in keyof T]: K | TVarientsKeysInner<K & string, T[K]>;
  }[keyof T]
>;

export type TVarientsKeysInner<Prefix extends string, T> =
  T extends TVariantsTreeValue<any>
    ? Prefix
    : {
        [K in keyof T]: T[K] extends TVariantsTreeValue<any>
          ? `${Prefix}.${K & string}`
          : `${Prefix}.${K & string}` | TVarientsKeysInner<`${Prefix}.${K & string}`, T[K]>;
      }[keyof T];

export interface TDimention<Keys> {
  readonly id: string;
  readonly name: string;
  readonly type: "row" | "column" | "config";
  readonly keys: Keys[];
  readonly visible?: boolean;
}

export interface PropsWithKey<Props extends TBaseProps = TBaseProps> {
  readonly key: string;
  readonly props: Props;
}

export type TRenderVariant<Props extends TBaseProps = TBaseProps> = (props: Props, key: string) => JSX.Element | null;
