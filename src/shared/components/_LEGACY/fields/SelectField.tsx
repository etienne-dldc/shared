import * as Ariakit from "@ariakit/react";
import { Select } from "../../select/Select";
import { TSelectItem } from "../../select/types";
import { FieldError } from "../form/FieldError";
import { Label } from "../form/Label";
import { StringLike } from "./utils";

export interface SelectFieldProps<Value extends string> {
  name: StringLike;
  label: React.ReactNode;

  labelHidden?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  items: TSelectItem<Value>[];
  placeholderItem?: TSelectItem<Value>;
  disabled?: boolean;
  value?: Value;
  emptyValue?: Value;
  caret?: boolean;
  renderSelected?: (item: TSelectItem<Value>) => React.ReactNode;
  className?: string;
}

export function SelectField<Value extends string>({ name, label, ...selectProps }: SelectFieldProps<Value>) {
  const store = Ariakit.useFormContext();
  if (!store) {
    throw new Error("DateField must be used inside a Form");
  }

  const value = store.useValue(name);

  return (
    <div className="flex flex-col">
      <Ariakit.FormControl
        name={name}
        render={
          <Select
            label={label}
            renderLabel={<Ariakit.FormLabel name={name} render={<Label disabled={selectProps.disabled} />} />}
            issues={<Ariakit.FormError name={name} render={<FieldError />} />}
            name={`${name}`}
            value={value}
            onChange={(value) => {
              store.setValue(name, value);
            }}
            {...selectProps}
          />
        }
      />
    </div>
  );
}
