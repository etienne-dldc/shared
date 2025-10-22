import { css } from "../../styled-system/css";
import { Grid, Paper } from "../../styled-system/jsx";
import { hstack } from "../../styled-system/patterns";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { Input } from "../shared/components/form/Input";
import { colorPaletteClass } from "../shared/design/colors";

export function ProvideColorPaletteWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {[
          `<div className={css(colorPaletteClass.red)}>`,
          `  <Button variant="solid">Button</Button>`,
          `  <ButtonLike>ButtonLike</ButtonLike>`,
          `  <Input variant="solid" placeholder='Type here' />`,
          `</div>`,
        ].join("\n")}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <div className={css(colorPaletteClass.red, hstack.raw())}>
          <Button variant="solid">Button</Button>
          <ButtonLike variant="solid">ButtonLike</ButtonLike>
          <Input variant="solid" placeholder="Type here" />
        </div>
      </Paper>
    </Grid>
  );
}
