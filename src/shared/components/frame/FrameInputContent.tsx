/* eslint-disable react-hooks/preserve-manual-memoization */

import { useMemo } from "react";
import { css, cx } from "../../../../styled-system/css";
import { frameInputContentClass } from "../../design/frameInputContent";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DisabledContext, useDisabled } from "../core/DisabledContext";

export type FrameInputContentProps = ComponentPropsBase<
  "input",
  {
    disabled?: boolean;
    onValueChange?: (value: string) => void;
  }
>;

export function FrameInputContent(inProps: FrameInputContentProps) {
  const [{ localDisabled }, props] = pipePropsSplitters(inProps, {
    localDisabled: DisabledContext.propsSplitter,
  });

  const { css: cssProps, className, onValueChange, onChange, ...inputProps } = props;

  const disabled = useDisabled(localDisabled);

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
      disabled={disabled}
      onChange={inputOnChange}
      {...inputProps}
    />
  );
}

FrameInputContent.displayName = "FrameInputContent";
