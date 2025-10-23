import { useMemo } from "react";
import { css, cx } from "../../../../styled-system/css";
import { frameInputContentClass } from "../../design/frameInputContent";
import { ComponentPropsBase } from "../../utils/componentProps";

export type FrameInputContentProps = ComponentPropsBase<
  "input",
  {
    disabled?: boolean;
    onValueChange?: (value: string) => void;
  }
>;

export function FrameInputContent(inProps: FrameInputContentProps) {
  const { css: cssProps, className, onValueChange, onChange, ...inputProps } = inProps;

  const inputOnChange = useMemo(() => {
    if (!onValueChange && !onChange) {
      return undefined;
    }
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
      onChange?.(event);
    };
  }, [onChange, onValueChange]);

  return (
    <input
      className={cx(css(frameInputContentClass.raw(), cssProps), className)}
      onChange={inputOnChange}
      {...inputProps}
    />
  );
}

FrameInputContent.displayName = "FrameInputContent";
