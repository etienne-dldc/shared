import * as Ariakit from "@ariakit/react";
import { BackspaceIcon } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { css, cx } from "../../../../styled-system/css";
import { Button } from "../button-legacy/Button";
import { ButtonContent } from "../button-legacy/ButtonContent";
import { TextInput, TextInputProps } from "../form/TextInput";

interface ComboboxInputProps extends TextInputProps {
  value: string;
  onClear?: () => void;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput(
  { value, placeholder = "Search", onClear, className, ...inputProps },
  ref,
) {
  return (
    <TextInput
      ref={ref}
      {...inputProps}
      placeholder={placeholder}
      noHightlight
      value={value}
      className={cx(css({ flexGrow: 1 }), className)}
      endActions={
        value.length > 0 && (
          <Ariakit.ComboboxCancel
            render={<Button filled={false} size="xs" rounded="all" className="mr-1.5" color="red" />}
            onClick={onClear}
          >
            <ButtonContent icon={<BackspaceIcon />} />
          </Ariakit.ComboboxCancel>
        )
      }
    />
  );
});
