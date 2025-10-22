import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/form/Input";
import { printElement } from "./utils/printElement";

type DisabledState = {
  label: string;
  disabled: boolean;
  value?: string;
  placeholder?: string;
};

export function InputDisabledWidget() {
  const states: DisabledState[] = [
    { label: "Enabled", disabled: false, placeholder: "Enabled input" },
    { label: "Disabled (placeholder)", disabled: true, placeholder: "Disabled input" },
    { label: "Disabled (value)", disabled: true, value: "Cannot edit this" },
  ];
  const [highlighted, setHighlighted] = useState<DisabledState | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Input disabled={highlighted.disabled} value={highlighted.value} placeholder={highlighted.placeholder} />,
            )
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={states}
        renderCell={({ row: state, key }) => (
          <Input key={key} disabled={state.disabled} value={state.value} placeholder={state.placeholder} />
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
