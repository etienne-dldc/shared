import * as Ariakit from "@ariakit/react";
import { fr } from "date-fns/locale/fr";
import { ForwardedRef, forwardRef, useState } from "react";
import { DayPicker as ReactDayPicker } from "react-day-picker";
import { cn, tw } from "../../styles/utils";
import { capitalize } from "../../utils/capitalize";
import { Paper } from "../common/Paper";
import { FieldError } from "../form/FieldError";
import { Label } from "../form/Label";
import { TextInput } from "../form/TextInput";
import { StringLike } from "./utils";

import "react-day-picker/dist/style.css";

interface DateFieldProps {
  name: StringLike;
  label: string;
  disabled?: boolean;
}

export const DateField = forwardRef(function DateField(
  { name, label, disabled = false }: DateFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const store = Ariakit.useFormContext();
  if (!store) {
    throw new Error("DateField must be used inside a Form");
  }

  const value = store.useValue(name);
  const valueDate = value ? new Date(value) : null;

  const [pickerOpen, setPickerOpen] = useState(false);

  const popoverStore = Ariakit.usePopoverStore({
    open: pickerOpen,
    setOpen: setPickerOpen,
    placement: "bottom-start",
  });

  return (
    <Ariakit.PopoverProvider store={popoverStore}>
      <div className="flex flex-col">
        <Ariakit.FormLabel name={name} render={<Label disabled={disabled} />}>
          {label}
        </Ariakit.FormLabel>
        <Ariakit.FormControl
          name={name}
          ref={ref}
          render={
            <Ariakit.PopoverDisclosure
              render={
                <TextInput
                  disabled={disabled}
                  readOnly
                  value={value ? formatNativeDateStr(value) : ""}
                  placeholder="Select a date"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPickerOpen(true);
                    }
                  }}
                />
              }
            />
          }
        />
        <Ariakit.FormError name={name} render={<FieldError />} />
      </div>
      <Ariakit.Popover
        gutter={4}
        portal
        render={<Paper level="popover" className="" />}
      >
        <div>
          <ReactDayPicker
            mode="single"
            selected={valueDate ?? undefined}
            locale={fr}
            fixedWeeks
            showOutsideDays
            defaultMonth={valueDate ?? new Date()}
            captionLayout="dropdown"
            onSelect={(day) => {
              store.setValue(name, day?.toISOString() ?? "");
              setPickerOpen(false);
            }}
            classNames={{
              month_caption: cn("rdp-month_caption", tw`ml-4 capitalize`),
            }}
          />
        </div>
      </Ariakit.Popover>
    </Ariakit.PopoverProvider>
  );
});

const nativeDateFormatter = Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});

function formatNativeDateStr(date: string) {
  return capitalize(nativeDateFormatter.format(new Date(date)));
}
