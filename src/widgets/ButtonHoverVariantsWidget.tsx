import { useState } from "react";
import { css } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button, ButtonProps } from "../shared/components/button/Button";
import { TDesignVariant } from "../shared/design/types";

export function ButtonHoverVariantsWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighted, setHighlighted] = useState<ButtonProps | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="subtle" hoverVariant="${highlighted.hoverVariant}" />`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        renderCell={({ row: hoverVariant, key }) => (
          <Button key={key} variant="subtle" hoverVariant={hoverVariant} height="10">
            <em className={css({ fontWeight: "bold" })}>{hoverVariant}</em> on hover
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { hoverVariant: cell?.row } : null)}
      />
    </Grid>
  );
}
