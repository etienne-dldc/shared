import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TFrameContentPadding } from "../shared/components/frame/FrameContentFragment";
import { printElement } from "./utils/printElement";

export function FramePaddingWidget() {
  const paddings: TFrameContentPadding[] = ["auto", "text", "icon", "none"];
  const examples = [
    { props: { children: "Hello World" } },
    { props: { startIcon: <UserIcon /> } },
    { props: { children: "Hey", endIcon: <UserIcon /> } },
  ];

  const [highlighted, setHighlighted] = useState<{
    padding: TFrameContentPadding;
    example: (typeof examples)[number];
  } | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(<Frame padding={highlighted.padding} {...highlighted.example.props} />)
          : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={paddings}
        columnsDims={examples}
        renderCell={({ row: padding, column: example, key }) => (
          <Frame key={key} padding={padding} {...example.props} />
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { padding: cell.row, example: cell.column } : null)}
      />
    </Grid>
  );
}
