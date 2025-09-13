import { cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { ButtonColorsVariantsWidget } from "../widgets/ButtonColorsVariantsWidget";
import { ButtonContentHeightsWidget } from "../widgets/ButtonContentHeightsWidget";
import { ButtonDisabledWidget } from "../widgets/ButtonDisabledWidget";
import { ButtonHeightsWidget } from "../widgets/ButtonHeightsWidget";
import { ButtonHoverVariantsWidget } from "../widgets/ButtonHoverVariantsWidget";
import { ButtonIconsWidget } from "../widgets/ButtonIconsWidget";
import { ButtonInteractiveStatesWidget } from "../widgets/ButtonInteractiveStatesWidget";
import { ButtonLikeBasicWidget } from "../widgets/ButtonLikeBasicWidget";
import { ButtonLikeColorsWidget } from "../widgets/ButtonLikeColorsWidget";
import { ButtonLikeComparisonWidget } from "../widgets/ButtonLikeComparisonWidget";
import { ButtonLikeHeightsWidget } from "../widgets/ButtonLikeHeightsWidget";
import { ButtonLikeIconsWidget } from "../widgets/ButtonLikeIconsWidget";
import { ButtonLoadingWidget } from "../widgets/ButtonLoadingWidget";
import { ButtonSlotsWidget } from "../widgets/ButtonSlotsWidget";
import { ButtonSpacingHeightsWidget } from "../widgets/ButtonSpacingHeightsWidget";
import { ButtonSpacingWidget } from "../widgets/ButtonSpacingWidget";

export default function ButtonStory() {
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
        <h1>Button</h1>
        <h2>Button Sizes</h2>
        <p>
          Button size is controlled by the <code>height</code> prop
        </p>
      </div>
      <ButtonHeightsWidget />
      <div className={cx(prose())}>
        <h3>Button Content Heights</h3>
        <p>
          The size of the content is controlled by the <code>contentHeight</code> prop.
        </p>
        <p>Notice how the left and right padding automatically adjusts to be the same as the top and bottom padding.</p>
      </div>
      <ButtonContentHeightsWidget />
      <div className={cx(prose())}>
        <h2>Colors and Variants</h2>
        <p>By default, buttons are using the `surface` variant. You have 3 other variants available:</p>
      </div>
      <ButtonColorsVariantsWidget />
      <div className={cx(prose())}>
        <h2>Hover Variants</h2>
        <p>
          You can specify a different variant when the button is hovered using the <code>hoverVariant</code> prop. (by
          default it matches the <code>variant</code>).
        </p>
      </div>
      <ButtonHoverVariantsWidget />
      <div className={cx(prose())}>
        <h2>Icons</h2>
        <p>
          Buttons support icons on either side of the text content using <code>startIcon</code> and <code>endIcon</code>{" "}
          props. Icons are automatically sized and spaced appropriately.
        </p>
      </div>
      <ButtonIconsWidget />
      <div className={cx(prose())}>
        <h2>Loading States</h2>
        <p>
          Use the <code>loading</code> prop to show a loading indicator. When loading is active, the button shows a
          spinner in place of the start icon (or at the start position if no start icon is present).
        </p>
      </div>
      <ButtonLoadingWidget />
      <div className={cx(prose())}>
        <h2>Disabled States</h2>
        <p>
          Use the <code>disabled</code> prop to disable button interactions. Disabled buttons are visually muted and
          cannot be clicked or focused.
        </p>
      </div>
      <ButtonDisabledWidget />
      <div className={cx(prose())}>
        <h2>Spacing Control</h2>
        <p>
          The <code>spacing</code> prop controls the internal spacing between elements inside the button. This affects
          the gaps between icons and text content.
        </p>
      </div>
      <ButtonSpacingWidget />
      <div className={cx(prose())}>
        <p>
          This is particularly useful when you want to adjust the spacing for buttons with different heights to maintain
          a consistent visual rhythm.
        </p>
      </div>
      <ButtonSpacingHeightsWidget />
      <div className={cx(prose())}>
        <h2>Advanced Slots</h2>
        <p>
          Beyond simple icons, you can use <code>startSlot</code> and <code>endSlot</code> to embed more complex content
          like nested buttons or custom components.
        </p>
      </div>
      <ButtonSlotsWidget />
      <div className={cx(prose())}>
        <h2>Interactive States</h2>
        <p>
          For demonstration or testing purposes, you can manually trigger hover and focus states using{" "}
          <code>data-hover</code> and <code>data-focus-visible</code> attributes.
        </p>
      </div>
      <ButtonInteractiveStatesWidget />
      <div className={cx(prose())}>
        <h1>ButtonLike</h1>
        <p>
          The <code>ButtonLike</code> component renders a div that looks like a Button but without interactive states
          like hover effects. This makes it perfect for displaying button-styled content that isn't meant to be
          clickable, such as status indicators, labels, or static UI elements.
        </p>
        <h2>Basic Usage</h2>
        <p>
          <code>ButtonLike</code> shares the same visual styling as <code>Button</code> but renders as a div element
          without any interactive behavior.
        </p>
      </div>
      <ButtonLikeBasicWidget />
      <div className={cx(prose())}>
        <h2>Comparison with Button</h2>
        <p>
          Here's a side-by-side comparison showing how <code>ButtonLike</code> maintains the same visual appearance as{" "}
          <code>Button</code> but without hover states or interactive behavior.
        </p>
      </div>
      <ButtonLikeComparisonWidget />
      <div className={cx(prose())}>
        <h2>Sizes</h2>
        <p>
          Like buttons, <code>ButtonLike</code> supports all the same size options through the <code>height</code> prop.
        </p>
      </div>
      <ButtonLikeHeightsWidget />
      <div className={cx(prose())}>
        <h2>Colors and Variants</h2>
        <p>
          <code>ButtonLike</code> supports the same variants and colors as <code>Button</code>: solid, surface, subtle,
          and ghost variants with full color palette support.
        </p>
      </div>
      <ButtonLikeColorsWidget />
      <div className={cx(prose())}>
        <h2>Icons and Content</h2>
        <p>
          <code>ButtonLike</code> supports the same content options as <code>Button</code>, including{" "}
          <code>startIcon</code> and <code>endIcon</code> props for adding icons alongside text content.
        </p>
      </div>
      <ButtonLikeIconsWidget />
      <div className={cx(prose())}>
        <h2>When to Use ButtonLike</h2>
        <p>
          Use <code>ButtonLike</code> when you need:
        </p>
        <ul>
          <li>Status indicators that look like buttons but aren't interactive</li>
          <li>Static labels with button-like styling</li>
          <li>Placeholder elements in button groups</li>
          <li>Read-only display elements that match button styling</li>
        </ul>
        <p>
          For interactive elements, always use <code>Button</code> instead to provide proper accessibility and user
          feedback.
        </p>
      </div>
    </Grid>
  );
}
