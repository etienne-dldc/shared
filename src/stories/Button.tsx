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
import { ButtonLoadingWidget } from "../widgets/ButtonLoadingWidget";
import { ButtonSlotsWidget } from "../widgets/ButtonSlotsWidget";
import { ButtonSpacingHeightsWidget } from "../widgets/ButtonSpacingHeightsWidget";
import { ButtonSpacingWidget } from "../widgets/ButtonSpacingWidget";

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
    </Grid>
  );
}
