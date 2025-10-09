import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { printElement } from "./utils/printElement";

export function FrameGroupNestedWidget() {
  const element = (
    <FrameGroup>
      <Button>File</Button>
      <FrameGroup roundedEnds="none">
        <Button>New</Button>
        <Button>Open</Button>
        <Button>Save</Button>
      </FrameGroup>
      <Button>Edit</Button>
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
