import { CheckCircleIcon, XCircleIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { css } from "../../styled-system/css";
import { Grid, VStack } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

const okIcon = (
  <CheckCircleIcon className={css({ display: "inline-flex", color: "green.600", mb: "1" })} weight="fill" />
);
const notOkIcon = <XCircleIcon className={css({ display: "inline-flex", color: "red.600", mb: "1" })} weight="fill" />;

export function FrameSlotsAlignementWidget() {
  const examples = [
    {
      element: <Frame style={{ width: "150px" }} endIcon={<XIcon />} />,
      description: (
        <p>
          {okIcon} Using only <code>endIcon</code> is fine
        </p>
      ),
    },
    {
      element: <Frame style={{ width: "150px" }} endSlot={<Frame variant="solid" startIcon={<XIcon />} />} />,
      description: (
        <p>
          {notOkIcon} Using only <code>endSlot</code> does not align properly
        </p>
      ),
    },
    {
      element: (
        <Frame
          style={{ width: "150px" }}
          endSlot={<Frame variant="solid" startIcon={<XIcon />} style={{ marginLeft: "auto" }} />}
        />
      ),
      description: (
        <p>
          {okIcon} Using <code>marginLeft: 'auto'</code> on <code>endSlot</code> aligns properly
        </p>
      ),
    },
    {
      element: (
        <Frame style={{ width: "150px" }} endSlot={<Frame variant="solid" startIcon={<XIcon />} />}>
          Hey
        </Frame>
      ),
      description: (
        <p>
          {okIcon} Using <code>endSlot</code> with text children
        </p>
      ),
    },
    {
      element: (
        <Frame style={{ width: "150px" }} endSlot={<Frame variant="solid" startIcon={<XIcon />} />}>
          <span>Hey</span>
        </Frame>
      ),
      description: (
        <p>
          {notOkIcon} Using <code>endSlot</code> with non-text children does not align properly
        </p>
      ),
    },
    {
      element: (
        <Frame style={{ width: "150px" }} endSlot={<Frame variant="solid" startIcon={<XIcon />} />}>
          <span style={{ flex: 1 }}>Hey</span>
        </Frame>
      ),
      description: (
        <p>
          {okIcon} Setting <code>flex: 1</code> on non-text <code>children</code> aligns properly
        </p>
      ),
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof examples)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? printElement(highlighted.element) : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={examples}
        renderCell={({ row: example, key }) => (
          <VStack key={key} alignItems="start" gap="1">
            <div className={prose()}>{example.description}</div>
            {example.element}
          </VStack>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
