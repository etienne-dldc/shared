import { GearIcon, HouseIcon, SignOutIcon } from "@phosphor-icons/react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

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
      <div>
        <ButtonGroup height="10" variant="surface">
          <Button startIcon={<HouseIcon />}>Home</Button>
          <Button startIcon={<GearIcon />}>Settings</Button>
          <Button startIcon={<SignOutIcon />}>Logout</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
