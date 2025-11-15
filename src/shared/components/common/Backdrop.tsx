import clsx from "clsx";
import { backdropClass } from "../../css/backdrop.css";
import { ComponentPropsBase } from "../../utils/componentProps";

export type BackdropProps = ComponentPropsBase<"div">;

export function Backdrop(inProps: BackdropProps) {
  const { className, ...props } = inProps;

  return <div className={clsx(backdropClass, className)} {...props} />;
}
