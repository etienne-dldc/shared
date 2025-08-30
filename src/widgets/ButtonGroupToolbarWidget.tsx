import { GearIcon, HouseIcon, SignOutIcon } from "@phosphor-icons/react";
import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

export function ButtonGroupToolbarWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup>
  <Button startIcon={<HouseIcon />}>Home</Button>
  <Button startIcon={<GearIcon />}>Settings</Button>
  <Button startIcon={<SignOutIcon />}>Logout</Button>
</ButtonGroup>`}
      </CodeHighlight>
      <Paper bg="neutral.900" p="3">
        <FrameGroup height="10" variant="surface">
          <Button startIcon={<HouseIcon />}>Home</Button>
          <Button startIcon={<GearIcon />}>Settings</Button>
          <Button startIcon={<SignOutIcon />}>Logout</Button>
        </FrameGroup>
      </Paper>
    </Grid>
  );
}
