import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

export function ButtonGroupBasicWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup>
  <Button>Open</Button>
  <Button>Edit</Button>
  <Button>Close</Button>
</ButtonGroup>`}
      </CodeHighlight>
      <Paper bg="neutral.900" p="3">
        <FrameGroup height="10">
          <Button>Open</Button>
          <Button>Edit</Button>
          <Button>Close</Button>
        </FrameGroup>
      </Paper>
    </Grid>
  );
}
