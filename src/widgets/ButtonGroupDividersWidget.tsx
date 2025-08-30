import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

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
          <ButtonGroup key={key} height="10" innerDividers={inner.value}>
            <Button>First</Button>
            <Button>Second</Button>
            <Button>Third</Button>
          </ButtonGroup>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { inner: cell.row } : null)}
      />
    </Grid>
  );
}
