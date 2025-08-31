import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

export function ButtonGroupDividersWidget() {
  const innerDividerOptions = [
    { label: "With Inner Dividers", value: true },
    { label: "No Inner Dividers", value: false },
  ];

  const [highlighted, setHighlighted] = useState<{
    inner: (typeof innerDividerOptions)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonGroup 
  innerDividers={${highlighted.inner.value}}
>
  {/* Button children */}
</ButtonGroup>`
          : "// Hover a button group to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={innerDividerOptions}
        renderCell={({ row: inner, key }) => (
          <FrameGroup key={key} innerDividers={inner.value}>
            <Button>First</Button>
            <Button>Second</Button>
            <Button>Third</Button>
          </FrameGroup>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { inner: cell.row } : null)}
      />
    </Grid>
  );
}
