import { MagnifyingGlassIcon, PaperPlaneIcon, UserIcon } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Input } from "../shared/components/form/Input";
import { printElement } from "./utils/printElement";

type IconState = {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function InputIconsWidget() {
  const states: IconState[] = [
    { label: "Search...", startIcon: <MagnifyingGlassIcon /> },
    { label: "Send message", endIcon: <PaperPlaneIcon /> },
    { label: "Username", startIcon: <UserIcon />, endIcon: <PaperPlaneIcon /> },
  ];
  const [highlighted, setHighlighted] = useState<IconState | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Input startIcon={highlighted.startIcon} endIcon={highlighted.endIcon} placeholder={highlighted.label} />,
            )
          : "// Hover an input to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={states}
        renderCell={({ row: state, key }) => (
          <Input key={key} startIcon={state.startIcon} endIcon={state.endIcon} placeholder={state.label} />
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
