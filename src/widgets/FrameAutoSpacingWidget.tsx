import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Frame } from "../shared/components/frame/Frame";
import { TDesignHeight } from "../shared/design/types";
import { printElement } from "./utils/printElement";

export function FrameAutoSpacingWidget() {
  const heights: TDesignHeight[] = ["7", "8", "9", "10", "12"];
  const contentHeights: TDesignHeight[] = ["4", "5", "6"];

  const [highlighted, setHighlighted] = useState<{
    height: TDesignHeight;
    contentHeight: TDesignHeight;
  } | null>(null);

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? printElement(
              <Frame height={highlighted.height} contentHeight={highlighted.contentHeight} startIcon={<UserIcon />} />,
            )
          : "// Hover a Frame to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        columnsDims={contentHeights}
        renderCell={({ row: height, column: contentHeight, key }) => (
          <Frame key={key} height={height} contentHeight={contentHeight} startIcon={<UserIcon />} css={{ w: "full" }}>
            Hey
          </Frame>
        )}
        onHighlightedCell={(cell) => setHighlighted({ height: cell.row, contentHeight: cell.column })}
      />
    </Grid>
  );
}
