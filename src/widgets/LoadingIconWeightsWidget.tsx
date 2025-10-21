import { IconWeight } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { LoadingIcon } from "../shared/components/common/LoadingIcon";
import { printElement } from "./utils/printElement";

export function LoadingIconWeightsWidget() {
  const weights: IconWeight[] = ["thin", "light", "regular", "bold", "duotone", "fill"];

  const [highlighted, setHighlighted] = useState<IconWeight | null>(null);

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(<LoadingIcon size={60} weight={highlighted} />) : "// Hover an icon to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={weights}
        renderCell={({ row: weight }) => <LoadingIcon size={60} weight={weight} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
