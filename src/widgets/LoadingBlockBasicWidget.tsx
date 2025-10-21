import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { LoadingBlock } from "../shared/components/common/LoadingBlock";
import { printElement } from "./utils/printElement";

export function LoadingBlockBasicWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<LoadingBlock />)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <LoadingBlock />
      </Paper>
    </Grid>
  );
}
