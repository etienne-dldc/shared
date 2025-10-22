import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/form/Input";
import { TPaletteColor } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function InputColorsWidget() {
  const colors: TPaletteColor[] = ["blue", "green", "red", "purple", "orange", "neutral"];
  const [highlighted, setHighlighted] = useState<TPaletteColor | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Input color={highlighted} placeholder={`${highlighted} color`} />)
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={colors}
        renderCell={({ row: color, key }) => <Input key={key} color={color} placeholder={`${color} color`} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
