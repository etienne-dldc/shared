import clsx from "clsx";
import { useMemo } from "react";
import { frameInputContentClass } from "../../css/frameInputContent.css";
import { ComponentPropsBaseWith } from "../../utils/componentProps";

export type FrameInputContentProps = ComponentPropsBaseWith<
  "input",
  {
    disabled?: boolean;
    onValueChange?: (value: string) => void;
    value?: string;
  }
>;

export function FrameInputContent(inProps: FrameInputContentProps) {
  const { className, onValueChange, onChange, ...inputProps } = inProps;

  const inputOnChange = useMemo(() => {
    if (!onValueChange && !onChange) {
      return undefined;
    }
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
      onChange?.(event);
    };
  }, [onChange, onValueChange]);

  return <input className={clsx(frameInputContentClass, className)} onChange={inputOnChange} {...inputProps} />;
}

FrameInputContent.displayName = "FrameInputContent";
