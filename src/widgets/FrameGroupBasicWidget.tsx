import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { printElement } from "./utils/printElement";

export function FrameGroupBasicWidget() {
  const element = (
    <FrameGroup>
      <Button>Open</Button>
      <Button>Edit</Button>
      <Button>Close</Button>
    </FrameGroup>
  );

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(element)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>{element}</Paper>
    </Grid>
  );
}
