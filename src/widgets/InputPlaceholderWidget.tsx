import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Input } from "../shared/components/input/Input";
import { printElement } from "./utils/printElement";

export function InputPlaceholderWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<Input placeholder="Enter your name..." />)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3", gap: "2" }}>
        <Input placeholder="Enter your name..." />
      </Paper>
    </Grid>
  );
}
