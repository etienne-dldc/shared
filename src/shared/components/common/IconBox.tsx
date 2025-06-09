import { IconContext, IconWeight } from "@phosphor-icons/react";
import { ComponentProps, useContext, useMemo } from "react";
import { Merge } from "type-fest";
import { css } from "../../../../styled-system/css";
import { SystemStyleObject } from "../../../../styled-system/types";
import { cn } from "../../styles/utils";

type IconBoxProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    icon: React.ReactNode;
    alt?: string;
    color?: string;
    weight?: IconWeight;
    mirrored?: boolean;
    size?: string;
    className?: string;
    css?: SystemStyleObject;
  }
>;

const iconClass = css.raw({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "var(--icon-size)",
  height: "var(--icon-size)",
});

export function IconBox(props: IconBoxProps) {
  const { icon, alt, color, weight, size, mirrored, className, css: cssProp, style, ...htmlProps } = props;
  const parentIconProps = useContext(IconContext);

  const mergedProps = useMemo(
    () => ({
      ...parentIconProps,
      size: "100%",
      alt: alt || parentIconProps.alt,
      color: color || parentIconProps.color,
      weight: weight || parentIconProps.weight,
      mirrored: mirrored || parentIconProps.mirrored,
    }),
    [parentIconProps, alt, color, weight, mirrored],
  );

  return (
    <IconContext.Provider value={mergedProps}>
      <div
        className={cn(css(iconClass, cssProp), className)}
        style={size ? { ["--icon-size" as string]: size, ...style } : style}
        {...htmlProps}
      >
        {icon}
      </div>
    </IconContext.Provider>
  );
}
