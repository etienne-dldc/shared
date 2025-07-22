import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignProps } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { heightStyles } from "../common/styles";
import {
  DefaultDesignContext,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../core/DesignContext";
import { itemContentClass, itemlContentStyles } from "./styles";
import { TItemContentFragmentProps } from "./types";
import { itemContentPropsSplitter, useItemContentFragment } from "./useItemContentFragment";

type ItemContentProps = Merge<
  Omit<ComponentPropsWithRef<"div">, "content">,
  TItemContentFragmentProps &
    TDesignProps & {
      css?: SystemStyleObject;
    }
>;

/**
 * Render items horizontally
 * - Set proper padding and spacing
 * - Set font size
 * - Provide nested content size
 */
export function ItemContent(inProps: ItemContentProps) {
  const [{ localDesign, localItemContent }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localItemContent: itemContentPropsSplitter,
  });

  const {
    children,

    style,
    className,
    css: cssProp,

    ...htmlProps
  } = props;

  const { spacing, contentHeight, height, heightRatio, rounded } = useContainerDesignProps(localDesign);

  const { startPadding, endPadding, fragment } = useItemContentFragment(localItemContent, children);

  const [heightCss, heightInline] = heightStyles(height);
  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, false);
  const itemContentCss = itemContentClass.raw({ startPadding, endPadding });

  return (
    <div
      className={cx(css(itemContentCss, heightCss, contentCss, cssProp), className)}
      style={{ ...style, ...heightInline, ...contentInline }}
      {...htmlProps}
    >
      <DefaultDesignContext.Define {...localDesign} height={null}>
        <SizeContextProvider height={height} heightRatio={heightRatio} rounded={rounded}>
          {fragment}
        </SizeContextProvider>
      </DefaultDesignContext.Define>
    </div>
  );
}
