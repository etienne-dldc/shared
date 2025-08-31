import { CaretDownIcon, CirclesFourIcon, DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";

export function ButtonIconsWidget() {
  const iconConfigs = [
    { children: "Start Icon", startIcon: <UserIcon />, endIcon: undefined, code: "startIcon={<UserIcon />}" },
    { children: "End Icon", startIcon: undefined, endIcon: <CirclesFourIcon />, code: "endIcon={<CirclesFourIcon />}" },
    {
      children: "Both Icons",
      startIcon: <UserIcon />,
      endIcon: <CaretDownIcon />,
      code: "startIcon={<UserIcon />} endIcon={<CaretDownIcon />}",
    },
    {
      startIcon: <DotsThreeVerticalIcon />,
      endIcon: undefined,
      children: undefined,
      code: "startIcon={<DotsThreeVerticalIcon />}",
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof iconConfigs)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.code} ${highlighted.children !== undefined ? `>${highlighted.children}</Button>` : " />"}`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={iconConfigs}
        renderCell={({ row: config, key }) => (
          <Button key={key} startIcon={config.startIcon} endIcon={config.endIcon}>
            {config.children}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}
