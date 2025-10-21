import { IconWeight } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { LoadingIcon } from "../shared/components/common/LoadingIcon";

export function LoadingIconWeightsWidget() {
  const weights: { label: string; weight: IconWeight }[] = [
    { label: "Thin", weight: "thin" },
    { label: "Light", weight: "light" },
    { label: "Regular", weight: "regular" },
    { label: "Bold", weight: "bold" },
    { label: "Duotone", weight: "duotone" },
    { label: "Fill", weight: "fill" },
  ];

  const [highlighted, setHighlighted] = useState<(typeof weights)[number] | null>(null);

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<LoadingIcon size={60} weight="${highlighted.weight}" />`
          : "// Hover an icon to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={weights}
        renderCell={({ row }) => <LoadingIcon size={60} weight={row.weight} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
