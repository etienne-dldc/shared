import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { TDesignVariant } from "../shared/design/types";

export function ButtonDisabledWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];
  const states = [
    { label: "Normal", disabled: false },
    { label: "Disabled", disabled: true },
  ];

  const [highlighted, setHighlighted] = useState<{ variant: TDesignVariant; state: (typeof states)[number] } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="${highlighted.variant}" ${highlighted.state.disabled ? "disabled={true}" : ""}>${highlighted.state.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={states}
        renderCell={({ row: variant, column: state, key }) => (
          <Button key={key} variant={variant} disabled={state.disabled} height="10" startIcon={<UserIcon />}>
            {state.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { variant: cell.row, state: cell.column } : null)}
      />
    </Grid>
  );
}
