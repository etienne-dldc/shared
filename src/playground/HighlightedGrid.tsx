/**
 * Given the input dimentions, render a grid for every combination of rows and columns
 * If onHightlightedCell is provided, call it when a cell is hovered and add a highlight style to the cell
 */

import { useCallback, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { css } from "../../styled-system/css";
import { Grid, Paper, styled } from "../../styled-system/jsx";
import { SystemStyleObject } from "../../styled-system/types";
import { Scrollbars } from "../shared/components/common/Scrollbars";

export interface HeighligedCellParams<TRow, TColumn> {
  key: string;
  row: TRow;
  column: TColumn;
  rowIndex: number;
  columnIndex: number;
}

export interface HighlightedGridProps<TRow, TColumn> {
  rowsDims?: TRow[];
  columnsDims?: TColumn[];
  renderCell: (params: HeighligedCellParams<TRow, TColumn>) => React.ReactNode;
  onHighlightedCell?: (params: HeighligedCellParams<TRow, TColumn>) => void;
  css?: SystemStyleObject;
}

export function HighlightedGrid<TRow, TColumn>({
  rowsDims,
  columnsDims,
  renderCell,
  onHighlightedCell,
  css: cssProp,
}: HighlightedGridProps<TRow, TColumn>) {
  const hasRows = rowsDims && rowsDims.length > 0;
  const hasColumns = columnsDims && columnsDims.length > 0;

  const safeRows = hasRows ? rowsDims : ([null] as TRow[]);
  const safeColumns = hasColumns ? columnsDims : ([null] as TColumn[]);

  const columnOffset = hasRows ? 2 : 1;
  const rowOffset = hasColumns ? 2 : 1;

  const [highlighted, setHighlighted] = useState<{ columnIndex: number; rowIndex: number } | null>(null);

  const onHightlighted = useCallback(
    (params: HeighligedCellParams<TRow, TColumn>) => {
      setHighlighted(params ? { columnIndex: params.columnIndex, rowIndex: params.rowIndex } : null);
      onHighlightedCell?.(params);
    },
    [onHighlightedCell],
  );

  return (
    <Paper bg="neutral.900">
      <Scrollbars className={css({ h: "full", w: "full" }, cssProp)}>
        <styled.div p="3" minW="max">
          <Grid
            gap="3"
            position="relative"
            style={{
              gridTemplateRows: `${hasColumns ? "4px " : ""} repeat(${safeRows.length}, max-content)`,
              gridTemplateColumns: `${hasRows ? "4px " : ""} repeat(${safeColumns.length}, max-content)`,
            }}
          >
            {highlighted && hasRows && (
              <styled.div
                bg="white/15"
                alignSelf="stretch"
                justifySelf="stretch"
                rounded="0x"
                my="-1"
                position="sticky"
                left="0"
                style={{ gridColumn: 1, gridRow: rowOffset + highlighted.rowIndex }}
              />
            )}
            {highlighted && hasColumns && (
              <styled.div
                bg="white/15"
                alignSelf="stretch"
                justifySelf="stretch"
                rounded="0x"
                mx="-1"
                position="sticky"
                top="0"
                style={{ gridColumn: columnOffset + highlighted.columnIndex, gridRow: 1 }}
              />
            )}

            {safeColumns.map((column, columnIndex) => (
              <Fragment key={columnIndex}>
                {safeRows.map((row, rowIndex) => {
                  const key = `${columnIndex}-${rowIndex}`;
                  const params: HeighligedCellParams<TRow, TColumn> = { key, row, column, rowIndex, columnIndex };
                  return (
                    <styled.div
                      style={{ gridColumn: columnOffset + columnIndex, gridRow: rowOffset + rowIndex }}
                      position="relative"
                      key={key}
                      onPointerEnter={() => onHightlighted(params)}
                    >
                      {renderCell(params)}
                    </styled.div>
                  );
                })}
              </Fragment>
            ))}
          </Grid>
        </styled.div>
      </Scrollbars>
    </Paper>
  );
}
