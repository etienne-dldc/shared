import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { TDesignSize } from "../shared/design/types";

export function ButtonLikeHeightsWidget() {
  const sizes: TDesignSize[] = ["3", "4", "5", "6", "7", "8", "10", "12"];
  const contents = [
    { label: "Text", props: {} },
    { label: "With Icon", props: { startIcon: <UserIcon /> } },
  ];

  const [highlighted, setHighlighted] = useState<{ size: TDesignSize; content: (typeof contents)[number] } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonLike height="${highlighted.size}"${highlighted.content.props.startIcon ? " startIcon={<UserIcon />}" : ""}>${highlighted.content.label}</ButtonLike>`
          : "// Hover a ButtonLike to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={sizes}
        columnsDims={contents}
        renderCell={({ row: size, column: content, key }) => (
          <ButtonLike key={key} variant="solid" height={size} {...content.props}>
            {content.label}
          </ButtonLike>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { size: cell.row, content: cell.column } : null)}
      />
    </Grid>
  );
}
