import { MagnifyingGlassIcon, PaperPlaneIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid, VStack } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { Input } from "../shared/components/input/Input";
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
        <FrameGroup variant="solid" color="green">
          <Input placeholder="Type a message..." startIcon={<UserIcon />} />
          <Button startIcon={<PaperPlaneIcon />}>Send</Button>
        </FrameGroup>
      ),
    },
    {
      label: "Form with Labels",
      element: (
        <VStack css={{ gap: "2" }}>
          <FrameGroup>
            <ButtonLike css={{ flexShrink: 0, w: "20" }}>Username</ButtonLike>
            <Input placeholder="Enter username" css={{ flex: "1" }} />
          </FrameGroup>
          <FrameGroup>
            <ButtonLike css={{ flexShrink: 0, w: "20" }}>Email</ButtonLike>
            <Input placeholder="Enter email" css={{ flex: "1" }} />
            <Button variant="solid" color="blue">
              Save
            </Button>
          </FrameGroup>
        </VStack>
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
