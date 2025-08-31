import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameHeightWidget() {
  const heights: TDesignHeight[] = ["6", "7", "8", "9", "10", "11", "12"];

  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Frame height={highlighted}>Height {highlighted}</Frame>)
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => (
          <Frame key={key} height={height}>
            Height {height}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? cell.row : null)}
      />
    </Grid>
  );
}
