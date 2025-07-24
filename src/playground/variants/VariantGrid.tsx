import { Fragment } from "react";
import { css } from "../../../styled-system/css";
import { Grid, styled } from "../../../styled-system/jsx";
import { Scrollbars } from "../../shared/components/common/Scrollbars";
import { TBaseProps } from "./types";
import { variantStoreHooks } from "./variantStore";

export function VariantGrid() {
  const cols = variantStoreHooks.useCols();
  const rows = variantStoreHooks.useRows();
  const base = variantStoreHooks.useBase();
  const render = variantStoreHooks.useRender();

  return (
    <Scrollbars className={css({ h: "full", w: "full" })}>
      <styled.div p="3" minW="max">
        <Grid gap="3">
          {cols.map((col, colIndex) => (
            <Fragment key={col.key}>
              {rows.map((row, rowIndex) => {
                const key = `${col.key}-${row.key}`;
                const props = { ...base, ...col.props, ...row.props } as TBaseProps;
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
  );
}
