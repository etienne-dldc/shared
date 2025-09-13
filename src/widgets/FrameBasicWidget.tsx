import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Frame } from "../shared/components/frame/Frame";
import { printElement } from "./utils/printElement";

export function FrameBasicWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<Frame>Basic Frame</Frame>)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <Frame>Basic Frame</Frame>
      </Paper>
    </Grid>
  );
}
