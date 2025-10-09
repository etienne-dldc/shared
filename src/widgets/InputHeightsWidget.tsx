import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/input/Input";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function InputHeightsWidget() {
  const heights: TDesignHeight[] = ["6", "8", "10", "12"];
  const [highlighted, setHighlighted] = useState<TDesignHeight | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Input height={highlighted} placeholder={`Height ${highlighted}`} />)
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => <Input key={key} height={height} placeholder={`Height ${height}`} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
