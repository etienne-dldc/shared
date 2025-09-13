import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

export function FrameInteractiveWidget() {
  const states = [
    { label: "Non-interactive", interactive: false },
    { label: "Interactive", interactive: true },
  ];

  const [highlighted, setHighlighted] = useState<{ state: (typeof states)[number] } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame interactive={highlighted.state.interactive || undefined}>{highlighted.state.label}</Frame>,
            )
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={states}
        renderCell={({ row: state, key }) => (
          <Frame key={key} interactive={state.interactive}>
            {state.label}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { state: cell.row } : null)}
      />
    </Grid>
  );
}
