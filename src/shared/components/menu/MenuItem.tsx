import * as Ariakit from "@ariakit/react";
import { IconContext } from "@phosphor-icons/react";
import { forwardRef, useMemo } from "react";
import { cn, pick, tw } from "../../styles/utils";
import { ButtonContent } from "../button/ButtonContent";
import { DesignContext, TDesignSize } from "../core/DesignContext";
import { DynamicColorProvider, TDynamicColor } from "../core/DynamicColorProvider";

interface MenuItemProps extends Omit<Ariakit.MenuItemProps, "title" | "color"> {
  color?: TDynamicColor;
  size?: TDesignSize;

  // Content
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  title?: React.ReactNode;
  details?: string | React.ReactNode;
  loading?: boolean;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(inProps, ref) {
  const {
    color,
    size,
    disabled,

    title,
    icon,
    endIcon,
    details,
    loading,
    children = <ButtonContent {...{ title, icon, endIcon, details, loading }} />,

    className,
    ...props
  } = DesignContext.useProps(inProps);

  const mainClass = useMemo(() => dropdownItemClassName(size), [size]);
  const iconProps = useMemo(() => ({ size: pick(size, { xs: 16, sm: 16, md: 20, lg: 26 }) }), [size]);

  return (
    <DesignContext.Provider size={size} disabled={disabled}>
      <IconContext.Provider value={iconProps}>
        <DynamicColorProvider color={color}>
          <Ariakit.MenuItem disabled={disabled} ref={ref} className={cn(mainClass, className)} {...props}>
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
