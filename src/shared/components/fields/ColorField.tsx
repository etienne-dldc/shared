import * as Ariakit from "@ariakit/react";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
// import colors from "tailwindcss/colors";
import { Paper } from "../../../../styled-system/jsx";
import { COLOR_NAMES, toColor, VALID_COLORS } from "../../design/colors";
import { Button } from "../button/Button";
import { FieldError } from "../form/FieldError";
import { Label } from "../form/Label";
import { FrameContent } from "../frame/FrameContent";
import { StringLike } from "./utils";

interface ColorFieldProps {
  name: StringLike;
  label: string;
  disabled?: boolean;
  required?: boolean;
  colorLevel?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export function ColorField({
  name,
  label,
  disabled = false,
  required = false,
  // colorLevel = 500
}: ColorFieldProps) {
  const store = Ariakit.useFormContext();
  if (!store) {
    throw new Error("DateField must be used inside a Form");
  }
  const value = store.useValue(name);
  const valueColor = toColor(value);

  useEffect(() => {
    if (value !== valueColor) {
      store.setValue(name, valueColor);
    }
  }, [name, store, value, valueColor]);

  store.useValidate(() => {
    if (required && !value) {
      store.setError(name, "Required");
    }
  });

  const selectStore = Ariakit.useSelectStore({
    value,
    setValue: (value) => store.setValue(name, toColor(value)),
  });
  const selectOpen = Ariakit.useStoreState(selectStore, (s) => s.open);

  return (
    <Ariakit.SelectProvider store={selectStore}>
      <div className="flex flex-col">
        <Ariakit.FormLabel name={name} render={<Label disabled={disabled} />}>
          {label}
        </Ariakit.FormLabel>

        <Ariakit.FormControl
          name={name}
          required={required}
          render={
            <Ariakit.Select render={<Button className="cursor-pointer" />} disabled={disabled}>
              <FrameContent
                startIcon={
                  <span
                    className="w-5 h-5 rounded-sm"
                    style={
                      {
                        // background: colors[valueColor][colorLevel]
                      }
                    }
                  />
                }
                endIcon={<Ariakit.SelectArrow render={selectOpen ? <CaretUpIcon /> : <CaretDownIcon />} />}
              >
                {COLOR_NAMES[valueColor]}
              </FrameContent>
            </Ariakit.Select>
          }
        />
        <Ariakit.FormError name={name} render={<FieldError />} />
        <Ariakit.SelectPopover
          gutter={4}
          sameWidth
          portal
          fitViewport
          overlap
          render={<Paper />}
          className="max-h-[var(--popover-available-height)] overflow-hidden"
        >
          <div className="overflow-auto flex flex-col py-2">
            {VALID_COLORS.map((color) => (
              <Ariakit.SelectItem
                key={color}
                className="flex flex-row px-2 py-1 gap-2 items-center cursor-pointer data-active-item:bg-white/5"
                value={color}
              >
                <span
                  className="w-5 h-5 rounded-sm"
                  style={
                    {
                      // background: colors[color][colorLevel]
                    }
                  }
                />
                <span className="text-base">{COLOR_NAMES[color]}</span>
              </Ariakit.SelectItem>
            ))}
          </div>
        </Ariakit.SelectPopover>
      </div>
    </Ariakit.SelectProvider>
  );
}
