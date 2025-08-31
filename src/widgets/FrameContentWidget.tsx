import { CaretDownIcon, UserIcon } from "@phosphor-icons/react";
import { cloneElement, useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

export function FrameContentWidget() {
  const examples = [
    <Frame>Save Document</Frame>,
    <Frame startIcon={<UserIcon />}>Save</Frame>,
    <Frame endIcon={<CaretDownIcon />}>Options</Frame>,
    <Frame endIcon={<CaretDownIcon />} style={{ width: 150 }}>
      Options
    </Frame>,
    <Frame startIcon={<UserIcon />} endIcon={<CaretDownIcon />}>
      Profile
    </Frame>,
    <Frame startIcon={<UserIcon />} />,
    <Frame />,
  ];

  const [highlighted, setHighlighted] = useState<(typeof examples)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(highlighted) : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={examples}
        renderCell={({ row: example, key }) => cloneElement(example, { key })}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
