import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

export function ButtonGroupDirectionWidget() {
  const directions = [
    {
      label: "Horizontal",
      direction: "horizontal" as const,
      code: `<ButtonGroup direction="horizontal">
  {/* Button children */}
</ButtonGroup>`,
    },
    {
      label: "Vertical",
      direction: "vertical" as const,
      code: `<ButtonGroup direction="vertical">
  {/* Button children */}
</ButtonGroup>`,
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof directions)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted?.code || "// Hover a button group to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={directions}
        renderCell={({ row: direction, key }) => (
          <FrameGroup key={key} direction={direction.direction} height="10">
            <Button>Save</Button>
            <Button>Cancel</Button>
            <Button>Reset</Button>
          </FrameGroup>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
