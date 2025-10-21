import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { LoadingIcon } from "../shared/components/common/LoadingIcon";
import { printElement } from "./utils/printElement";

export function LoadingIconSizesWidget() {
  const sizes = [24, 48, 60, 96];

  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(<LoadingIcon size={highlighted} />) : "// Hover an icon to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={sizes}
        renderCell={({ row: size }) => <LoadingIcon size={size} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
