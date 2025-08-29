import { useState } from "react";
import { css, cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button, ButtonProps } from "../shared/components/button/Button";
import { TDynamicColor } from "../shared/components/core/DynamicColorProvider";
import { TDesignSize, TDesignVariant } from "../shared/design/types";

export default function ButtonStory() {
  return (
    <Grid
      mx="auto"
      maxW="960px"
      css={{
        gridTemplateColumns: "1fr 1fr",
        "& > *": {
          gridColumn: "span 2",
        },
      }}
    >
      <div className={cx(prose())}>
        <h1>Button</h1>
        <h2>Button Sizes</h2>
        <p>
          Button size is controlled by the <code>height</code> prop
        </p>
      </div>
      <ButtonHeightsDemo />
      <div className={cx(prose())}>
        <h3>Button Content Heights</h3>
        <p>
          Adding the size of the content is controlled by the <code>contentHeight</code> prop.
        </p>
        <p>Notice how the left and right padding automatically adjusts to be the same as the top and bottom padding.</p>
      </div>
      <ButtonContentHeightsDemo />
      <div className={cx(prose())}>
        <h2>Colors and Variants</h2>
        <p>By default, buttons are using the `surface` variant. You have 3 other variants available:</p>
      </div>
      <ButtonColorsVariantsDemo />
      <div className={cx(prose())}>
        <h2>Hover Variants</h2>
        <p>
          You can specify a different variant when the button is hovered using the <code>hoverVariant</code> prop. (by
          default it matches the <code>variant</code>).
        </p>
      </div>
      <ButtonHoverVariantsDemo />
    </Grid>
  );
}

function ButtonHeightsDemo() {
  const heights: TDesignSize[] = ["6", "8", "10", "12"];
  const [highlighed, setHeighlighed] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighed ? `<Button height="${highlighed}" />` : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rows={heights}
        renderCell={({ row: height, key }) => (
          <Button key={key} height={height}>
            Height {height}
          </Button>
        )}
        onHightlightedCell={(cell) => setHeighlighed(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonContentHeightsDemo() {
  const contentHeights: TDesignSize[] = ["4", "6", "8", "10"];
  const [highlighed, setHeighlighed] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighed ? `<Button height="12" contentHeight="${highlighed}" />` : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rows={contentHeights}
        renderCell={({ row: contentHeight, key }) => (
          <Button key={key} height="12" contentHeight={contentHeight}>
            Content Height {contentHeight}
          </Button>
        )}
        onHightlightedCell={(cell) => setHeighlighed(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonColorsVariantsDemo() {
  const colors: TDynamicColor[] = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ];
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighed, setHeighlighed] = useState<ButtonProps | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighed
          ? `<Button color="${highlighed.color}" variant="${highlighed.variant}" />`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rows={variants}
        columns={colors}
        renderCell={({ row: variant, column: color, key }) => (
          <Button key={key} variant={variant} color={color}>
            {color}
          </Button>
        )}
        onHightlightedCell={(cell) => setHeighlighed(cell ? { color: cell?.column, variant: cell?.row } : null)}
      />
    </Grid>
  );
}

function ButtonHoverVariantsDemo() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighed, setHeighlighed] = useState<ButtonProps | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighed
          ? `<Button variant="subtle" hoverVariant="${highlighed.hoverVariant}" />`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rows={variants}
        renderCell={({ row: hoverVariant, key }) => (
          <Button key={key} variant="subtle" hoverVariant={hoverVariant} height="10">
            <em className={css({ fontWeight: "bold" })}>{hoverVariant}</em> on hover
          </Button>
        )}
        onHightlightedCell={(cell) => setHeighlighed(cell ? { hoverVariant: cell?.row } : null)}
      />
    </Grid>
  );
}
