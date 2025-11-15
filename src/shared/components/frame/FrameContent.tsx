import clsx from "clsx";
import { heightStyles } from "../../css/design";
import { frameContentStyles } from "../../css/frameContent";
import { TDesignProps } from "../../css/types";
import { ComponentPropsBaseWith } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DefaultDesignProvider,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../core/DesignContext";
import { frameContentPropsSplitter, TFrameContentFragmentProps, useFrameContentFragment } from "./FrameContentFragment";

type FrameContentProps = ComponentPropsBaseWith<"div", TFrameContentFragmentProps & TDesignProps>;

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

    ...htmlProps
  } = props;

  const { spacing, contentHeight, height, rounded, depth } = useContainerDesignProps(localDesign, "subtle");

  const { startPadding, endPadding, fragment } = useFrameContentFragment(localFrameContent, children);

  const [heightClass, heightInline] = heightStyles(height);
  const [contentClass, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, false);

  return (
    <div
      className={clsx(heightClass, contentClass, className)}
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

FrameContent.displayName = "FrameContent";
