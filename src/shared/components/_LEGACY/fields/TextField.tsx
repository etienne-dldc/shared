import * as Ariakit from "@ariakit/react";
import { useState } from "react";
import * as v from "valibot";
import { FieldError } from "../../form/FieldError";
import { Input, InputProps } from "../../form/Input";
import { Label } from "../../form/Label";
import { FrameInputContent } from "../../frame/FrameInputContent";
import { StringLike } from "./utils";

export interface TextFieldProps extends Omit<InputProps, "name"> {
  name: StringLike;
  label: string;
  labelHidden?: boolean;
  className?: string;
  disabled?: boolean;
  schema?: v.BaseSchema<any, any, v.BaseIssue<unknown>>;
}

export function TextField({
  name,
  schema,
  label,
  labelHidden = false,
  disabled = false,
  // className,
  defaultValue,
  ...inputProps
}: TextFieldProps) {
  const store = Ariakit.useFormContext();
  if (!store) {
    throw new Error("TextField must be used inside a Form");
  }

  const [storeDefaultValue] = useState(() => store.getValue(name));

  store.useValidate(() => {
    if (schema) {
      const value = store.getValue(name);
      const res = v.safeParse(schema, value);
      if (!res.success) {
        store.setError(name, res.issues[0].message);
      }
    }
  });

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
      <Input {...inputProps}>
        <Ariakit.FormInput
          name={name}
          render={
            <FrameInputContent name={`${name}`} disabled={disabled} defaultValue={defaultValue ?? storeDefaultValue} />
          }
        />
      </Input>
      <Ariakit.FormError name={name} render={error ? <FieldError /> : <Ariakit.VisuallyHidden />} />
    </div>
  );
}
