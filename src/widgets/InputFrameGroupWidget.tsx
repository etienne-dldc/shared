import { MagnifyingGlassIcon, PaperPlaneIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { Input } from "../shared/components/form/Input";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { printElement } from "./utils/printElement";

type Example = {
  label: string;
  element: React.ReactElement;
};

export function InputFrameGroupWidget() {
  const [highlighted, setHighlighted] = useState<Example | null>();

  const examples: Example[] = [
    {
      label: "Search Bar",
      element: (
        <FrameGroup variant="solid" color="blue">
          <Input placeholder="Search..." startIcon={<MagnifyingGlassIcon />} />
          <Button>Search</Button>
        </FrameGroup>
      ),
    },
    {
      label: "Message Form",
      element: (
        <FrameGroup variant="surface" color="green">
          <Input placeholder="Type a message..." startIcon={<UserIcon />} />
          <Button variant="solid" startIcon={<PaperPlaneIcon />}>
            Send
          </Button>
        </FrameGroup>
      ),
    },
    {
      label: "Form item",
      element: (
        <FrameGroup variant="input">
          <ButtonLike>Username</ButtonLike>
          <Input placeholder="Enter username" />
        </FrameGroup>
      ),
    },
  ];

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(highlighted.element) : "// Hover an example to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={examples}
        renderCell={({ row: example, key }) => <div key={key}>{example.element}</div>}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
