import { Fragment, JSX } from "react";
import { Grid, Paper, styled } from "../../../styled-system/jsx";
import { Scrollbars } from "../../shared/components/common/Scrollbars";
import { TDimention, TVariantsTreeProps, TVariantsTreeRootAny, TVarientsKeys } from "./types";
import { useVariantsState } from "./useVariantsState";

export interface VariantsProps<Tree extends TVariantsTreeRootAny> {
  localStorageKey?: string;
  tree: Tree;
  render: (props: TVariantsTreeProps<Tree>, key: string) => JSX.Element | null;
  dimentions: TDimention<TVarientsKeys<Tree["data"]>>[];
  configPosition?: "left" | "right" | "top" | "bottom" | "hidden";
}

export function Variants<Tree extends TVariantsTreeRootAny>({
  localStorageKey,
  tree,
  render,
  dimentions,
  configPosition: initialConfigPosition = "top",
}: VariantsProps<Tree>) {
  const { cols, rows, configs } = useVariantsState<TVariantsTreeProps<Tree>>({
    localStorageKey,
    tree,
    initialDimentions: dimentions as TDimention<string>[],
    initialConfigPosition,
  });

  console.log({ configs });

  return (
    <Paper level="card">
      <Scrollbars>
        <styled.div p="4" m="1" minW="max">
          <Grid gap="4">
            {cols.map((col, colIndex) => (
              <Fragment key={col.key}>
                {rows.map((row, rowIndex) => {
                  const key = `${col.key}-${row.key}`;
                  const props = { ...col.props, ...row.props } as TVariantsTreeProps<Tree>;
                  return (
                    <styled.div
                      style={{ gridColumn: 1 + colIndex, gridRow: 1 + rowIndex }}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      key={key}
                    >
                      {render(props, key)}
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
