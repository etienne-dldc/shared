import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { css, cx } from "../styled-system/css";
import { styled, VStack } from "../styled-system/jsx";
import "./index.css";

const buttonClass = css({
  backgroundColor: "gray.500",
  px: "4",
  py: "0x",
  rounded: "md",
  color: "white",
  _hover: {
    backgroundColor: "gray.700",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      {/* <Playground /> */}
      <VStack gap="2">
        <styled.div>
          <button className={cx(buttonClass, css({ textStyle: "1" }))}>
            <span>Click Me</span>
          </button>
        </styled.div>
        <button className={cx(buttonClass, css({ textStyle: "1xx/lg" }))}>
          <span>Click Me</span>
        </button>
        <button className={cx(buttonClass, css({ textStyle: "1x" }))}>
          <span>Click Me</span>
        </button>
      </VStack>

      <styled.p textStyle="0x">Text 0x</styled.p>
      <styled.p textStyle="0x_x">Text 0x_x</styled.p>
      <styled.p textStyle="0xx">Text 0xx</styled.p>
      <styled.p textStyle="0xxx">Text 0xxx</styled.p>
      <styled.p textStyle="1">Text 1</styled.p>
      <styled.p textStyle="1__x">Text 1__x</styled.p>
      <styled.p textStyle="1_x">Text 1_x</styled.p>
      <styled.p textStyle="1_xx">Text 1_xx</styled.p>
      <styled.p textStyle="1x">Text 1x</styled.p>
      <styled.p textStyle="1x_x">Text 1x_x</styled.p>
      <styled.p textStyle="1xx">Text 1xx</styled.p>
      <styled.p textStyle="1xxx">Text 1xxx</styled.p>
      <styled.p textStyle="2">Text 2</styled.p>
      <styled.p textStyle="2_x">Text 2_x</styled.p>
      <styled.p textStyle="2x">Text 2x</styled.p>
      <styled.p textStyle="2xx">Text 2xx</styled.p>
      <styled.p textStyle="3">Text 3</styled.p>
      <styled.p textStyle="3_x">Text 3_x</styled.p>
      <styled.p textStyle="3x">Text 3x</styled.p>
      <styled.p textStyle="3xx">Text 3xx</styled.p>
      <styled.p textStyle="4">Text 4</styled.p>
      <styled.p textStyle="4x">Text 4x</styled.p>
      <styled.p textStyle="5">Text 5</styled.p>
      <styled.p textStyle="6">Text 6</styled.p>
      <styled.p textStyle="7">Text 7</styled.p>
      <styled.p textStyle="8">Text 8</styled.p>
    </Suspense>
  </StrictMode>,
);
