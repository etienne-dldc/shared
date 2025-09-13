import { CaretDownIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { TDesignSpacing } from "../shared/design/types";

export function ButtonSpacingWidget() {
  const spacings: TDesignSpacing[] = ["2", "4", "6", "8"];
  const [highlighted, setHighlighted] = useState<TDesignSpacing | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button spacing="${highlighted}" startIcon={<UserIcon />} endIcon={<CaretDownIcon />}>Spacing ${highlighted}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={spacings}
        renderCell={({ row: spacing, key }) => (
          <Button key={key} spacing={spacing} startIcon={<UserIcon />} endIcon={<CaretDownIcon />}>
            Spacing {spacing}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
