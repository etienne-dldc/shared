import * as Ariakit from "@ariakit/react";
import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DesignContext, TDesignSize } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ItemContent } from "../item-content/ItemContent";

export type TListItemSelected = "none" | "secondary" | "primary";

export type ListItemProps = Merge<
  ComponentPropsWithRef<"div">,
  {
    size?: TDesignSize;
    color?: TDynamicColor;

    // Design
    selected?: TListItemSelected;
    disabled?: boolean;

    // For content
    startIcon?: React.ReactNode;
    loading?: boolean;
    startSlot?: React.ReactNode;
    endIcon?: React.ReactNode;
    endSlot?: React.ReactNode;
    content?: React.ReactNode;

    // Forward to Button
    render?: React.ReactElement<any>;
  }
>;

export function ListItem(inProps: ListItemProps) {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });

  const {
    color,

    // selected = "none",

    startIcon,
    loading,
    startSlot,
    endIcon,
    endSlot,
    content,
    children,

    className,
    render,
    ref,
    ...htmlProps
  } = props;

  const childrenResolved = children ?? (
    <ItemContent {...{ startIcon, endIcon, endSlot, loading, startSlot }}>{content}</ItemContent>
  );

  const compositeStore = Ariakit.useCompositeContext();
  const renderResolved = compositeStore ? (
    <Ariakit.CompositeHover
      render={<Ariakit.CompositeItem render={render} disabled={disabled.disabled} />}
      focusOnHover
    />
  ) : (
    render
  );

  return (
    <DesignContext.Provider value={design}>
      <DynamicColorProvider color={color}>
        <Ariakit.Role render={renderResolved} ref={ref} {...htmlProps}>
          {childrenResolved}
        </Ariakit.Role>
      </DynamicColorProvider>
    </DesignContext.Provider>
  );
}
