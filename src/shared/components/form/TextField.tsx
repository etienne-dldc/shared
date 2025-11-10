import { StringLike } from "@ariakit/core/form/types";
import * as Ariakit from "@ariakit/react";
import { useState } from "react";
import * as v from "valibot";
import { css } from "../../../../styled-system/css";
import { SanitizePropsBase } from "../../utils/componentProps";
import { FrameInputContent } from "../frame/FrameInputContent";
import { FieldError } from "./FieldError";
import { Input, InputProps } from "./Input";
import { Label } from "./Label";

export type TextFieldProps = SanitizePropsBase<
  HTMLDivElement,
  Omit<InputProps, "name" | "value"> & {
    name: StringLike;
    label: string;
    labelHidden?: boolean;
    schema?: v.BaseSchema<any, any, v.BaseIssue<unknown>>;
  }
>;

export function TextField({
  name,
  schema,
  label,
  labelHidden = false,

  disabled = false,
  defaultValue,
  required,
  placeholder,
  type,

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
    <div className={css({ display: "flex", flexDirection: "column" })}>
      <Label hidden={labelHidden} disabled={disabled} render={<Ariakit.FormLabel name={name} />}>
        {label}
      </Label>
      <Input {...inputProps}>
        <Ariakit.FormInput
          name={name}
          render={
            <FrameInputContent
              name={`${name}`}
              disabled={disabled}
              defaultValue={defaultValue ?? storeDefaultValue}
              required={required}
              placeholder={placeholder}
              type={type}
            />
          }
        />
      </Input>
      <Ariakit.FormError name={name} render={error ? <FieldError /> : <Ariakit.VisuallyHidden />} />
    </div>
  );
}
