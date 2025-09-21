import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { DefaultDesignProvider } from "../shared/components/core/DesignContext";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

const example = (
  <DefaultDesignProvider height="9">
    <Frame>Outer</Frame>
    <DefaultDesignProvider variant="solid">
      <Button>Inner</Button>
    </DefaultDesignProvider>
  </DefaultDesignProvider>
);

export function DefaultDesignProviderNestedWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(example)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3", display: "flex", gap: "2", alignItems: "start" }}>{example}</Paper>
    </Grid>
  );
}
