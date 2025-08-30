import { ChartBarIcon, FileTextIcon, UserIcon } from "@phosphor-icons/react";
import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { FrameGroup } from "../shared/components/frame/FrameGroup";

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
      <Paper bg="neutral.900" p="3">
        <FrameGroup direction="vertical" height="10" variant="subtle">
          <Button startIcon={<UserIcon />}>Profile</Button>
          <Button startIcon={<FileTextIcon />}>Documents</Button>
          <Button startIcon={<ChartBarIcon />}>Analytics</Button>
        </FrameGroup>
      </Paper>
    </Grid>
  );
}
