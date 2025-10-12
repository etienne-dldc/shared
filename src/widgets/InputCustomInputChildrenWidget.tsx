import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { FrameInputContent } from "../shared/components/frame/FrameInputContent";
import { Input } from "../shared/components/input/Input";
import { printElement } from "./utils/printElement";

export function InputCustomInputChildrenWidget() {
  const example = (
    <Input>
      <FrameInputContent placeholder="Enter text..." maxLength={20} autoComplete="off" />
    </Input>
  );

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(example)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>{example}</Paper>
    </Grid>
  );
}
