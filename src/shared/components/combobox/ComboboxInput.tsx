import * as Ariakit from "@ariakit/react";
import { Backspace } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { cn } from "../../styles/utils";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/ButtonContent";
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
      className={cn("flex-1", className)}
      endActions={
        value.length > 0 && (
          <Ariakit.ComboboxCancel
            render={<Button variant="tertiary" size="xs" rounded="all" className="mr-1.5" color="red" />}
            onClick={onClear}
          >
            <ButtonContent icon={<Backspace />} />
          </Ariakit.ComboboxCancel>
        )
      }
    />
  );
});
