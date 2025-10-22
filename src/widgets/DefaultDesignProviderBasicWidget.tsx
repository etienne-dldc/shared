import { Fragment, useState } from "react";
import { Grid, HStack, Paper, styled, VStack } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button } from "../shared/components/button/Button";
import { DefaultDesignProvider } from "../shared/components/core/DesignContext";
import { Frame } from "../shared/components/frame/Frame";
import { Input } from "../shared/components/input/Input";
import { printElement } from "./utils/printElement";

export function DefaultDesignProviderBasicWidget() {
  const examples = [
    {
      key: "without",
      label: "Without Provider",
      element: (
        <Fragment>
          <Frame>Frame</Frame>
          <Button>Button</Button>
          <Input placeholder="Input" />
        </Fragment>
      ),
    },
    {
      key: "with",
      label: "With Provider",
      element: (
        <DefaultDesignProvider variant="solid" height="9">
          <Frame>Frame</Frame>
          <Button>Button</Button>
          <Input placeholder="Input" />
        </DefaultDesignProvider>
      ),
    },
  ];

  const [highlighted, setHighlighted] = useState<string | null>(null);

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {(() => {
          if (!highlighted) return "// Hover an example to see the code";
          const example = examples.find((ex) => ex.key === highlighted);
          return example ? printElement(example.element) : "// Example not found";
        })()}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={examples}
        renderCell={({ row }) => (
          <Paper css={{ bg: "neutral.900", p: "3" }}>
            <VStack>
              <styled.div css={{ textStyle: "4", color: "white/40" }}>{row.label}</styled.div>
              <HStack>{row.element}</HStack>
            </VStack>
          </Paper>
        )}
        onHighlightedCell={({ row }) => setHighlighted(row.key)}
        css={{ gap: "4" }}
      />
    </Grid>
  );
}
