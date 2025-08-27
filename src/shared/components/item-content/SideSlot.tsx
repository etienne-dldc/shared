import { Fragment } from "react/jsx-runtime";
import { css } from "../../../../styled-system/css";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";

interface SideSlotProps {
  icon?: React.ReactNode;
  loading?: boolean;
  slot?: React.ReactNode;
  isItemMainIcon?: boolean;
  isIconOnly?: boolean;
}

export function SideSlot(props: SideSlotProps) {
  const { icon, loading, slot, isItemMainIcon, isIconOnly } = props;

  if (slot) {
    return <Fragment>{slot}</Fragment>;
  }

  if (icon || loading) {
    return (
      <IconBox
        data-item-main-icon={isItemMainIcon && !isIconOnly ? "true" : undefined}
        css={css.raw({ ml: "auto" }, isIconOnly && { mx: "auto" })}
        icon={loading ? <LoadingIcon /> : icon}
      />
    );
  }

  return null;
}
