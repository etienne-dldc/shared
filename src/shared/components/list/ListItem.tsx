import * as Ariakit from "@ariakit/react";
import { IconContext } from "@phosphor-icons/react";
import { ComponentPropsWithRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn, pick } from "../../styles/utils";
import { ButtonContent } from "../button/ButtonContent";
import { DesignContext, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { LIST_ITEM_ICON_SIZE, listItemClassName } from "./styles";

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
  const {
    priority: _priority,
    variant: _variant,
    rounded: _rounded,

    color,
    size,

    selected = "none",
    disabled = false,

    title,
    icon,
    endIcon,
    details,
    children,

    className,
    render,
    ref,
    ...htmlProps
  } = DesignContext.useProps(inProps);

  const childrenResolved = children ?? <ButtonContent {...{ title, icon, endIcon, details }} />;

  const mainClass = useMemo(
    () => listItemClassName({ size, selected, forceHover: false, forceActive: false }),
    [size, selected],
  );

  const iconProps = useMemo(() => ({ size: pick(size, LIST_ITEM_ICON_SIZE) }), [size]);

  const compositeStore = Ariakit.useCompositeContext();
  const renderResolved = compositeStore ? (
    <Ariakit.CompositeHover render={<Ariakit.CompositeItem render={render} disabled={disabled} />} focusOnHover />
  ) : (
    render
  );

  return (
    <DesignContext.Provider size={size} disabled={disabled}>
      <IconContext.Provider value={iconProps}>
        <DynamicColorProvider color={color}>
          <Ariakit.Role render={renderResolved} ref={ref} className={cn(mainClass, className)} {...htmlProps}>
            {childrenResolved}
          </Ariakit.Role>
        </DynamicColorProvider>
      </IconContext.Provider>
    </DesignContext.Provider>
  );
}
