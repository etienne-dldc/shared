import * as Ariakit from "@ariakit/react";
import { IconContext } from "@phosphor-icons/react";
import { forwardRef, useMemo } from "react";
import { cn, tw } from "../../styles/utils";
import { pick } from "../../utils/pick";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { ButtonContent } from "../button/ButtonContent";
import { DesignContext, TDesignSize } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
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
  const [{ design, disabled }, props] = pipePropsSplitters(inProps, {
    design: DesignContext.usePropsSplitter(),
    disabled: DisabledContext.usePropsSplitter(),
  });

  const {
    color,

    title,
    icon,
    endIcon,
    details,
    loading,
    children = <ButtonContent {...{ title, icon, endIcon, details, loading }} />,

    className,
    ...htmlProps
  } = props;

  const mainClass = useMemo(() => dropdownItemClassName(design.size), [design.size]);
  const iconProps = useMemo(() => ({ size: pick(design.size, { xs: 16, sm: 16, md: 20, lg: 26 }) }), [design.size]);

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
