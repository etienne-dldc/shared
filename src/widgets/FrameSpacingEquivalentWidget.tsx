import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignSpacing } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameSpacingEquivalentWidget() {
  const examples = [
    { spacing: "6" as TDesignSpacing, height: 10 },
    { spacing: "8" as TDesignSpacing, height: 10 },
    { spacing: "10" as TDesignSpacing, height: 10 },
    { spacing: "12" as TDesignSpacing, height: 10 },
  ];

  const [highlighted, setHighlighted] = useState<(typeof examples)[number] | null>();

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame height={highlighted.height as any} spacing={highlighted.spacing} startIcon={<UserIcon />}>
                Content
              </Frame>,
            )
          : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={examples}
        renderCell={({ row: example, key }) => (
          <Frame key={key} height={example.height as any} spacing={example.spacing} startIcon={<UserIcon />}>
            Content
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
