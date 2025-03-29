import { ArrowsLeftRight, Plus } from "@phosphor-icons/react";
import { Fragment, SetStateAction, useCallback, useMemo, type JSX } from "react";
import { Button } from "../shared/components/button/Button";
import { ButtonContent } from "../shared/components/button/ButtonContent";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { Select, TSelectItem } from "../shared/components/select/Select";
import { useLatestRef } from "../shared/hooks/useLatestRef";
import { useLocalStorageState } from "../shared/hooks/useLocalStorageState";

export type TDimensions = Record<string, Record<string, unknown>>;

export type TDimensionsData<Dims extends TDimensions> = {
  [K in keyof Dims]: Dims[K][keyof Dims[K]];
};

export type TAxis<Name> = { column: Name[]; row: Name[] };

export type TSelected<Dims extends TDimensions> = {
  [K in keyof Dims]: keyof Dims[K];
};

export type TSelectedPartial<Dims extends TDimensions> = {
  [K in keyof Dims]?: keyof Dims[K];
};

export interface TVariantPreset<Dims extends TDimensions> {
  column: (keyof Dims)[];
  row: (keyof Dims)[];
  selected: TSelectedPartial<Dims>;
}

interface VariantsProps<Dims extends TDimensions> {
  localStorageKey?: string | null;
  title?: string;
  dimensions: Dims;
  defaultSelected: TSelected<Dims>;
  presets: Record<string, TVariantPreset<Dims>>;
  render: (data: TDimensionsData<Dims>, key: string) => JSX.Element | null;
  cellMinWidth?: number;
}

export function Variants<Dims extends TDimensions>({
  localStorageKey = null,
  title,
  dimensions,
  render,
  defaultSelected,
  cellMinWidth,
  presets = {},
}: VariantsProps<Dims>) {
  const state = useVariantsState<Dims>({ localStorageKey, dimensions, defaultSelected, presets });
  const { rowAxis, colAxis, selected, preset, setColAxis, setPreset, setRowAxis, setSelected, swapAxis, resetAxis } =
    state;

  /**
   * default is a special value that won't appear in the grid
   */
  const dimensionsWithoutDefaults = useMemo(() => {
    const result = {} as Dims;
    for (const [key, value] of Object.entries(dimensions)) {
      (result as any)[key] = { ...value };
      delete result[key]["default"];
    }
    return result;
  }, [dimensions]);

  /**
   * Compute all cols variants
   */
  const cols = useMemo(() => {
    let result: TSelectedPartial<Dims>[] = [{}];
    for (const colDim of colAxis) {
      const prev = result;
      result = [];
      for (const item of prev) {
        for (const colVal of Object.keys(dimensionsWithoutDefaults[colDim])) {
          result.push({ ...item, [colDim]: colVal });
        }
      }
    }
    return result;
  }, [colAxis, dimensionsWithoutDefaults]);

  /**
   * Compute all rows variants
   */
  const rows = useMemo(() => {
    let result: TSelectedPartial<Dims>[] = [{}];
    for (const rowDim of rowAxis) {
      const prev = result;
      result = [];
      for (const item of prev) {
        for (const rowVal of Object.keys(dimensionsWithoutDefaults[rowDim])) {
          result.push({ ...item, [rowDim]: rowVal });
        }
      }
    }
    return result;
  }, [dimensionsWithoutDefaults, rowAxis]);

  const colOffset = rows.length > 1 ? 1 : 0;
  const rowOffset = cols.length > 1 ? 1 : 0;

  const presetItems = useMemo(() => {
    return [
      ...Object.keys(presets).map(
        (key): TSelectItem<string> => ({
          value: key,
          title: key,
        }),
      ),
      { value: "", title: "--NO PRESET--" },
    ];
  }, [presets]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4 items-center">
        {title && <h2 className="text-2xl px-6">{title}</h2>}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <ButtonGroup size="xs" color="blue" primary>
              <ButtonLike title="preset" className="uppercase font-bold" />
              <Select<string>
                label="preset"
                labelHidden
                value={preset ?? ""}
                items={presetItems}
                onChange={(value) => {
                  if (value === "") {
                    setPreset(null);
                  } else {
                    setPreset(value);
                  }
                }}
                renderSelect={<Button className="min-w-[100px]" />}
              />
            </ButtonGroup>
            <MultiSelect<keyof Dims & string>
              label="column"
              selected={colAxis as string[]}
              options={Object.keys(dimensions)}
              onChange={(selected) => setColAxis(selected)}
            />
            <Button color="purple" size="xs" icon={<ArrowsLeftRight />} onClick={() => swapAxis()} />
            <MultiSelect<keyof Dims & string>
              label="row"
              selected={rowAxis as string[]}
              options={Object.keys(dimensions)}
              onChange={(selected) => setRowAxis(selected)}
            />
            <Button title="Reset" onClick={() => resetAxis()} color="red" size="xs" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-3 pt-4">
          {Object.entries(dimensions)
            .filter(([key]) => !colAxis.includes(key) && !rowAxis.includes(key))
            .map(([dimKey, dim]) => (
              <Select<string>
                key={dimKey}
                label={<ButtonContent title={dimKey} className="uppercase font-bold" />}
                value={selected[dimKey] as string}
                items={Object.keys(dim).map((key) => ({
                  value: key,
                  title: key,
                }))}
                onChange={(value) => setSelected({ ...selected, [dimKey]: value })}
                renderSelect={<Button className="flex-1" />}
                renderWrapper={<ButtonGroup size="sm" color="teal" />}
                renderLabel={<ButtonLike title={dimKey} className="flex-1" />}
              />
            ))}
          <Button onClick={() => setSelected(defaultSelected)} title="Reset" color="red" size="sm" />
        </div>
        <div className="max-h-[90vh] overflow-auto flex-1">
          <div className="grid gap-4 py-4">
            {cols.length > 1 &&
              cols.map((col, colIndex) => {
                const colName = Object.values(col).join(" & ");
                return (
                  <div
                    key={`col-${colIndex}`}
                    style={{ gridColumn: 1 + colOffset + colIndex, gridRow: 1 }}
                    className="text-center bg-white/5 rounded-sm uppercase font-bold p-1"
                  >
                    {colName}
                  </div>
                );
              })}
            {rows.length > 1 &&
              rows.map((row, rowIndex) => {
                const rowName = Object.values(row).join(" & ");
                return (
                  <div
                    key={`row-${rowIndex}`}
                    style={{ gridColumn: 1, gridRow: 1 + rowOffset + rowIndex }}
                    className="text-center bg-white/5 rounded-sm uppercase font-bold p-1 flex items-center justify-center"
                  >
                    {rowName}
                  </div>
                );
              })}
            {cols.map((col, colIndex) => (
              <Fragment key={`col-${colIndex}`}>
                {rows.map((row, rowIndex) => {
                  const selectedResolved = { ...selected, ...col, ...row };
                  const data = Object.entries(selectedResolved).reduce((acc, [dimKey, value]) => {
                    return {
                      ...acc,
                      [dimKey]: (dimensions as any)[dimKey][value],
                    };
                  }, {});
                  const key = `cell-${colIndex}-${rowIndex}`;
                  return (
                    <div
                      style={{
                        gridColumn: 1 + colOffset + colIndex,
                        gridRow: 1 + rowOffset + rowIndex,
                        minWidth: cellMinWidth,
                      }}
                      className="flex flex-col items-start"
                      key={key}
                    >
                      {render(data as any, key)}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MultiSelectProps<T extends string> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  label: string;
}

function MultiSelect<T extends string>({ label, onChange, options, selected }: MultiSelectProps<T>) {
  const selectedLatest = useLatestRef(selected);

  const onSelectChange = useCallback(
    (value: T | "REMOVE", index: number) => {
      const copy = [...selectedLatest.current];
      if (value === "REMOVE") {
        copy.splice(index, 1);
      } else {
        copy[index] = value;
      }
      onChange(copy);
    },
    [onChange, selectedLatest],
  );

  const available = options.filter((option) => !selected.includes(option));

  return (
    <ButtonGroup size="xs" primary>
      <ButtonLike title={label} className="uppercase font-bold" />
      {selected.map((selectedItem, index) => {
        return (
          <Select<T | "REMOVE">
            key={index}
            value={selectedItem}
            renderSelect={<Button className="min-w-[100px]" />}
            items={[
              ...options.map((option) => ({
                value: option,
                title: option,
              })),
              {
                value: "REMOVE",
                title: "--REMOVE--",
              },
            ]}
            label={label}
            labelHidden
            onChange={(value) => onSelectChange(value, index)}
          />
        );
      })}
      {available.length > 0 && (
        <Button
          icon={<Plus />}
          onClick={() => {
            onChange([...selected, available[0]]);
          }}
        />
      )}
    </ButtonGroup>
  );
}

interface TUseVariantsStateParams<Dims extends TDimensions> {
  localStorageKey?: string | null;
  dimensions: Dims;
  defaultSelected: TSelected<Dims>;
  presets: Record<string, TVariantPreset<Dims>>;
}

interface TVariantsStorageData<Dims extends TDimensions> {
  preset: string | null;
  // No preset axis
  column: (keyof Dims)[];
  row: (keyof Dims)[];
  // Manually selected dimensions
  selected: TSelectedPartial<Dims>;
}

function useVariantsState<Dims extends TDimensions>({
  localStorageKey = null,
  dimensions,
  defaultSelected,
  presets,
}: TUseVariantsStateParams<Dims>) {
  const storageKey = localStorageKey ? `variants-${localStorageKey}` : null;
  const [storage, setStorage] = useLocalStorageState<TVariantsStorageData<Dims>>(storageKey, (value) => {
    const parsed = (value ?? {}) as Partial<TVariantsStorageData<Dims>>;
    const restored: TVariantsStorageData<Dims> = {
      preset: null,
      column: [],
      row: [],
      selected: {} as TSelected<Dims>,
    };
    if (parsed.preset && presets[parsed.preset]) {
      restored.preset = parsed.preset;
    }
    const allDims = Object.keys(dimensions) as (keyof Dims)[];
    if (parsed.column) {
      restored.column = parsed.column.filter((key) => allDims.includes(key));
    }
    if (parsed.row) {
      restored.row = parsed.row.filter((key) => allDims.includes(key));
    }
    if (parsed.selected) {
      Object.entries(parsed.selected).forEach(([key, value]) => {
        if (allDims.includes(key) && dimensions[key][value]) {
          (restored.selected as any)[key] = value;
        }
      });
    }
    return restored;
  });

  const preset = useMemo(() => storage.preset, [storage.preset]);

  const presetObj = useMemo(() => {
    if (preset && presets[preset]) {
      return presets[preset];
    }
    return null;
  }, [preset, presets]);

  const rowAxis = useMemo(() => presetObj?.row ?? storage.row, [presetObj?.row, storage.row]);

  const colAxis = useMemo(() => presetObj?.column ?? storage.column, [presetObj?.column, storage.column]);

  const internalDefaultSelected = useMemo((): TSelected<Dims> => {
    const result = {} as TSelected<Dims>;
    for (const [key, values] of Object.entries(dimensions)) {
      const defaultProvided = defaultSelected[key];
      if (defaultProvided !== undefined && (values as any)[defaultProvided] !== undefined) {
        (result as any)[key] = defaultProvided;
        continue;
      }
      if (values["default"] !== undefined) {
        (result as any)[key] = "default";
        continue;
      }
      const firstKey = Object.keys(values)[0];
      if (firstKey) {
        (result as any)[key] = firstKey;
        continue;
      }
      throw new Error(`No default value for dimension ${key}`);
    }
    return result;
  }, [defaultSelected, dimensions]);

  const selected = useMemo(() => {
    const base = presetObj ? presetObj.selected : storage.selected;
    return {
      ...internalDefaultSelected,
      ...base,
    };
  }, [internalDefaultSelected, presetObj, storage.selected]);

  const setPreset = useCallback(
    (preset: string | null) => {
      setStorage((prev): TVariantsStorageData<Dims> => {
        const presetResolved = preset && presets[preset] ? preset : null;
        if (presetResolved) {
          const { column, row, selected } = presets[presetResolved];
          return { ...prev, preset, column, row, selected };
        }
        return { ...prev, preset };
      });
    },
    [presets, setStorage],
  );

  const setSelected = useCallback(
    (selected: SetStateAction<TSelectedPartial<Dims>>) => {
      setStorage((prev) => {
        const selectedResolved = typeof selected === "function" ? selected(prev.selected) : selected;
        return {
          ...prev,
          preset: null,
          selected: selectedResolved,
        };
      });
    },
    [setStorage],
  );

  const setColAxis = useCallback(
    (colAxis: SetStateAction<(keyof Dims)[]>) => {
      setStorage((prev) => {
        const colAxisResolved = typeof colAxis === "function" ? colAxis(prev.column) : colAxis;
        return {
          ...prev,
          preset: null,
          column: colAxisResolved,
        };
      });
    },
    [setStorage],
  );

  const setRowAxis = useCallback(
    (rowAxis: SetStateAction<(keyof Dims)[]>) => {
      setStorage((prev) => {
        const rowAxisResolved = typeof rowAxis === "function" ? rowAxis(prev.row) : rowAxis;
        return {
          ...prev,
          preset: null,
          row: rowAxisResolved,
        };
      });
    },
    [setStorage],
  );

  const swapAxis = useCallback(() => {
    setStorage((prev) => {
      return {
        ...prev,
        preset: null,
        column: prev.row,
        row: prev.column,
      };
    });
  }, [setStorage]);

  const resetAxis = useCallback(() => {
    setStorage((prev) => {
      return {
        ...prev,
        preset: null,
        column: [],
        row: [],
      };
    });
  }, [setStorage]);

  return {
    preset,
    rowAxis,
    colAxis,
    selected,
    setPreset,
    setSelected,
    setColAxis,
    setRowAxis,
    swapAxis,
    resetAxis,
  };
}
