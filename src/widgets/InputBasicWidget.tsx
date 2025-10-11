import { useState } from "react";
import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Input } from "../shared/components/input/Input";
import { printElement } from "./utils/printElement";

export function InputBasicWidget() {
  const [value, setValue] = useState("");

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<Input />)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </Paper>
    </Grid>
  );
}
