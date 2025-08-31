import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignRounded } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameRoundedWidget() {
  const roundedValues: TDesignRounded[] = ["0", "0x", "1", "2", "3", "4", "5"];

  const [highlighted, setHighlighted] = useState<TDesignRounded | null>(null);

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted !== null
          ? printElement(<Frame rounded={highlighted}>Rounded {highlighted}</Frame>)
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={roundedValues}
        renderCell={({ row: rounded, key }) => (
          <Frame key={key} rounded={rounded}>
            Rounded {rounded}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? cell.row : null)}
      />
    </Grid>
  );
}
