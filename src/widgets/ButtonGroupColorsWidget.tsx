import { HouseIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { TPaletteColor } from "../shared/design/types";

export function ButtonGroupColorsWidget() {
  const colors: TPaletteColor[] = ["blue", "green", "red", "orange", "purple", "gray"];
  const variants = [
    { label: "Solid", variant: "solid" as const },
    { label: "Surface", variant: "surface" as const },
  ];

  const [highlighted, setHighlighted] = useState<{
    color: TPaletteColor;
    variant: (typeof variants)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonGroup variant="${highlighted.variant.variant}" color="${highlighted.color}">
  {/* Button children */}
</ButtonGroup>`
          : "// Hover a button group to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={colors}
        columnsDims={variants}
        renderCell={({ row: color, column: variant, key }) => (
          <FrameGroup key={key} variant={variant.variant} color={color} height="10">
            <Button startIcon={<HouseIcon />}>Home</Button>
            <Button>About</Button>
            <Button>Contact</Button>
          </FrameGroup>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { color: cell.row, variant: cell.column } : null)}
      />
    </Grid>
  );
}
