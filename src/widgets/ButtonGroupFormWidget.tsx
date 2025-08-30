import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

export function ButtonGroupFormWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup>
  <Button variant="solid" color="blue">Save</Button>
  <Button>Cancel</Button>
  <Button color="gray">Reset</Button>
</ButtonGroup>`}
      </CodeHighlight>
      <Paper bg="neutral.900" p="3">
        <FrameGroup height="10">
          <Button variant="solid" color="blue">
            Save
          </Button>
          <Button>Cancel</Button>
          <Button color="gray">Reset</Button>
        </FrameGroup>
      </Paper>
    </Grid>
  );
}
