import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameSpacingAlignWidget() {
  const heights: TDesignHeight[] = ["6", "8", "10", "12"];
  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame spacing="8" height={highlighted}>
                Height {highlighted}
              </Frame>,
            )
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => (
          <Frame key={key} height={height} spacing="8" css={{ w: "full" }}>
            Height {height}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
