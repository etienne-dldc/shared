import { cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { ButtonLikeBasicWidget } from "../widgets/ButtonLikeBasicWidget";
import { ButtonLikeColorsWidget } from "../widgets/ButtonLikeColorsWidget";
import { ButtonLikeComparisonWidget } from "../widgets/ButtonLikeComparisonWidget";
import { ButtonLikeHeightsWidget } from "../widgets/ButtonLikeHeightsWidget";
import { ButtonLikeIconsWidget } from "../widgets/ButtonLikeIconsWidget";

export default function ButtonLikeStory() {
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
