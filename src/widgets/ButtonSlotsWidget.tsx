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
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} />}',
    },
    {
      label: "Nested Button End",
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} />,
      code: 'endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} />}',
    },
    {
      label: "Both Slots",
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} />,
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} />} endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} />}',
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
          <Button key={key} startSlot={config.startSlot} endSlot={config.endSlot}>
            {config.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
