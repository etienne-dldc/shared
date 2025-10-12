import { cx } from "../../styled-system/css";
import { prose } from "../../styled-system/recipes";
import { StoryLayout } from "../playground/StoryLayout";
import { DefaultDesignProviderBasicWidget } from "../widgets/DefaultDesignProviderBasicWidget";
import { DefaultDesignProviderNestedWidget } from "../widgets/DefaultDesignProviderNestedWidget";

export default function DefaultDesignProviderStory() {
  return (
    <StoryLayout>
      <div className={cx(prose())}>
        <h1>DefaultDesignProvider</h1>
        <p>
          <code>DefaultDesignProvider</code> is a context provider that sets default design properties for all child
          components. It allows you to establish consistent design defaults across a component tree without having to
          pass props to each individual component.
        </p>
        <p>
          This provider is particularly useful for creating design variations, managing nested component hierarchies,
          and maintaining design consistency across complex UI structures.
        </p>
      </div>
      <div className={cx(prose())}>
        <h2>Basic Usage</h2>
        <p>
          Use <code>DefaultDesignProvider</code> to set default design properties that will be inherited by all child
          components. Any component that uses the design system will automatically pick up these defaults.
        </p>
      </div>
      <DefaultDesignProviderBasicWidget />
      <div className={cx(prose())}>
        <h2>Nested Providers</h2>
        <p>
          <code>DefaultDesignProvider</code> can be nested to create hierarchical design contexts. Inner providers
          override properties from outer providers, allowing for fine-grained control over design inheritance.
        </p>
        <p>
          The nested design system automatically calculates appropriate sizes, spacing, and rounded values for deeply
          nested components, ensuring visual harmony across the hierarchy.
        </p>
      </div>
      <DefaultDesignProviderNestedWidget />
      <div className={cx(prose())}>
        <h2>Available Properties</h2>
        <p>
          <code>DefaultDesignProvider</code> accepts all design properties that can be passed to individual components:
        </p>
        <ul>
          <li>
            <code>height</code> - Sets the default height for all child components
          </li>
          <li>
            <code>contentHeight</code> - Controls the internal content sizing
          </li>
          <li>
            <code>rounded</code> - Sets the border radius for child components
          </li>
          <li>
            <code>spacing</code> - Controls spacing and padding values
          </li>
          <li>
            <code>variant</code> - Sets the visual variant (solid, surface, subtle, ghost, input)
          </li>
          <li>
            <code>hoverVariant</code> - Controls the hover state appearance
          </li>
        </ul>
        <p>
          These properties use the same type system as individual components, supporting both numeric values and the
          4px-based sizing system with fractional support (e.g., "7", "7_x", "7x").
        </p>
      </div>
    </StoryLayout>
  );
}
