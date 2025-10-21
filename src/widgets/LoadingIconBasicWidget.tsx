import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { LoadingIcon } from "../shared/components/common/LoadingIcon";
import { printElement } from "./utils/printElement";

export function LoadingIconBasicWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<LoadingIcon />)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <LoadingIcon />
      </Paper>
    </Grid>
  );
}
