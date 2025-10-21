import { Fragment } from "react/jsx-runtime";
import { SystemStyleObject } from "../../../../styled-system/types";
import { IconBox } from "../common/IconBox";
import { LoadingIcon } from "../common/LoadingIcon";

interface FrameSideSlotProps {
  icon?: React.ReactNode;
  loading?: boolean;
  slot?: React.ReactNode;
  isItemMainIcon?: boolean;
  isIconOnly?: boolean;
  css?: SystemStyleObject;
}

export function FrameSideSlot(props: FrameSideSlotProps) {
  const { icon, loading, slot, isItemMainIcon, isIconOnly, css: cssProp } = props;

  if (slot) {
    return <Fragment>{slot}</Fragment>;
  }

  if (icon || loading) {
    return (
      <IconBox
        data-item-main-icon={isItemMainIcon && !isIconOnly ? "true" : undefined}
        css={cssProp}
        icon={loading ? <LoadingIcon /> : icon}
      />
    );
  }

  return null;
}

FrameSideSlot.displayName = "FrameSideSlot";
