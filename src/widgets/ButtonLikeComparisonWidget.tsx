import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { TDesignVariant } from "../shared/design/types";

export function ButtonLikeComparisonWidget() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost", "input"];
  const types = [
    { label: "Button", Component: Button, description: "Interactive with hover states" },
    { label: "ButtonLike", Component: ButtonLike, description: "Static, no hover states" },
  ];

  const [highlighted, setHighlighted] = useState<{ variant: TDesignVariant; type: (typeof types)[number] } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<${highlighted.type.label} variant="${highlighted.variant}" startIcon={<UserIcon />}>Label</${highlighted.type.label}>`
          : "// Hover an element to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={types}
        renderCell={({ row: variant, column: type, key }) => {
          const { Component } = type;
          return (
            <Component key={key} variant={variant} startIcon={<UserIcon />}>
              {type.label}
            </Component>
          );
        }}
        onHighlightedCell={(cell) => setHighlighted(cell ? { variant: cell.row, type: cell.column } : null)}
      />
    </Grid>
  );
}
