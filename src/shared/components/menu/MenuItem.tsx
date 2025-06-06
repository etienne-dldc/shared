import * as Ariakit from "@ariakit/react";
import { IconContext } from "@phosphor-icons/react";
import { forwardRef, useMemo } from "react";
import { Merge } from "type-fest";
import { cn, tw } from "../../styles/utils";
import { pick } from "../../utils/pick";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DesignContext, TDesignCrossSize } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";
import { ItemContent } from "../item-content/ItemContent";

export type MenuItemProps = Merge<
  Omit<Ariakit.MenuItemProps, "title" | "color">,
  {
    color?: TDynamicColor;
    crossSize?: TDesignCrossSize;

    // Content
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    content?: React.ReactNode;
    details?: string | React.ReactNode;
    loading?: boolean;
  }
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(inProps, ref) {
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });

  const {
    color,

    content,
    icon,
    endIcon,
    details,
    loading,
    children = <ItemContent {...{ icon, endIcon, details, loading }}>{content}</ItemContent>,

    className,
    ...htmlProps
  } = props;

  const mainClass = useMemo(() => dropdownItemClassName(design.crossSize), [design.crossSize]);
  const iconProps = useMemo(
    () => ({ size: pick(design.crossSize, { xs: 16, sm: 16, md: 20, lg: 26, smInner: 16, mdInner: 20, lgInner: 26 }) }),
    [design.crossSize],
  );

  return (
    <DesignContext.Provider value={design}>
      <IconContext.Provider value={iconProps}>
        <DynamicColorProvider color={color}>
          <Ariakit.MenuItem disabled={disabled.disabled} ref={ref} className={cn(mainClass, className)} {...htmlProps}>
            {children}
          </Ariakit.MenuItem>
        </DynamicColorProvider>
      </IconContext.Provider>
    </DesignContext.Provider>
  );
});

function dropdownItemClassName(size: TDesignSize) {
  const sizeClass = pick(size, {
    xs: tw`text-sm min-h-[28px] min-w-[28px]`,
    sm: tw`text-sm min-h-[32px] min-w-[32px]`,
    md: tw`text-base min-h-[40px] min-w-[40px]`,
    lg: tw`text-lg min-h-[54px] min-w-[54px]`,
    smInner: tw`text-sm min-h-[20px] min-w-[20px]`,
    mdInner: tw`text-base min-h-[28px] min-w-[28px]`,
    lgInner: tw`text-lg min-h-[34px] min-w-[34px]`,
  });

  return cn(
    tw`flex flex-row items-center text-left group overflow-hidden relative`,
    tw`rounded-xs text-dynamic-200`,
    tw`data-active-item:bg-dynamic-600 data-active-item:text-white`,

    tw`outline-hidden cursor-pointer`,
    tw`aria-disabled:text-dynamic-200/50 aria-disabled:cursor-not-allowed`,

    sizeClass,
  );
}
