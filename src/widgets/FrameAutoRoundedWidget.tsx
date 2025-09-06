import { cloneElement, useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignRounded } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameAutoRoundedWidget() {
  const roundedVariants: TDesignRounded[] = ["1", "2", "3", "4", "5"];

  const [highlighted, setHighlighted] = useState<TDesignRounded | null>();

  const renderNestedFrames = (rounded: TDesignRounded) => (
    <Frame rounded={rounded} height="12" padding="icon" contentHeight="10">
      <Frame contentHeight="8" padding="icon">
        <Frame>Nested</Frame>
      </Frame>
    </Frame>
  );

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(renderNestedFrames(highlighted)) : "// Hover a frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={roundedVariants}
        renderCell={({ row: rounded, key }) => cloneElement(renderNestedFrames(rounded), { key })}
        onHighlightedCell={({ row }) => setHighlighted(row)}
      />
    </Grid>
  );
}
