import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TItemlContentPaddingResolved } from "../shared/components/item-content/types";
import { printElement } from "./utils/printElement";

export function FrameDirectionalPaddingWidget() {
  const paddings: TItemlContentPaddingResolved[] = ["text", "icon", "none"];
  const propName = ["startPadding", "endPadding"];

  const [highlighted, setHighlighted] = useState<{
    padding: TItemlContentPaddingResolved;
    propName: (typeof propName)[number];
  } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Frame {...{ [highlighted.propName]: highlighted.padding }}>Text</Frame>)
          : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={paddings}
        columnsDims={propName}
        renderCell={({ row: padding, column: propName, key }) => (
          <Frame key={key} {...{ [propName]: padding }}>
            Text
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { padding: cell.row, propName: cell.column } : null)}
      />
    </Grid>
  );
}
