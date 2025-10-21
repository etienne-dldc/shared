import { cx } from "../../styled-system/css";
import { prose } from "../../styled-system/recipes";
import { StoryLayout } from "../playground/StoryLayout";
import { LoadingBlockBasicWidget } from "../widgets/LoadingBlockBasicWidget";

export default function LoadingBlockStory() {
  return (
    <StoryLayout>
      <div className={cx(prose())}>
        <h1>LoadingBlock</h1>
        <p>
          The <code>LoadingBlock</code> component displays a centered loading indicator with a loading icon and text.
          It's useful for showing loading states in your application.
        </p>
      </div>
      <div className={cx(prose())}>
        <h2>Basic Usage</h2>
        <p>
          <code>LoadingBlock</code> is a simple component that requires no props. It displays a spinning loading icon
          with "Loading..." text below it.
        </p>
      </div>
      <LoadingBlockBasicWidget />
    </StoryLayout>
  );
}
