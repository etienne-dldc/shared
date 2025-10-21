import { cx } from "../../styled-system/css";
import { prose } from "../../styled-system/recipes";
import { StoryLayout } from "../playground/StoryLayout";
import { LoadingIconBasicWidget } from "../widgets/LoadingIconBasicWidget";
import { LoadingIconSizesWidget } from "../widgets/LoadingIconSizesWidget";
import { LoadingIconWeightsWidget } from "../widgets/LoadingIconWeightsWidget";

export default function LoadingIconStory() {
  return (
    <StoryLayout>
      <div className={cx(prose())}>
        <h1>LoadingIcon</h1>
        <p>
          The <code>LoadingIcon</code> component displays an animated spinning loading indicator. It supports various
          sizes and weights to match different design needs.
        </p>
      </div>
      <div className={cx(prose())}>
        <h2>Basic Usage</h2>
        <p>
          By default, <code>LoadingIcon</code> renders with a regular weight and inherits its size from the icon
          context.
        </p>
      </div>
      <LoadingIconBasicWidget />
      <div className={cx(prose())}>
        <h2>Sizes</h2>
        <p>
          Control the size of the loading icon using the <code>size</code> prop. The value is in pixels.
        </p>
      </div>
      <LoadingIconSizesWidget />
      <div className={cx(prose())}>
        <h2>Weights</h2>
        <p>
          The <code>weight</code> prop controls the visual weight of the loading icon. Available weights include thin,
          light, regular, bold, duotone, and fill.
        </p>
      </div>
      <LoadingIconWeightsWidget />
    </StoryLayout>
  );
}
