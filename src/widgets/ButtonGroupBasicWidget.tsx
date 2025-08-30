import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

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
      <div>
        <ButtonGroup height="10">
          <Button>Open</Button>
          <Button>Edit</Button>
          <Button>Close</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
