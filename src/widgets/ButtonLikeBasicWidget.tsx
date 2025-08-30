import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { TDesignVariant } from "../shared/design/types";

export function ButtonLikeBasicWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];
  const examples = [
    { label: "Basic", props: {} },
    { label: "With Icon", props: { startIcon: <UserIcon /> } },
  ];

  const [highlighted, setHighlighted] = useState<{
    variant: TDesignVariant;
    example: (typeof examples)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<ButtonLike variant="${highlighted.variant}"${highlighted.example.props.startIcon ? " startIcon={<UserIcon />}" : ""}>${highlighted.example.label}</ButtonLike>`
          : "// Hover a ButtonLike to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={examples}
        renderCell={({ row: variant, column: example, key }) => (
          <ButtonLike key={key} variant={variant} height="10" {...example.props}>
            {example.label}
          </ButtonLike>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { variant: cell.row, example: cell.column } : null)}
      />
    </Grid>
  );
}
