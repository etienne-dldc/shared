import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { cloneElement, useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

export function FrameSlotsWidget() {
  const examples = [
    <Frame startSlot={<Frame variant="solid" startIcon={<PlusIcon />} />}>Start Slot</Frame>,
    <Frame endSlot={<Frame variant="solid" startIcon={<XIcon />} />}>End Slot</Frame>,
    <Frame
      startSlot={<Frame variant="solid" startIcon={<PlusIcon />} />}
      endSlot={<Frame variant="solid" startIcon={<XIcon />} />}
    >
      Both Slots
    </Frame>,
    <Frame startSlot={<span style={{ width: "14px", height: "14px", background: "indianred" }} />}>
      Custom Content
    </Frame>,
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
