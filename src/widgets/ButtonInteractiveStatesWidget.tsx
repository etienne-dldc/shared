import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { TDesignVariant } from "../shared/design/types";

export function ButtonInteractiveStatesWidget() {
  const stateConfigs = [
    { label: "Normal", props: {}, code: "" },
    { label: "Hover State", props: { "data-hover": true }, code: "data-hover={true}" },
    { label: "Focus State", props: { "data-focus-visible": true }, code: "data-focus-visible={true}" },
  ];

  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost", "input"];

  const [highlighted, setHighlighted] = useState<{
    state: (typeof stateConfigs)[number];
    variant: TDesignVariant;
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="${highlighted.variant}"${highlighted.state.code ? ` ${highlighted.state.code}` : ""}>${highlighted.state.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={stateConfigs}
        renderCell={({ row: variant, column: config, key }) => (
          <Button key={key} {...config.props} variant={variant}>
            {config.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { state: cell.column, variant: cell.row } : null)}
      />
    </Grid>
  );
}
