import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { TDesignHeight, TDesignSpacing, TDesignVariant, TPaletteColor } from "../../design/types";
import { Button } from "../button/Button";
import { Menu, MenuProps } from "./Menu";

interface MoreMenuProps extends Omit<MenuProps, "trigger"> {
  // Button Design
  disabled?: boolean;
  height?: TDesignHeight;
  heightRatio?: number;
  spacing?: TDesignSpacing;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant;

  color?: TPaletteColor;

  content: React.ReactNode;
  className?: string;
}

export const MoreMenu = forwardRef<HTMLDivElement, MoreMenuProps>(function MoreMenu(
  { disabled, height, heightRatio, spacing, variant, hoverVariant, color, content, className, ...props },
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
          {...{ disabled, height, heightRatio, spacing, variant, hoverVariant, color }}
          startIcon={open ? <CaretUpIcon /> : <CaretDownIcon />}
        />
      }
      content={content}
      {...props}
      ref={ref}
    />
  );
});
