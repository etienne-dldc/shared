import { css, cx } from "../../../../styled-system/css";
import { frameInputContentClass } from "../../design/frameInputContent";
import { ComponentPropsBase } from "../../utils/componentProps";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { DisabledContext, useDisabled } from "../core/DisabledContext";

export type FrameInputContentProps = ComponentPropsBase<
  "input",
  {
    disabled?: boolean;
  }
>;

export function FrameInputContent(inProps: FrameInputContentProps) {
  const [{ localDisabled }, props] = pipePropsSplitters(inProps, {
    localDisabled: DisabledContext.propsSplitter,
  });

  const { css: cssProps, className, ...inputProps } = props;

  const disabled = useDisabled(localDisabled);

  return (
    <input className={cx(css(frameInputContentClass.raw(), cssProps), className)} disabled={disabled} {...inputProps} />
  );
}

FrameInputContent.displayName = "FrameInputContent";
