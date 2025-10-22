import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/form/Input";
import { TPaletteColor } from "../shared/design/types";
import { printElement } from "./utils/printElement";

type HighlightState = {
  label: string;
  highlighted: boolean;
  highlightColor?: TPaletteColor;
};

export function InputHighlightedWidget() {
  const states: HighlightState[] = [
    { label: "Normal state", highlighted: false },
    { label: "Highlighted (blue)", highlighted: true, highlightColor: "blue" },
    { label: "Error state (red)", highlighted: true, highlightColor: "red" },
    { label: "Success state (green)", highlighted: true, highlightColor: "green" },
  ];
  const [highlightedState, setHighlightedState] = useState<HighlightState | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlightedState
          ? printElement(
              <Input
                highlighted={highlightedState.highlighted}
                highlightColor={highlightedState.highlightColor}
                placeholder={highlightedState.label}
              />,
            )
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={states}
        renderCell={({ row: state, key }) => (
          <Input
            key={key}
            highlighted={state.highlighted}
            highlightColor={state.highlightColor}
            placeholder={state.label}
          />
        )}
        onHighlightedCell={(cell) => setHighlightedState(cell?.row ?? null)}
      />
    </Grid>
  );
}
