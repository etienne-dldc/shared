import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function ButtonContentHeightsWidget() {
  const contentHeights: TDesignHeight[] = ["4", "6", "8", "10"];
  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Button height="12" contentHeight={highlighted}>
                Height {highlighted}
              </Button>,
            )
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentHeights}
        renderCell={({ row: contentHeight, key }) => (
          <Button key={key} height="12" contentHeight={contentHeight}>
            Content Height {contentHeight}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
