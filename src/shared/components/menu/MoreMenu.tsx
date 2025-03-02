import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { Button } from "../button/Button";
import { TDesignSize } from "../core/DesignContext";
import { TDynamicColor } from "../core/DynamicColorProvider";
import { Menu, MenuProps } from "./Menu";

interface MoreMenuProps extends Omit<MenuProps, "trigger"> {
  content: React.ReactNode;
  primary?: boolean;
  size?: TDesignSize;
  color?: TDynamicColor;
  className?: string;
}

export const MoreMenu = forwardRef<HTMLDivElement, MoreMenuProps>(function MoreMenu(
  { primary, size, color, content, className, ...props },
  ref,
) {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      className={className}
      trigger={<Button primary={primary} size={size} icon={open ? <CaretUp /> : <CaretDown />} color={color} />}
      content={content}
      {...props}
      ref={ref}
    />
  );
});
