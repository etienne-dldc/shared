import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/input/Input";
import { TDesignVariant } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function InputVariantsWidget() {
  const variants: TDesignVariant[] = ["input", "surface", "subtle", "ghost"];
  const [highlighted, setHighlighted] = useState<TDesignVariant | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Input variant={highlighted} placeholder={`${highlighted} variant`} />)
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        renderCell={({ row: variant, key }) => <Input key={key} variant={variant} placeholder={`${variant} variant`} />}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
