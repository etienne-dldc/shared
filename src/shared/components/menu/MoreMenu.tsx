import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { Button } from "../button/Button";
import {
  TDesignButtonHeight,
  TDesignContentSize,
  TDesignSpacing,
  TDesignVariant,
  TPaletteColor,
} from "../core/DesignContext";
import { Menu, MenuProps } from "./Menu";

interface MoreMenuProps extends Omit<MenuProps, "trigger"> {
  // Button Design
  disabled?: boolean;
  height?: TDesignButtonHeight;
  contentSize?: TDesignContentSize;
  spacing?: TDesignSpacing;
  variant?: TDesignVariant;
  hoverVariant?: TDesignVariant;
  color?: TPaletteColor;

  content: React.ReactNode;
  className?: string;
}

export const MoreMenu = forwardRef<HTMLDivElement, MoreMenuProps>(function MoreMenu(
  { disabled, height, contentSize, spacing, variant, hoverVariant, color, content, className, ...props },
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
          {...{ disabled, height, contentSize, spacing, variant, hoverVariant, color }}
          icon={open ? <CaretUpIcon /> : <CaretDownIcon />}
        />
      }
      content={content}
      {...props}
      ref={ref}
    />
  );
});
