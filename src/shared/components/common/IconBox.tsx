import { IconContext, IconWeight } from "@phosphor-icons/react";
import { useContext, useMemo } from "react";
import { css, cva } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { cn } from "../../styles/utils";
import { DesignContext, resolveDesignProps, TDesignCrossSize, TDesignMainSize } from "../core/DesignContext";

interface IconBoxProps {
  icon: React.ReactNode;
  alt?: string;
  color?: string;
  size?: string | number;
  weight?: IconWeight;
  mirrored?: boolean;
  className?: string;
  crossSize?: TDesignCrossSize;
  css?: SystemStyleObject;
}

const ICON_SIZE_MAPPING: Record<TDesignCrossSize, number> = {
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
    mainSize: {
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
    } satisfies Record<TDesignMainSize, SystemStyleObject>,
  },
});

export function IconBox(props: IconBoxProps) {
  const [designBase, { icon, alt, color, size, weight, mirrored, className, css: cssProp }] =
    DesignContext.useProps(props);
  const parentIconProps = useContext(IconContext);
  const { crossSize, mainSize } = resolveDesignProps(designBase);
  const resolvedSize = size ?? ICON_SIZE_MAPPING[crossSize] ?? 16;

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
      <div className={cn(css(iconClass.raw({ mainSize }), cssProp), className)} style={{ minHeight: resolvedSize }}>
        {icon}
      </div>
    </IconContext.Provider>
  );
}
