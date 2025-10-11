import { css, cx } from "../../../../styled-system/css";
import { heightStyles } from "../../design/styles";
import { TDesignProps } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DefaultDesignProvider,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../core/DesignContext";
import { frameContentPropsSplitter, TFrameContentFragmentProps, useFrameContentFragment } from "./FrameContentFragment";
import { frameContentClass, frameContentStyles } from "./styles";

type FrameContentProps = ComponentPropsBase<"div", TFrameContentFragmentProps & TDesignProps>;

/**
 * Render items horizontally
 * - Set proper padding and spacing
 * - Set font size
 * - Provide nested content size
 */
export function FrameContent(inProps: FrameContentProps) {
  const [{ localDesign, localFrameContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const {
    children,

    style,
    className,
    css: cssProps,

    ...htmlProps
  } = props;

  const { spacing, contentHeight, height, rounded, depth } = useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment } = useFrameContentFragment(localFrameContent, children);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, false);
  const frameContentCss = frameContentClass.raw({ startPadding, endPadding });

  return (
    <div
      className={cx(css(frameContentCss, heightCss, contentCss, cssProps), className)}
      style={{ ...style, ...heightInline, ...contentInline }}
      {...htmlProps}
    >
      <DefaultDesignProvider {...localDesign} height={null}>
        <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
          {fragment}
        </SizeContextProvider>
      </DefaultDesignProvider>
    </div>
  );
}
