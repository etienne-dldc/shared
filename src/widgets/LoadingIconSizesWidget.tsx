import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { LoadingIcon } from "../shared/components/common/LoadingIcon";

export function LoadingIconSizesWidget() {
  const sizes = [
    { label: "Small (24)", size: 24 },
    { label: "Medium (48)", size: 48 },
    { label: "Large (60)", size: 60 },
    { label: "Extra Large (96)", size: 96 },
  ];

  const [highlighted, setHighlighted] = useState<(typeof sizes)[number] | null>(null);

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<LoadingIcon size={${highlighted.size}} />`
          : "// Hover an icon to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={sizes}
        renderCell={({ row }) => <LoadingIcon size={row.size} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
