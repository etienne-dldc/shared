import { IconContext, IconWeight } from "@phosphor-icons/react";
import { useContext, useMemo } from "react";
import { css, cx } from "../../../../styled-system/css";
import { sizeToRemString } from "../../design/sizes";
import { TDesignHeight } from "../../design/types";
import { ComponentPropsBase } from "../../utils/componentProps";

type IconBoxProps = ComponentPropsBase<
  "div",
  {
    icon: React.ReactNode;
    alt?: string;
    color?: string;
    weight?: IconWeight;
    mirrored?: boolean;
    size?: TDesignHeight;
  }
>;

const iconClass = css.raw({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "var(--content-size)",
  height: "var(--content-size)",
});

export function IconBox(props: IconBoxProps) {
  const { icon, alt, color, weight, size, mirrored, className, css: cssProps, style, ...htmlProps } = props;
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
        className={cx(css(iconClass, cssProps), className)}
        style={size ? { ["--content-size" as string]: sizeToRemString(size), ...style } : style}
        {...htmlProps}
      >
        {icon}
      </div>
    </IconContext.Provider>
  );
}
