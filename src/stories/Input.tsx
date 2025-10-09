import { cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { InputBasicWidget } from "../widgets/InputBasicWidget";
import { InputColorsWidget } from "../widgets/InputColorsWidget";
import { InputContentHeightsWidget } from "../widgets/InputContentHeightsWidget";
import { InputDisabledWidget } from "../widgets/InputDisabledWidget";
import { InputHeightsWidget } from "../widgets/InputHeightsWidget";
import { InputHighlightedWidget } from "../widgets/InputHighlightedWidget";
import { InputIconsWidget } from "../widgets/InputIconsWidget";
import { InputPlaceholderWidget } from "../widgets/InputPlaceholderWidget";
import { InputVariantsWidget } from "../widgets/InputVariantsWidget";

export default function InputStory() {
  return (
    <Grid
      css={{
        mx: "auto",
        maxW: "960px",
        gridTemplateColumns: "1fr 1fr",
        "& > *": {
          gridColumn: "span 2",
        },
      }}
    >
      <div className={cx(prose())}>
        <h1>Input</h1>
        <p>
          The <code>Input</code> component is a text input field built on top of <code>Frame</code>. It provides a
          consistent styling system with support for colors, variants, icons, and interactive states.
        </p>
        <p>
          Like other Frame-based components, Input inherits all the sizing, spacing, and design system features, making
          it easy to create cohesive form layouts.
        </p>
        <h2>Basic Usage</h2>
        <p>
          At its simplest, Input is a controlled component that accepts <code>value</code>, <code>onChange</code>, and{" "}
          <code>placeholder</code> props.
        </p>
      </div>
      <InputBasicWidget />
      <div className={cx(prose())}>
        <h2>Placeholder</h2>
        <p>
          Use the <code>placeholder</code> prop to provide hint text when the input is empty.
        </p>
      </div>
      <InputPlaceholderWidget />
      <div className={cx(prose())}>
        <h2>Input Sizes</h2>
        <p>
          Input size is controlled by the <code>height</code> prop, using the same 4px-based sizing system as other
          Frame-based components.
        </p>
      </div>
      <InputHeightsWidget />
      <div className={cx(prose())}>
        <h3>Content Heights</h3>
        <p>
          The size of the content (including text and icons) is controlled by the <code>contentHeight</code> prop. This
          allows fine-tuning of the internal spacing while maintaining a consistent outer height.
        </p>
      </div>
      <InputContentHeightsWidget />
      <div className={cx(prose())}>
        <h2>Variants</h2>
        <p>
          Input supports different visual variants inherited from Frame. By default, inputs use the <code>input</code>{" "}
          variant, which is specifically designed for form inputs.
        </p>
      </div>
      <InputVariantsWidget />
      <div className={cx(prose())}>
        <h2>Colors</h2>
        <p>
          Use the <code>color</code> prop to theme the input with any of the 22 available palette colors. This affects
          the border and background colors in the input variant.
        </p>
      </div>
      <InputColorsWidget />
      <div className={cx(prose())}>
        <h2>Highlighted State</h2>
        <p>
          The <code>highlighted</code> prop adds a visual emphasis to the input. The main use case is to indicate error
          states or validation states.
        </p>
      </div>
      <InputHighlightedWidget />
      <div className={cx(prose())}>
        <h2>Icons</h2>
        <p>
          Inputs support icons on either side using <code>startIcon</code> and <code>endIcon</code> props, inherited
          from the <code>TItemContentFragmentProps</code>. Icons are automatically sized and spaced appropriately.
        </p>
      </div>
      <InputIconsWidget />
      <div className={cx(prose())}>
        <h2>Disabled State</h2>
        <p>
          Use the <code>disabled</code> prop to disable the input. Disabled inputs are visually muted and cannot receive
          focus or user input.
        </p>
      </div>
      <InputDisabledWidget />
      <div className={cx(prose())}>
        <h2>Integration with Forms</h2>
        <p>
          Since Input is built on the native <code>&lt;input&gt;</code> element, it works seamlessly with form libraries
          and supports all standard HTML input attributes like <code>type</code>, <code>name</code>,{" "}
          <code>required</code>, <code>pattern</code>, etc.
        </p>
        <h2>Accessibility</h2>
        <p>
          The Input component maintains full accessibility by wrapping a native HTML input element. Always provide
          appropriate labels using the <code>&lt;label&gt;</code> element with the <code>htmlFor</code> attribute, or
          use ARIA labels when needed.
        </p>
      </div>
    </Grid>
  );
}
