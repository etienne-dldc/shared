import { CaretDownIcon, CirclesFourIcon, DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { ButtonLike } from "../shared/components/button/ButtonLike";

export function ButtonLikeIconsWidget() {
  const iconConfigs = [
    { label: "No Icons", startIcon: undefined, endIcon: undefined },
    { label: "Start Icon", startIcon: <UserIcon />, endIcon: undefined },
    { label: "End Icon", startIcon: undefined, endIcon: <CaretDownIcon /> },
    { label: "Both Icons", startIcon: <CirclesFourIcon />, endIcon: <DotsThreeVerticalIcon /> },
  ];

  const examples = [
    { label: "Label", variant: "solid" as const },
    { label: "Action", variant: "surface" as const },
  ];

  const [highlighted, setHighlighted] = useState<{
    iconConfig: (typeof iconConfigs)[number];
    example: (typeof examples)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? (() => {
              const { iconConfig, example } = highlighted;
              const startIconCode = iconConfig.startIcon ? " startIcon={<UserIcon />}" : "";
              const endIconCode = iconConfig.endIcon ? " endIcon={<CaretDownIcon />}" : "";
              return `<ButtonLike variant="${example.variant}"${startIconCode}${endIconCode}>${example.label}</ButtonLike>`;
            })()
          : "// Hover a ButtonLike to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={iconConfigs}
        columnsDims={examples}
        renderCell={({ row: iconConfig, column: example, key }) => (
          <ButtonLike key={key} variant={example.variant} startIcon={iconConfig.startIcon} endIcon={iconConfig.endIcon}>
            {example.label}
          </ButtonLike>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { iconConfig: cell.row, example: cell.column } : null)}
      />
    </Grid>
  );
}
