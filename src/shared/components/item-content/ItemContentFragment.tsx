import { Fragment } from "react/jsx-runtime";
import { Ellipsis } from "../../../../styled-system/jsx";
import { isNotNil } from "../../utils/nil";
import { SideSlot } from "./SideSlot";

interface ItemContentFragmentProps {
  startIcon?: React.ReactNode;
  loading?: boolean;
  startSlot?: React.ReactNode;
  endIcon?: React.ReactNode;
  endSlot?: React.ReactNode;
  children?: React.ReactNode;
}

export function ItemContentFragment(props: ItemContentFragmentProps) {
  const { startIcon, loading, startSlot, endIcon, endSlot, children } = props;

  const hasStartSlot = Boolean(startSlot || startIcon || loading);
  const hasEndSlot = Boolean(endSlot || endIcon);
  const hasChildren = isNotNil(children);
  // Special case for start icon/slot only
  const iconOnly = (hasStartSlot && !hasChildren && !hasEndSlot) || (hasEndSlot && !hasStartSlot && !hasChildren);

  return (
    <Fragment>
      {hasStartSlot && (
        <SideSlot icon={startIcon} loading={loading} slot={startSlot} isItemMainIcon isIconOnly={iconOnly} />
      )}
      {hasChildren && (typeof children === "string" ? <Ellipsis flex="1">{children}</Ellipsis> : children)}
      {hasEndSlot && <SideSlot icon={endIcon} slot={endSlot} isItemMainIcon={false} isIconOnly={iconOnly} />}
    </Fragment>
  );
}
