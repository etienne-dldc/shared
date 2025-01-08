import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { Button } from "../button/Button";
import { TDesignSize, TDesignVariant } from "../core/DesignContext";
import { TDynamicColor } from "../core/DynamicColorProvider";
import { Menu, MenuProps } from "./Menu";

interface MoreMenuProps extends Omit<MenuProps, "trigger"> {
  content: React.ReactNode;
  variant?: TDesignVariant;
  size?: TDesignSize;
  color?: TDynamicColor;
  className?: string;
}

export const MoreMenu = forwardRef<HTMLDivElement, MoreMenuProps>(function MoreMenu(
  { variant, size, color, content, className, ...props },
  ref,
) {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      className={className}
      trigger={<Button variant={variant} size={size} icon={open ? <CaretUp /> : <CaretDown />} color={color} />}
      content={content}
      {...props}
      ref={ref}
    />
  );
});
