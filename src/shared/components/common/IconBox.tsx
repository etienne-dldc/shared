import { IconContext, IconWeight } from "@phosphor-icons/react";
import { useContext, useMemo } from "react";
import { cx } from "../../../../styled-system/css";
import { iconStyles } from "../../css/icon";
import { TDesignHeight } from "../../design/types";
import { ComponentPropsBaseWith } from "../../utils/componentProps";

type IconBoxProps = ComponentPropsBaseWith<
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

export function IconBox(props: IconBoxProps) {
  const { icon, alt, color, weight, size, mirrored, className, style, ...htmlProps } = props;
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

  const [iconClas, inlineStyles] = iconStyles(size);

  return (
    <IconContext.Provider value={mergedProps}>
      <div className={cx(iconClas, className)} style={{ ...inlineStyles, ...style }} {...htmlProps}>
        {icon}
      </div>
    </IconContext.Provider>
  );
}

IconBox.displayName = "IconBox";
