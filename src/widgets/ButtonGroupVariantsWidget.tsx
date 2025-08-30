import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { TDesignVariant } from "../shared/design/types";

export function ButtonGroupVariantsWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighted, setHighlighted] = useState<TDesignVariant | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonGroup variant="${highlighted}">
  {/* Button children */}
</ButtonGroup>`
          : "// Hover a button group to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        renderCell={({ row: variant, key }) => (
          <ButtonGroup key={key} variant={variant} height="10" color="blue">
            <Button>Action</Button>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
