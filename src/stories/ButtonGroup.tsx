import { cx } from "../../styled-system/css";
import { Grid } from "../../styled-system/jsx";
import { prose } from "../../styled-system/recipes";
import { ButtonGroupBasicWidget } from "../widgets/ButtonGroupBasicWidget";
import { ButtonGroupColorsWidget } from "../widgets/ButtonGroupColorsWidget";
import { ButtonGroupDirectionWidget } from "../widgets/ButtonGroupDirectionWidget";
import { ButtonGroupDividersWidget } from "../widgets/ButtonGroupDividersWidget";
import { ButtonGroupFormWidget } from "../widgets/ButtonGroupFormWidget";
import { ButtonGroupMixedContentWidget } from "../widgets/ButtonGroupMixedContentWidget";
import { ButtonGroupNavigationWidget } from "../widgets/ButtonGroupNavigationWidget";
import { ButtonGroupNestedWidget } from "../widgets/ButtonGroupNestedWidget";
import { ButtonGroupToolbarWidget } from "../widgets/ButtonGroupToolbarWidget";
import { ButtonGroupVariantsWidget } from "../widgets/ButtonGroupVariantsWidget";

export default function ButtonGroupStory() {
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
        <h1>ButtonGroup</h1>
        <p>
          The <code>ButtonGroup</code> component is a container that visually connects multiple buttons into a cohesive
          unit. It automatically handles border radius adjustments and spacing to create seamless visual connections
          between buttons.
        </p>
        <h2>Basic Usage</h2>
        <p>
          Wrap multiple <code>Button</code> or <code>ButtonLike</code> components in a <code>ButtonGroup</code> to
          create connected button interfaces like toolbars or action groups.
        </p>
      </div>
      <ButtonGroupBasicWidget />
      <div className={cx(prose())}>
        <h2>Direction</h2>
        <p>
          Use the <code>direction</code> prop to control the layout direction. The default is <code>"horizontal"</code>,
          but you can also use <code>"vertical"</code> for stacked button groups.
        </p>
      </div>
      <ButtonGroupDirectionWidget />
      <div className={cx(prose())}>
        <h2>Mixed Content</h2>
        <p>
          <code>ButtonGroup</code> can contain both <code>Button</code> and <code>ButtonLike</code> components. This is
          useful when you need interactive buttons alongside static button-styled elements.
        </p>
      </div>
      <ButtonGroupMixedContentWidget />
      <div className={cx(prose())}>
        <h2>Dividers</h2>
        <p>
          Control visual separators between buttons with the <code>innerDividers</code> prop. Inner dividers are enabled
          by default.
        </p>
      </div>
      <ButtonGroupDividersWidget />
      <div className={cx(prose())}>
        <h3>Nested Button Groups</h3>
        <p>
          ButtonGroups can be nested within each other. When nesting, use <code>roundedEnds="none"</code> on the inner
          group to blend the visual styles seamlessly.
        </p>
      </div>
      <ButtonGroupNestedWidget />
      <div className={cx(prose())}>
        <h2>Variants</h2>
        <p>
          The <code>variant</code> prop on ButtonGroup affects both the buttons' appearance and the dividers' styling.
          All variants work consistently across the group.
        </p>
      </div>
      <ButtonGroupVariantsWidget />
      <div className={cx(prose())}>
        <h2>Colors</h2>
        <p>
          Use the <code>color</code> prop to apply consistent color theming across the entire button group. This affects
          both the buttons and any dividers.
        </p>
      </div>
      <ButtonGroupColorsWidget />
      <div className={cx(prose())}>
        <h2>Use Cases</h2>
        <p>ButtonGroup is perfect for creating cohesive interface elements. Here are some common patterns:</p>
        <h3>Toolbar Interfaces</h3>
        <p>Group related actions together for toolbars and action bars:</p>
      </div>
      <ButtonGroupToolbarWidget />
      <div className={cx(prose())}>
        <h3>Form Button Clusters</h3>
        <p>Organize form actions like Save, Cancel, and Reset:</p>
      </div>
      <ButtonGroupFormWidget />
      <div className={cx(prose())}>
        <h3>Navigation Segments</h3>
        <p>Create vertical navigation menus or sidebar sections:</p>
      </div>
      <ButtonGroupNavigationWidget />
      <div className={cx(prose())}>
        <p>
          The component automatically handles visual connections, border management, and ensures consistent spacing
          throughout the group, making it easy to create professional-looking interface elements.
        </p>
      </div>
    </Grid>
  );
}
