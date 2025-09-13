import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameContentHeightWidget() {
  const contentHeights: TDesignHeight[] = ["4", "5", "6", "7", "8"];

  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame height="12" contentHeight={highlighted}>
                Content {highlighted}
              </Frame>,
            )
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentHeights}
        renderCell={({ row: contentHeight, key }) => (
          <Frame key={key} height="12" contentHeight={contentHeight}>
            Content {contentHeight}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
