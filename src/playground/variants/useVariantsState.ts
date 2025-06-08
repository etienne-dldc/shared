import { useMemo } from "react";
import { useLocalStorageState } from "../../shared/hooks/useLocalStorageState";
import {
  PropsWithKey,
  TDimention,
  TVariantsTree,
  TVariantsTreeRootAny,
  TVariantsTreeValue,
  VARIANT_TREE,
} from "./types";

interface UseVariantsStateOptions {
  localStorageKey?: string | null;
  tree: TVariantsTreeRootAny;
  initialDimentions: TDimention<string>[];
  initialConfigPosition: "left" | "right" | "top" | "bottom" | "hidden";
}

export interface UseVariantsStateResult<Props> {
  cols: PropsWithKey<Props>[];
  rows: PropsWithKey<Props>[];
  configs: (TDimention<string> & { props: PropsWithKey<Props>[] })[];
}

interface TVariantsStorageData {
  dimentions: TDimention<string>[];
  configPosition: "left" | "right" | "top" | "bottom" | "hidden";
}

export function useVariantsState<Props>({
  localStorageKey,
  tree,
  initialDimentions,
  initialConfigPosition,
}: UseVariantsStateOptions): UseVariantsStateResult<Props> {
  const storageKey = localStorageKey ? `variants-${localStorageKey}` : null;
  const [storage, setStorage] = useLocalStorageState<TVariantsStorageData>(storageKey, (value) => {
    const parsed = (value ?? {}) as Partial<TVariantsStorageData>;
    const restored: TVariantsStorageData = {
      dimentions: parsed.dimentions ?? initialDimentions,
      configPosition: parsed.configPosition ?? initialConfigPosition,
    };
    // TODO: Validate dimentions
    return restored;
  });

  const { cols, rows, configs } = useMemo(() => {
    const cols = crossProps(
      storage.dimentions.filter((d) => d.type === "column").map((d) => resolveDimentions<Props>("col", tree, d)),
    );
    const rows = crossProps(
      storage.dimentions.filter((d) => d.type === "row").map((d) => resolveDimentions<Props>("row", tree, d)),
    );
    const configs = storage.dimentions
      .filter((d) => d.type === "config")
      .map((d) => ({
        ...d,
        props: resolveDimentions<Props>("config", tree, d),
      }));

    return { cols, rows, configs };
  }, [storage.dimentions, tree]);

  console.log({ setStorage });

  return {
    cols,
    rows,
    configs,
  };
}

function resolveDimentions<Props>(
  baseKey: string,
  tree: TVariantsTreeRootAny,
  dimention: TDimention<string>,
): PropsWithKey<Props>[] {
  return dimention.keys.flatMap((key) => resolveKeys<Props>(baseKey, tree.data, key));
}

function resolveKeys<Props>(baseKey: string, tree: TVariantsTree<Props>, key: string): PropsWithKey<Props>[] {
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

function extractAllValues<Props>(baseKey: string, tree: TVariantsTree<Props>): PropsWithKey<Props>[] {
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

function isVariantsTreeValue(value: any): value is TVariantsTreeValue<any> {
  return value && typeof value === "object" && VARIANT_TREE in value;
}

function crossProps<Props>(dims: PropsWithKey<Props>[][]): PropsWithKey<Props>[] {
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
