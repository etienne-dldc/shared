import { Plus } from "@phosphor-icons/react";
import { Fragment, useCallback, useId, useMemo } from "react";
import { Button } from "../shared/components/button/Button";
import { useLatestRef } from "../shared/hooks/useLatestRef";
import { useLocalStorageState } from "../shared/hooks/useLocalStorageState";
import { cn, tw } from "../shared/styles/utils";

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

interface VariantsProps<Dims extends TDimensions> {
  localStorageKey?: string | null;
  title?: string;
  dimensions: Dims;
  initialAxis: TAxis<keyof Dims>;
  render: (data: TDimensionsData<Dims>, key: string) => JSX.Element | null;
  defaultSelected: TSelected<Dims>;
  cellMinWidth?: number;
}

export function Variants<Dims extends TDimensions>({
  localStorageKey = null,
  title,
  dimensions,
  initialAxis,
  render,
  defaultSelected,
  cellMinWidth,
}: VariantsProps<Dims>) {
  const axisKey = localStorageKey ? `variants-${localStorageKey}-axis` : null;
  const [axis, setAxis] = useLocalStorageState(axisKey, (prev) => (prev as TAxis<keyof Dims>) || initialAxis);
  const selectedKey = localStorageKey ? `variants-${localStorageKey}-selected` : null;
  const [selected, setSelected] = useLocalStorageState(
    selectedKey,
    (prev) => (prev as TSelected<Dims>) || defaultSelected,
  );

  const cols = useMemo(() => {
    let result: TSelectedPartial<Dims>[] = [{}];
    for (const colDim of axis.column) {
      const prev = result;
      result = [];
      for (const item of prev) {
        for (const colVal of Object.keys(dimensions[colDim])) {
          result.push({ ...item, [colDim]: colVal });
        }
      }
    }
    return result;
  }, [axis.column, dimensions]);

  const rows = useMemo(() => {
    let result: TSelectedPartial<Dims>[] = [{}];
    for (const rowDim of axis.row) {
      const prev = result;
      result = [];
      for (const item of prev) {
        for (const rowVal of Object.keys(dimensions[rowDim])) {
          result.push({ ...item, [rowDim]: rowVal });
        }
      }
    }
    return result;
  }, [axis.row, dimensions]);

  const colOffset = rows.length > 1 ? 1 : 0;
  const rowOffset = cols.length > 1 ? 1 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4 items-center">
        {title && <h2 className="text-2xl px-6">{title}</h2>}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <MultiSelect<keyof Dims>
              highlight
              label="column"
              selected={axis.column}
              options={Object.keys(dimensions)}
              onChange={(selected) => setAxis((prev) => ({ ...prev, column: selected }))}
            />
            <MultiSelect<keyof Dims>
              highlight
              label="row"
              selected={axis.row}
              options={Object.keys(dimensions)}
              onChange={(selected) => setAxis((prev) => ({ ...prev, row: selected }))}
            />
            <Button title="Reset" onClick={() => setAxis(initialAxis)} color="red" size="sm" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-4 pt-6">
          {Object.entries(dimensions)
            .filter(([key]) => !axis.column.includes(key) && !axis.row.includes(key))
            .map(([dimKey, dim]) => (
              <Select
                key={dimKey}
                label={dimKey}
                selected={selected[dimKey] as string}
                options={Object.keys(dim)}
                onChange={(value) => setSelected({ ...selected, [dimKey]: value })}
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
                    className="text-center bg-white/5 rounded uppercase font-bold p-1"
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
                    className="text-center bg-white/5 rounded uppercase font-bold p-1 flex items-center justify-center"
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

interface SelectProps<T> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  label: string;
  highlight?: boolean;
}

function Select<T extends string>({ label, onChange, options, selected, highlight = false }: SelectProps<T>) {
  const id = useId();
  return (
    <div className={cn(tw`bg-white/5 py-1 px-4 rounded flex flex-row gap-1`, highlight && tw`bg-blue-500 text-white`)}>
      <label htmlFor={id} className="uppercase font-bold text-sm text-white/40 flex-1">
        {label}
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded px-1 bg-transparent text-right"
        id={id}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface MultiSelectProps<T> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  label: string;
  highlight?: boolean;
}

function MultiSelect<T>({ label, onChange, options, selected, highlight = false }: MultiSelectProps<T>) {
  const id = useId();

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

  return (
    <div
      className={cn(
        tw`bg-white/5 py-1 px-2 rounded flex flex-row items-center gap-2`,
        highlight && tw`bg-blue-500 text-white`,
      )}
    >
      <label htmlFor={id} className="uppercase font-bold text-sm mr-1">
        {label}
      </label>
      {selected.map((selectedItem, index) => (
        <select
          key={index}
          value={selectedItem as string}
          onChange={(e) => onSelectChange(e.target.value as any, index)}
          className="rounded px-1 bg-black/10"
          id={id}
        >
          {options.map((option) => (
            <option key={option as string} value={option as string}>
              {option as string}
            </option>
          ))}
          <option value="REMOVE">--REMOVE--</option>
        </select>
      ))}
      <button
        className=""
        onClick={() => {
          const available = options.filter((option) => !selected.includes(option));
          onChange([...selected, available[0]]);
        }}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
