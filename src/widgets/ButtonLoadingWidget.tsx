import { CaretDownIcon, UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";

export function ButtonLoadingWidget() {
  const contentVariations = [
    { children: "Save Changes", code: "" },
    { children: "Save Changes", startIcon: <UserIcon />, code: "startIcon={<UserIcon />}" },
    {
      children: "Save Changes",
      endIcon: <CaretDownIcon />,
      code: "endIcon={<CaretDownIcon />}",
    },
    {
      children: "Save Changes",
      startIcon: <UserIcon />,
      endIcon: <CaretDownIcon />,
      code: "startIcon={<UserIcon />} endIcon={<CaretDownIcon />}",
    },
    { children: undefined, startIcon: <UserIcon />, code: "startIcon={<UserIcon />}" },
  ];

  const loadingStates = [
    { label: "Normal", loading: false, code: "" },
    { label: "Loading", loading: true, code: "loading={true}" },
  ];

  const [highlighted, setHighlighted] = useState<{
    content: (typeof contentVariations)[number];
    loading: (typeof loadingStates)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.content.code} ${highlighted.loading.code} ${highlighted.content.children !== undefined ? `>${highlighted.content.children}</Button>` : "/>"}`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentVariations}
        columnsDims={loadingStates}
        renderCell={({ row: content, column: loadingState, key }) => (
          <Button key={key} loading={loadingState.loading} startIcon={content.startIcon} endIcon={content.endIcon}>
            {content.children}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { content: cell.row, loading: cell.column } : null)}
      />
    </Grid>
  );
}
