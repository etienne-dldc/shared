import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { printElement } from "./utils/printElement";

export function FrameGroupMixedContentWidget() {
  const element = (
    <FrameGroup>
      <ButtonLike>Connected</ButtonLike>
      <Button>Settings</Button>
      <Button>Disconnect</Button>
    </FrameGroup>
  );

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(element)}
      </CodeHighlight>
      <div>{element}</div>
    </Grid>
  );
}
