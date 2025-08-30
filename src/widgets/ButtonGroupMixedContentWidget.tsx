import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { ButtonLike } from "../shared/components/button/ButtonLike";

export function ButtonGroupMixedContentWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup>
  <ButtonLike>Status</ButtonLike>
  <Button>Settings</Button>
  <Button>Action</Button>
</ButtonGroup>`}
      </CodeHighlight>
      <div>
        <ButtonGroup height="10">
          <ButtonLike>Connected</ButtonLike>
          <Button>Settings</Button>
          <Button>Disconnect</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
