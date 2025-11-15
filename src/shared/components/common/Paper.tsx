import clsx from "clsx";
import { paperClass } from "../../css/paper.css";
import { ComponentPropsBase } from "../../utils/componentProps";

export type PaperProps = ComponentPropsBase<"div">;

export function Paper(inProps: PaperProps) {
  const { className, ...props } = inProps;

  return <div className={clsx(paperClass, className)} {...props} />;
}
