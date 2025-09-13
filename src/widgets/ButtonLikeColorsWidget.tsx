import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { TDesignVariant, TPaletteColor } from "../shared/design/types";

export function ButtonLikeColorsWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost", "input"];
  const colors: TPaletteColor[] = ["blue", "green", "red", "orange", "purple", "gray"];

  const [highlighted, setHighlighted] = useState<{ variant: TDesignVariant; color: TPaletteColor } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonLike variant="${highlighted.variant}" color="${highlighted.color}" startIcon={<UserIcon />}>${highlighted.color}</ButtonLike>`
          : "// Hover a ButtonLike to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={colors}
        renderCell={({ row: variant, column: color, key }) => (
          <ButtonLike key={key} variant={variant} color={color} startIcon={<UserIcon />}>
            {color}
          </ButtonLike>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { variant: cell.row, color: cell.column } : null)}
      />
    </Grid>
  );
}
