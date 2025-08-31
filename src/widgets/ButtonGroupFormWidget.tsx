import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { printElement } from "./utils/printElement";

export function ButtonGroupFormWidget() {
  const element = (
    <FrameGroup>
      <Button variant="solid" color="blue">
        Save
      </Button>
      <Button>Cancel</Button>
      <Button color="gray">Reset</Button>
    </FrameGroup>
  );

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(element)}
      </CodeHighlight>
      <Paper bg="neutral.900" p="3">
        {element}
      </Paper>
    </Grid>
  );
}
