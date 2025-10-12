import { cx } from "../../styled-system/css";
import { prose } from "../../styled-system/recipes";
import { StoryLayout } from "../playground/StoryLayout";
import { InputAutoFocusWidget } from "../widgets/InputAutoFocusWidget";
import { InputBasicWidget } from "../widgets/InputBasicWidget";
import { InputColorsWidget } from "../widgets/InputColorsWidget";
import { InputContentHeightsWidget } from "../widgets/InputContentHeightsWidget";
import { InputCustomInputChildrenWidget } from "../widgets/InputCustomInputChildrenWidget";
import { InputDisabledWidget } from "../widgets/InputDisabledWidget";
import { InputFrameGroupWidget } from "../widgets/InputFrameGroupWidget";
import { InputHeightsWidget } from "../widgets/InputHeightsWidget";
import { InputHighlightedWidget } from "../widgets/InputHighlightedWidget";
import { InputIconsWidget } from "../widgets/InputIconsWidget";
import { InputPlaceholderWidget } from "../widgets/InputPlaceholderWidget";
import { InputVariantsWidget } from "../widgets/InputVariantsWidget";

export default function InputStory() {
  return (
    <StoryLayout>
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
      </div>
      <InputBasicWidget />
      <div className={cx(prose())}>
        <h2>Input props</h2>
        <p>
          The Input component renders an <code>&lt;input&gt;</code> element inside a styled Frame. The following props
          are forwarded to the native input element:
        </p>
        <ul>
          <li>
            <code>value</code>
          </li>
          <li>
            <code>onChange</code>
          </li>
          <li>
            <code>placeholder</code>
          </li>
          <li>
            <code>name</code>
          </li>
          <li>
            <code>type</code>
          </li>
        </ul>
        <p>All other props are passed to the outer Frame container.</p>
      </div>
      <InputPlaceholderWidget />
      <div className={cx(prose())}>
        <h2>
          Custom <code>&lt;input&gt;</code>
        </h2>
        <p>
          You can also provide your own <code>&lt;input&gt;</code> element as children to the Input component. This is
          useful for adding custom attributes like <code>maxLength</code>, <code>autoComplete</code>, etc.
        </p>
        <p>
          To get the proper styling and behavior, make sure to use the <code>FrameInputContent</code> component.
        </p>
      </div>
      <InputCustomInputChildrenWidget />
      <div className={cx(prose())}>
        <h2>Click to focus Behavior</h2>
        <p>
          The <code>Input</code> component has a special behavior: when you click anywhere inside the Frame (including
          on icons or padding areas), it will automatically focus the first <code>&lt;input&gt;</code> element inside.
        </p>
        <p>
          This makes the entire Frame behave as a clickable input area, improving usability. For example, clicking on a{" "}
          <code>startIcon</code> or <code>endIcon</code> will focus the input, just as if you had clicked directly on
          the text field itself.
        </p>
        <p>
          In the example below, clicking on the magnifying glass icon or anywhere in the input area will focus the
          input.
        </p>
      </div>
      <InputAutoFocusWidget />
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
          from the <code>TFrameContentFragmentProps</code>. Icons are automatically sized and spaced appropriately.
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
        <h2>Combining with Other Components</h2>
        <p>
          Input works seamlessly inside <code>FrameGroup</code> alongside other Frame-based components like{" "}
          <code>Button</code> and <code>ButtonLike</code>. This is useful for creating search bars, form inputs with
          labels, and other composite UI patterns.
        </p>
      </div>
      <InputFrameGroupWidget />
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
    </StoryLayout>
  );
}
