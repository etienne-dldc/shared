import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../../styled-system/css";
import { frameContentStyles } from "../../../design/frameContent";
import { TDesignProps, TPaletteColor } from "../../../design/types";
import { pipePropsSplitters } from "../../../utils/propsSplitters";
import {
  DefaultDesignProvider,
  designPropsSplitter,
  SizeContextProvider,
  useContainerDesignProps,
} from "../../core/DesignContext";
import { DisabledContext } from "../../core/DisabledContext";
import {
  frameContentPropsSplitter,
  TFrameContentFragmentProps,
  useFrameContentFragment,
} from "../../frame/FrameContentFragment";

export type TListItemSelected = "none" | "secondary" | "primary";

export type ListItemProps = Merge<
  ComponentPropsWithRef<"div">,
  TFrameContentFragmentProps &
    TDesignProps & {
      color?: TPaletteColor;
      selected?: TListItemSelected;
      disabled?: boolean;
      render?: React.ReactElement<any>;
    }
>;

export function ListItem(inProps: ListItemProps) {
  const [{ localDisabled, localFrameContent, localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
    localFrameContent: frameContentPropsSplitter,
  });

  const { color, children, style, className, render, ref, ...htmlProps } = props;

  const { height, contentHeight, spacing, rounded, depth } = useContainerDesignProps(localDesign, "subtle");
  const { startPadding, endPadding, fragment, noLayout } = useFrameContentFragment(localFrameContent, children);

  const [contentCss, contentInline] = frameContentStyles(contentHeight, spacing, startPadding, endPadding, noLayout);

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
    <Ariakit.Role
      className={cx(css(contentCss), className)}
      style={{ ...style, ...contentInline }}
      render={renderResolved}
      ref={ref}
      {...htmlProps}
    >
      <DefaultDesignProvider {...localDesign} height={null}>
        <SizeContextProvider height={height} contentHeight={contentHeight} rounded={rounded} depth={depth}>
          {fragment}
        </SizeContextProvider>
      </DefaultDesignProvider>
    </Ariakit.Role>
  );
}
