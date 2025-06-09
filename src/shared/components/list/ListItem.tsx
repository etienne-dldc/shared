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
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    title?: React.ReactNode;
    details?: string | React.ReactNode;

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

    title,
    icon,
    endIcon,
    details,
    children,

    className,
    render,
    ref,
    ...htmlProps
  } = props;

  const childrenResolved = children ?? <ItemContent {...{ children: title, icon, endIcon, details }} />;

  // const spacingClass = useMemo(
  //   () => listItemClassName({ design, selected, forceHover: false, forceActive: false }),
  //   [design, selected],
  // );

  // const iconProps = useMemo(() => ({ size: pick(design.size, LIST_ITEM_ICON_SIZE) }), [design.size]);

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
      {/* <IconContext.Provider value={iconProps}> */}
      <DynamicColorProvider color={color}>
        <Ariakit.Role
          render={renderResolved}
          ref={ref}
          // className={cn(spacingClass, className)}
          {...htmlProps}
        >
          {childrenResolved}
        </Ariakit.Role>
      </DynamicColorProvider>
      {/* </IconContext.Provider> */}
    </DesignContext.Provider>
  );
}
