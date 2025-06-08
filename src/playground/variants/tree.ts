import { TVariantsTree, TVariantsTreeRoot, TVariantsTreeValue, VARIANT_TREE } from "./types";

export function createVariantsTreeUtils<Props extends Record<string, any>>() {
  return { tree, value, prop, root };

  function root<T extends TVariantsTree<Props>>(data: T): TVariantsTreeRoot<Props, T> {
    return {
      data,
    } as TVariantsTreeRoot<Props, T>;
  }

  function tree<T extends TVariantsTree<Props>>(data: T): T {
    return data;
  }

  function value(props: Props): TVariantsTreeValue<Props> {
    return { [VARIANT_TREE]: true, props };
  }

  /**
   * Define different values for a single property.
   */
  function prop<K extends keyof Props, const Data extends Record<string, Props[K]>>(
    key: K,
    data: Data,
  ): Record<keyof Data, TVariantsTreeValue<Props>> {
    const result: Record<string, TVariantsTreeValue<Props>> = {};
    for (const [name, value] of Object.entries(data)) {
      result[name] = { [VARIANT_TREE]: true, props: { [key]: value } as any };
    }
    return result as Record<keyof Data, TVariantsTreeValue<Props>>;
  }
}
