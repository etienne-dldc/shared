import * as Ariakit from "@ariakit/react";
import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "../form/FieldError";
import { Label } from "../form/Label";
import { NumberInput, NumberInputProps } from "../form/NumberInput";
import { StringLike } from "./utils";

export interface NumberFieldProps extends Omit<NumberInputProps, "name" | "value" | "onChange"> {
  name: StringLike;
  label: string;
  labelHidden?: boolean;
  className?: string;
  disabled?: boolean;
}

export const NumberField = forwardRef(function NumberField(
  { name, label, labelHidden = false, disabled = false, className, ...inputProps }: NumberFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const store = Ariakit.useFormContext();
  if (!store) {
    throw new Error("DateField must be used inside a Form");
  }

  const value = store.useValue<string>(name);
  const valueParsed = value ? parseFloat(value) : null;

  const error = Ariakit.useStoreState(store, () => {
    const error = store.getError(name);
    if (error == null) return;
    if (!store?.getFieldTouched(name)) return;
    return error;
  });

  return (
    <div
    // className={cn("flex flex-col", className)}
    >
      <Label hidden={labelHidden} disabled={disabled} render={<Ariakit.FormLabel name={name} />}>
        {label}
      </Label>
      <Ariakit.FormControl
        name={name}
        render={
          <NumberInput
            ref={ref}
            name={`${name}`}
            disabled={disabled}
            {...inputProps}
            value={valueParsed}
            onChange={(value) => {
              store.setValue(name, value?.toString() ?? "");
            }}
          />
        }
      />
      <Ariakit.FormError name={name} render={error ? <FieldError /> : <Ariakit.VisuallyHidden />} />
    </div>
  );
});
