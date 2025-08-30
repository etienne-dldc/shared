import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";

export function ButtonSlotsWidget() {
  const slotConfigs = [
    {
      label: "Nested Button Start",
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />}',
    },
    {
      label: "Nested Button End",
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} height="6" />,
      code: 'endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} height="6" />}',
    },
    {
      label: "Both Slots",
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />,
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} height="6" />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />} endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} height="6" />}',
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof slotConfigs)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.code}>${highlighted.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={slotConfigs}
        renderCell={({ row: config, key }) => (
          <Button key={key} startSlot={config.startSlot} endSlot={config.endSlot} height="10">
            {config.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
