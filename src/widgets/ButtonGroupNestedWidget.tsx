import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

export function ButtonGroupNestedWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup>
            <Button>File</Button>
            <ButtonGroup roundedEnds="none">
              <Button>New</Button>
              <Button>Open</Button>
              <Button>Save</Button>
            </ButtonGroup>
            <Button>Edit</Button>
          </ButtonGroup>`}
      </CodeHighlight>
      <div>
        <ButtonGroup height="10">
          <Button>File</Button>
          <ButtonGroup roundedEnds="none">
            <Button>New</Button>
            <Button>Open</Button>
            <Button>Save</Button>
          </ButtonGroup>
          <Button>Edit</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
