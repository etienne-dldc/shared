import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { Button } from "../button/Button";
import { TDesignSize, TDesignVariant, TNestedDesignHeight, TPaletteColor } from "../core/DesignContext";
import { Menu, MenuProps } from "./Menu";

interface MoreMenuProps extends Omit<MenuProps, "trigger"> {
  // Button Design
  disabled?: boolean;
  height?: TDesignSize;
  spacing?: TDesignSize;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant;

  nestedHeight?: TNestedDesignHeight;
  color?: TPaletteColor;

  content: React.ReactNode;
  className?: string;
}

export const MoreMenu = forwardRef<HTMLDivElement, MoreMenuProps>(function MoreMenu(
  { disabled, height, nestedHeight, spacing, variant, hoverVariant, color, content, className, ...props },
  ref,
) {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      className={className}
      trigger={
        <Button
          {...{ disabled, height, nestedHeight, spacing, variant, hoverVariant, color }}
          startIcon={open ? <CaretUpIcon /> : <CaretDownIcon />}
        />
      }
      content={content}
      {...props}
      ref={ref}
    />
  );
});
