import { useMemo, useState } from "react";
import { useLocalStorageState } from "../../shared/hooks/useLocalStorageState";
import { createHookProvider } from "../../shared/utils/hookProvider";
import { TBaseProps, TDimention, TRenderVariant, TVariantsTreeRootAny } from "./types";
import { crossProps, resolveDimentions, resolveKeys } from "./utils";

interface TVariantsStorageData {
  dimentions: TDimention<string>[];
  configPosition: "left" | "right" | "top" | "bottom" | "hidden";
}

interface VariantStoreProps {
  localStorageKey?: string;
  tree: TVariantsTreeRootAny;
  initialDimentions: TDimention<string>[];
  initialConfigPosition: "left" | "right" | "top" | "bottom" | "hidden";
  initialBase: string[];
  render: TRenderVariant<Record<string, any>>;
}

const { useOrFail, Provider } = createHookProvider(
  "Variant",
  ({ localStorageKey, tree, initialDimentions, initialConfigPosition, initialBase, render }: VariantStoreProps) => {
    const [modelOpen, setModelOpen] = useState(false);

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

    console.log({ setStorage });

    const { dimentions } = storage;

    const { cols, rows, configs } = useMemo(() => {
      const cols = crossProps<TBaseProps>(
        dimentions.filter((d) => d.type === "column").map((d) => resolveDimentions<TBaseProps>("col", tree, d)),
      );
      const rows = crossProps<TBaseProps>(
        dimentions.filter((d) => d.type === "row").map((d) => resolveDimentions<TBaseProps>("row", tree, d)),
      );
      const configs = dimentions
        .filter((d) => d.type === "config")
        .map((d) => ({
          ...d,
          props: resolveDimentions<TBaseProps>("config", tree, d),
        }));

      return { cols, rows, configs };
    }, [dimentions, tree]);

    const base = useMemo(() => {
      return initialBase
        .flatMap((key) => resolveKeys<TBaseProps>("base", tree.data, key))
        .reduce((acc, item) => ({ ...acc, ...item.props }), {});
    }, [initialBase, tree.data]);

    return {
      dimentions,
      tree,
      cols,
      rows,
      configs,
      base,
      render,
      modelOpen,
      setModelOpen,
    };
  },
);

export const variantStoreHooks = {
  useModalOpen: () => useOrFail().modelOpen,
  useSetModalOpen: () => useOrFail().setModelOpen,
  useRender: () => useOrFail().render,
  useCols: () => useOrFail().cols,
  useRows: () => useOrFail().rows,
  useConfigs: () => useOrFail().configs,
  useBase: () => useOrFail().base,
  useTree: () => useOrFail().tree,
  useDimentions: () => useOrFail().dimentions,
};

export { Provider as VariantStoreProvider };
