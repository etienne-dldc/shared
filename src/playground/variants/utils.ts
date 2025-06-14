import {
  PropsWithKey,
  TBaseProps,
  TDimention,
  TVariantsTree,
  TVariantsTreeRootAny,
  TVariantsTreeValue,
  VARIANT_TREE,
} from "./types";

export function resolveDimentions<Props extends TBaseProps>(
  baseKey: string,
  tree: TVariantsTreeRootAny,
  dimention: TDimention<string>,
): PropsWithKey<Props>[] {
  return dimention.keys.flatMap((key) => resolveKeys<Props>(baseKey, tree.data, key));
}

export function resolveKeys<Props extends TBaseProps>(
  baseKey: string,
  tree: TVariantsTree<Props>,
  key: string,
): PropsWithKey<Props>[] {
  const path = key.split(".");
  let current: TVariantsTree<any> = tree;
  for (const segment of path) {
    current = current[segment] as TVariantsTree<any>;
  }
  if (isVariantsTreeValue(current)) {
    return [{ key: `${baseKey}.${key}`, props: current.props }];
  }
  // traverse all
  return extractAllValues(`${baseKey}.${key}`, current);
}

export function extractAllValues<Props extends TBaseProps>(
  baseKey: string,
  tree: TVariantsTree<Props>,
): PropsWithKey<Props>[] {
  if (isVariantsTreeValue(tree)) {
    return [{ key: baseKey, props: tree.props }];
  }
  const values: PropsWithKey<Props>[] = [];
  Object.entries(tree).forEach(([key, value]) => {
    if (isVariantsTreeValue(value)) {
      values.push({ key: `${baseKey}.${key}`, props: value.props });
    } else {
      values.push(...extractAllValues(`${baseKey}.${key}`, value));
    }
  });
  return values;
}

export function isVariantsTreeValue(value: any): value is TVariantsTreeValue<any> {
  return value && typeof value === "object" && VARIANT_TREE in value;
}

export function crossProps<Props extends TBaseProps>(dims: PropsWithKey<Props>[][]): PropsWithKey<Props>[] {
  if (dims.length === 0) return [{ key: "", props: {} as Props }];
  if (dims.length === 1) return dims[0];
  const [first, ...rest] = dims;
  let result: PropsWithKey<Props>[] = first;
  rest.forEach((dim) => {
    if (dim.length === 0) return;
    const prev = result;
    result = [];
    dim.forEach((item) => {
      result.push(
        ...prev.map((p) => ({
          key: `${p.key}|${item.key}`,
          props: { ...p.props, ...item.props },
        })),
      );
    });
  });
  return result;
}
