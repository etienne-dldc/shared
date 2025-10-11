import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignVariant, TPaletteColor } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameDisabledWidget() {
  const colors: TPaletteColor[] = ["neutral", "blue", "green", "red", "amber", "purple"];
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost", "input"];

  const [highlighted, setHighlighted] = useState<{ color: TPaletteColor; variant: TDesignVariant } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame
                variant={highlighted.variant}
                color={highlighted.color}
                interactive
                disabled
                startIcon={<UserIcon />}
              >
                Disabled
              </Frame>,
            )
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={colors}
        renderCell={({ row: variant, column: color, key }) => (
          <Frame key={key} variant={variant} color={color} interactive disabled startIcon={<UserIcon />}>
            Disabled
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { color: cell?.column, variant: cell?.row } : null)}
      />
    </Grid>
  );
}
