import * as Ariakit from "@ariakit/react";
import { BackspaceIcon } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { Button } from "../../button/Button";
import { Input, InputProps } from "../../form/Input";
import { FrameContent } from "../../frame/FrameContent";

interface ComboboxInputProps extends InputProps {
  value: string;
  onClear?: () => void;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput(
  { value, placeholder = "Search", onClear, className, ...inputProps },
  ref,
) {
  return (
    <Input
      ref={ref}
      {...inputProps}
      placeholder={placeholder}
      value={value}
      className={cx(css({ flexGrow: 1 }), className)}
      endSlot={
        value.length > 0 && (
          <Ariakit.ComboboxCancel render={<Button spacing="4" className="mr-1.5" color="red" />} onClick={onClear}>
            <FrameContent startIcon={<BackspaceIcon />} />
          </Ariakit.ComboboxCancel>
        )
      }
    />
  );
});
