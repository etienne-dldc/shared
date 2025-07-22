import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { TDesignProps } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import {
  DefaultDesignContext,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { itemlContentStyles } from "../item-content/styles";
import { TItemContentFragmentProps } from "../item-content/types";
import { itemContentPropsSplitter, useItemContentFragment } from "../item-content/useItemContentFragment";

export type TListItemSelected = "none" | "secondary" | "primary";

export type ListItemProps = Merge<
  ComponentPropsWithRef<"div">,
  TItemContentFragmentProps &
    TDesignProps & {
      color?: TDynamicColor;
      selected?: TListItemSelected;
      disabled?: boolean;
      render?: React.ReactElement<any>;
    }
>;

export function ListItem(inProps: ListItemProps) {
  const [{ localDisabled, localItemContent, localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localItemContent: itemContentPropsSplitter,
  });

  const { color, children, style, className, render, ref, ...htmlProps } = props;

  const { height, contentHeight, spacing, heightRatio, rounded } = useContainerDesignProps(localDesign);
  const { startPadding, endPadding, fragment, noLayout } = useItemContentFragment(localItemContent, children);

  const [contentCss, contentInline] = itemlContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

  const compositeStore = Ariakit.useCompositeContext();
  const renderResolved = compositeStore ? (
    <Ariakit.CompositeHover
      render={<Ariakit.CompositeItem render={render} disabled={localDisabled.disabled} />}
      focusOnHover
    />
  ) : (
    render
  );

  return (
    <DynamicColorProvider color={color}>
      <Ariakit.Role
        className={cx(css(contentCss), className)}
        style={{ ...style, ...contentInline }}
        render={renderResolved}
        ref={ref}
        {...htmlProps}
      >
        <DefaultDesignContext.Define {...localDesign} height={null}>
          <SizeContextProvider height={height} heightRatio={heightRatio} rounded={rounded}>
            {fragment}
          </SizeContextProvider>
        </DefaultDesignContext.Define>
      </Ariakit.Role>
    </DynamicColorProvider>
  );
}
