import {
  CaretDownIcon,
  CirclesFourIcon,
  DotsThreeVerticalIcon,
  PlusIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { css, cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { CodeHighlight } from "../playground/CodeHighlight";
import { HighlightedGrid } from "../playground/HighlightedGrid";
import { Button, ButtonProps } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
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
          The size of the content is controlled by the <code>contentHeight</code> prop.
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
      <div className={cx(prose())}>
        <h2>Icons</h2>
        <p>
          Buttons support icons on either side of the text content using <code>startIcon</code> and <code>endIcon</code>{" "}
          props. Icons are automatically sized and spaced appropriately.
        </p>
      </div>
      <ButtonIconsDemo />
      <div className={cx(prose())}>
        <h2>Loading States</h2>
        <p>
          Use the <code>loading</code> prop to show a loading indicator. When loading is active, the button shows a
          spinner in place of the start icon (or at the start position if no start icon is present).
        </p>
      </div>
      <ButtonLoadingDemo />
      <div className={cx(prose())}>
        <h2>Disabled States</h2>
        <p>
          Use the <code>disabled</code> prop to disable button interactions. Disabled buttons are visually muted and
          cannot be clicked or focused.
        </p>
      </div>
      <ButtonDisabledDemo />
      <div className={cx(prose())}>
        <h2>Spacing Control</h2>
        <p>
          The <code>spacing</code> prop controls the internal spacing between elements inside the button. This affects
          the gaps between icons and text content.
        </p>
      </div>
      <ButtonSpacingDemo />
      <div className={cx(prose())}>
        <p>
          This is particularly useful when you want to adjust the spacing for buttons with different heights to maintain
          a consistent visual rhythm.
        </p>
      </div>
      <ButtonSpacingHeightsDemo />
      <div className={cx(prose())}>
        <h2>Advanced Slots</h2>
        <p>
          Beyond simple icons, you can use <code>startSlot</code> and <code>endSlot</code> to embed more complex content
          like nested buttons or custom components.
        </p>
      </div>
      <ButtonSlotsDemo />
      <div className={cx(prose())}>
        <h2>Interactive States</h2>
        <p>
          For demonstration or testing purposes, you can manually trigger hover and focus states using{" "}
          <code>data-hover</code> and <code>data-focus-visible</code> attributes.
        </p>
      </div>
      <ButtonInteractiveStatesDemo />
    </Grid>
  );
}

function ButtonHeightsDemo() {
  const heights: TDesignSize[] = ["6", "8", "10", "12"];
  const [highlighted, setHighlighted] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? `<Button height="${highlighted}" />` : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => (
          <Button key={key} height={height}>
            Height {height}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonContentHeightsDemo() {
  const contentHeights: TDesignSize[] = ["4", "6", "8", "10"];
  const [highlighted, setHighlighted] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? `<Button height="12" contentHeight="${highlighted}" />` : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentHeights}
        renderCell={({ row: contentHeight, key }) => (
          <Button key={key} height="12" contentHeight={contentHeight}>
            Content Height {contentHeight}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
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

  const [highlighted, setHighlighted] = useState<ButtonProps | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button color="${highlighted.color}" variant="${highlighted.variant}" />`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={colors}
        renderCell={({ row: variant, column: color, key }) => (
          <Button key={key} variant={variant} color={color}>
            {color}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { color: cell?.column, variant: cell?.row } : null)}
      />
    </Grid>
  );
}

function ButtonHoverVariantsDemo() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighted, setHighlighted] = useState<ButtonProps | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="subtle" hoverVariant="${highlighted.hoverVariant}" />`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        renderCell={({ row: hoverVariant, key }) => (
          <Button key={key} variant="subtle" hoverVariant={hoverVariant} height="10">
            <em className={css({ fontWeight: "bold" })}>{hoverVariant}</em> on hover
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { hoverVariant: cell?.row } : null)}
      />
    </Grid>
  );
}

function ButtonIconsDemo() {
  const iconConfigs = [
    { children: "Start Icon", startIcon: <UserIcon />, endIcon: undefined, code: "startIcon={<UserIcon />}" },
    { children: "End Icon", startIcon: undefined, endIcon: <CirclesFourIcon />, code: "endIcon={<CirclesFourIcon />}" },
    {
      children: "Both Icons",
      startIcon: <UserIcon />,
      endIcon: <CaretDownIcon />,
      code: "startIcon={<UserIcon />} endIcon={<CaretDownIcon />}",
    },
    {
      startIcon: <DotsThreeVerticalIcon />,
      endIcon: undefined,
      children: undefined,
      code: "startIcon={<DotsThreeVerticalIcon />}",
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof iconConfigs)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.code} ${highlighted.children !== undefined ? `>${highlighted.children}</Button>` : " />"}`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={iconConfigs}
        renderCell={({ row: config, key }) => (
          <Button key={key} startIcon={config.startIcon} endIcon={config.endIcon} height="10">
            {config.children}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonLoadingDemo() {
  const contentVariations = [
    { children: "Save Changes", code: "" },
    { children: "Save Changes", startIcon: <UserIcon />, code: "startIcon={<UserIcon />}" },
    {
      children: "Save Changes",
      endIcon: <CaretDownIcon />,
      code: "endIcon={<CaretDownIcon />}",
    },
    {
      children: "Save Changes",
      startIcon: <UserIcon />,
      endIcon: <CaretDownIcon />,
      code: "startIcon={<UserIcon />} endIcon={<CaretDownIcon />}",
    },
    { children: undefined, startIcon: <UserIcon />, code: "startIcon={<UserIcon />}" },
  ];

  const loadingStates = [
    { label: "Normal", loading: false, code: "" },
    { label: "Loading", loading: true, code: "loading={true}" },
  ];

  const [highlighted, setHighlighted] = useState<{
    content: (typeof contentVariations)[number];
    loading: (typeof loadingStates)[number];
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.content.code} ${highlighted.loading.code} ${highlighted.content.children !== undefined ? `>${highlighted.content.children}</Button>` : "/>"}`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={contentVariations}
        columnsDims={loadingStates}
        renderCell={({ row: content, column: loadingState, key }) => (
          <Button
            key={key}
            loading={loadingState.loading}
            startIcon={content.startIcon}
            endIcon={content.endIcon}
            height="10"
          >
            {content.children}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { content: cell.row, loading: cell.column } : null)}
      />
    </Grid>
  );
}

function ButtonDisabledDemo() {
  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];
  const states = [
    { label: "Normal", disabled: false },
    { label: "Disabled", disabled: true },
  ];

  const [highlighted, setHighlighted] = useState<{ variant: TDesignVariant; state: (typeof states)[number] } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="${highlighted.variant}" ${highlighted.state.disabled ? "disabled={true}" : ""}>${highlighted.state.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={states}
        renderCell={({ row: variant, column: state, key }) => (
          <Button key={key} variant={variant} disabled={state.disabled} height="10" startIcon={<UserIcon />}>
            {state.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { variant: cell.row, state: cell.column } : null)}
      />
    </Grid>
  );
}

function ButtonSpacingDemo() {
  const spacings: TDesignSize[] = ["4", "6", "8", "10", "12"];
  const [highlighted, setHighlighted] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button spacing="${highlighted}" startIcon={<UserIcon />} endIcon={<CaretDownIcon />}>Spacing ${highlighted}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={spacings}
        renderCell={({ row: spacing, key }) => (
          <Button key={key} spacing={spacing} startIcon={<UserIcon />} endIcon={<CaretDownIcon />} height="10">
            Spacing {spacing}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonSpacingHeightsDemo() {
  const heights: TDesignSize[] = ["6", "8", "10", "12"];
  const [highlighted, setHighlighted] = useState<TDesignSize | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted ? `<Button spacing="8" height="${highlighted}" />` : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={heights}
        renderCell={({ row: height, key }) => (
          <Button key={key} height={height} spacing="8">
            Height {height}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonSlotsDemo() {
  const slotConfigs = [
    {
      label: "Nested Button Start",
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />}',
    },
    {
      label: "Nested Button End",
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} height="6" />,
      code: 'endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} height="6" />}',
    },
    {
      label: "Both Slots",
      startSlot: <ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />,
      endSlot: <ButtonLike variant="solid" startIcon={<XIcon />} height="6" />,
      code: 'startSlot={<ButtonLike variant="solid" startIcon={<PlusIcon />} height="6" />} endSlot={<ButtonLike variant="solid" startIcon={<XIcon />} height="6" />}',
    },
  ];

  const [highlighted, setHighlighted] = useState<(typeof slotConfigs)[number] | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button ${highlighted.code}>${highlighted.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={slotConfigs}
        renderCell={({ row: config, key }) => (
          <Button key={key} startSlot={config.startSlot} endSlot={config.endSlot} height="10">
            {config.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell?.row ?? null)}
      />
    </Grid>
  );
}

function ButtonInteractiveStatesDemo() {
  const stateConfigs = [
    { label: "Normal", props: {}, code: "" },
    { label: "Hover State", props: { "data-hover": true }, code: "data-hover={true}" },
    { label: "Focus State", props: { "data-focus-visible": true }, code: "data-focus-visible={true}" },
  ];

  const variants: TDesignVariant[] = ["solid", "surface", "subtle", "ghost"];

  const [highlighted, setHighlighted] = useState<{
    state: (typeof stateConfigs)[number];
    variant: TDesignVariant;
  } | null>();

  return (
    <Grid gridTemplateColumns="subgrid">
      <CodeHighlight language="jsx" theme="dark-plus">
        {highlighted
          ? `<Button variant="${highlighted.variant}"${highlighted.state.code ? ` ${highlighted.state.code}` : ""}>${highlighted.state.label}</Button>`
          : "// Hover a button to see the code"}
      </CodeHighlight>
      <HighlightedGrid
        rowsDims={variants}
        columnsDims={stateConfigs}
        renderCell={({ row: variant, column: config, key }) => (
          <Button key={key} {...config.props} height="10" variant={variant}>
            {config.label}
          </Button>
        )}
        onHighlightedCell={(cell) => setHighlighted(cell ? { state: cell.column, variant: cell.row } : null)}
      />
    </Grid>
  );
}
