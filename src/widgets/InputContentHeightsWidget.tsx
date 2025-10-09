import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/input/Input";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function InputContentHeightsWidget() {
  const contentHeights: TDesignHeight[] = ["6", "7", "8", "9"];
  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Input height="10" contentHeight={highlighted} placeholder={`Content height ${highlighted}`} />,
            )
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentHeights}
        renderCell={({ row: contentHeight, key }) => (
          <Input key={key} height="10" contentHeight={contentHeight} placeholder={`Content height ${contentHeight}`} />
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
