import { IconContext, IconWeight } from "@phosphor-icons/react";
import { ComponentProps, useContext, useMemo } from "react";
import { Merge } from "type-fest";
import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { cn } from "../../styles/utils";
import { DesignContext, resolveDesignProps, TDesignButtonHeight, TDesignSpacing } from "../core/DesignContext";

type IconBoxProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    icon: React.ReactNode;
    alt?: string;
    color?: string;
    size?: string | number;
    weight?: IconWeight;
    mirrored?: boolean;
    className?: string;
    height?: TDesignButtonHeight;
    css?: SystemStyleObject;
  }
>;

const ICON_SIZE_MAPPING: Record<TDesignButtonHeight, number> = {
  "2x": 10,
  "3": 12,
  "3x": 14,
  "4": 16,
  "4x": 18,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "10": 40,
  "12": 48,
};

const iconClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  variants: {
    spacing: {
      "2x": { minW: "2x" },
      "3": { minW: "3" },
      "3x": { minW: "3x" },
      "4": { minW: "4" },
      "4x": { minW: "4x" },
      "5": { minW: "5" },
      "6": { minW: "6" },
      "7": { minW: "7" },
      "8": { minW: "8" },
      "10": { minW: "10" },
      "12": { minW: "12" },
    } satisfies Record<TDesignSpacing, SystemStyleObject>,
  },
});

export function IconBox(props: IconBoxProps) {
  const [designBase, { icon, alt, color, size, weight, mirrored, className, css: cssProp, ...htmlProps }] =
    DesignContext.useProps(props);
  const parentIconProps = useContext(IconContext);
  const { height, spacing: spacing } = resolveDesignProps(designBase);
  const resolvedSize = size ?? ICON_SIZE_MAPPING[height] ?? 16;

  const mergedProps = useMemo(
    () => ({
      ...parentIconProps,
      size: resolvedSize,
      alt: alt || parentIconProps.alt,
      color: color || parentIconProps.color,
      weight: weight || parentIconProps.weight,
      mirrored: mirrored || parentIconProps.mirrored,
    }),
    [parentIconProps, alt, color, resolvedSize, weight, mirrored],
  );

  return (
    <IconContext.Provider value={mergedProps}>
      <div
        className={cn(css(iconClass.raw({ spacing: spacing }), cssProp), className)}
        style={{ minHeight: resolvedSize }}
        {...htmlProps}
      >
        {icon}
      </div>
    </IconContext.Provider>
  );
}
