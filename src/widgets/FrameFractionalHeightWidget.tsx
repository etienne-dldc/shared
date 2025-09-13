import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";

export function FrameFractionalHeightWidget() {
  const heights: { value: string; label: string }[] = [
    { value: "4", label: "4 (16px)" },
    { value: "4x", label: "4x (18px)" },
    { value: "4_x" as any, label: "4_x (17px)" },
    { value: "4__x" as any, label: "4__x (16.5px)" },
    { value: "5", label: "5 (20px)" },
    { value: "5x", label: "5x (22px)" },
    { value: "5_x" as any, label: "5_x (21px)" },
  ];

  const [highlighted, setHighlighted] = useState<{ value: string; label: string } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Frame height="${highlighted.value}">Height ${highlighted.value}</Frame>`
          : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => (
          <Frame key={key} height={height.value as any}>
            {height.label}
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? cell.row : null)}
      />
    </Grid>
  );
}
