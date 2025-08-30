import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

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
      <div>
        <ButtonGroup height="10">
          <Button variant="solid" color="blue">
            Save
          </Button>
          <Button>Cancel</Button>
          <Button color="gray">Reset</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
