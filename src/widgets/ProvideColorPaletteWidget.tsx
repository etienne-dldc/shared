import { css } from "../../styled-system/css";
import { Grid, Paper } from "../../styled-system/jsx";
import { hstack } from "../../styled-system/patterns";
import { CodeHighlight } from "../playground/CodeHighlight";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { Input } from "../shared/components/input/Input";
import { colorPaletteClass } from "../shared/design/styles";

export function ProvideColorPaletteWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {[
          `<div className={colorPaletteClass({ colorPalette: "red" })}>`,
          `  <Button variant="solid">Button</Button>`,
          `  <ButtonLike>ButtonLike</ButtonLike>`,
          `  <Input variant="solid" placeholder='Type here' />`,
          `</div>`,
        ].join("\n")}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <div className={css(colorPaletteClass.raw({ colorPalette: "red" }), hstack.raw())}>
          <Button variant="solid">Button</Button>
          <ButtonLike variant="solid">ButtonLike</ButtonLike>
          <Input variant="solid" placeholder="Type here" />
        </div>
      </Paper>
    </Grid>
  );
}
