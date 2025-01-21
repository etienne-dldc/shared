import { Plus } from "@phosphor-icons/react";
import { Fragment, useCallback, useMemo } from "react";
import { Button } from "../shared/components/button/Button";
import { ButtonContent } from "../shared/components/button/ButtonContent";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { Select } from "../shared/components/form/Select";
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
            <MultiSelect<keyof Dims & string>
              label="column"
              selected={axis.column as string[]}
              options={Object.keys(dimensions)}
              onChange={(selected) => setAxis((prev) => ({ ...prev, column: selected }))}
            />
            <MultiSelect<keyof Dims & string>
              label="row"
              selected={axis.row as string[]}
              options={Object.keys(dimensions)}
              onChange={(selected) => setAxis((prev) => ({ ...prev, row: selected }))}
            />
            <Button title="Reset" onClick={() => setAxis(initialAxis)} color="red" size="xs" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-3 pt-4">
          {Object.entries(dimensions)
            .filter(([key]) => !axis.column.includes(key) && !axis.row.includes(key))
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

  return (
    <ButtonGroup size="xs" variant="primary">
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
      <Button
        icon={<Plus />}
        onClick={() => {
          const available = options.filter((option) => !selected.includes(option));
          onChange([...selected, available[0]]);
        }}
      />
    </ButtonGroup>
  );
}
