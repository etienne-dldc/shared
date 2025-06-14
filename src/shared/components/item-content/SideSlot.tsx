import { Fragment } from "react/jsx-runtime";
import { css } from "../../../../styled-system/css";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";

interface SideSlotProps {
  icon?: React.ReactNode;
  loading?: boolean;
  slot?: React.ReactNode;
  isItemIconSlot?: boolean;
  isIconOnly?: boolean;
}

export function SideSlot(props: SideSlotProps) {
  const { icon, loading, slot, isItemIconSlot, isIconOnly } = props;

  if (slot) {
    return <Fragment>{slot}</Fragment>;
  }

  if (icon || loading) {
    return (
      <IconBox
        data-slot={isItemIconSlot ? "item-icon" : undefined}
        css={css.raw({ ml: "auto" }, isIconOnly && { mx: "auto" })}
        icon={loading ? <LoadingIcon /> : icon}
      />
    );
  }

  return null;
}
