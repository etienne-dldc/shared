import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Grid, Paper } from "../../styled-system/jsx";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Input } from "../shared/components/form/Input";
import { printElement } from "./utils/printElement";

export function InputAutoFocusWidget() {
  const example = <Input startIcon={<MagnifyingGlassIcon />} placeholder="Click the icon to focus..." />;

  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(example)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>{example}</Paper>
    </Grid>
  );
}
