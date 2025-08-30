import { ChartBarIcon, FileTextIcon, UserIcon } from "@phosphor-icons/react";
import { Grid } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";

export function ButtonGroupNavigationWidget() {
  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {`<ButtonGroup direction="vertical">
  <Button startIcon={<UserIcon />}>Profile</Button>
  <Button startIcon={<FileTextIcon />}>Documents</Button>
  <Button startIcon={<ChartBarIcon />}>Analytics</Button>
</ButtonGroup>`}
      </CodeHighlight>
      <div>
        <ButtonGroup direction="vertical" height="10" variant="subtle">
          <Button startIcon={<UserIcon />}>Profile</Button>
          <Button startIcon={<FileTextIcon />}>Documents</Button>
          <Button startIcon={<ChartBarIcon />}>Analytics</Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
