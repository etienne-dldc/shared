import * as Ariakit from "@ariakit/react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useEffect } from "react";

import { COLOR_NAMES, colors, toColor, VALID_COLORS } from "../../styles/colors";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/ButtonContent";
import { DynamicColorProvider } from "../DynamicColorProvider";
import { FieldError } from "../form/FieldError";
import { Label } from "../form/Label";
import { Paper } from "../Paper";
import { StringLike } from "./utils";

interface ColorFieldProps {
  name: StringLike;
  label: string;
  disabled?: boolean;
  required?: boolean;
  colorLevel?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export function ColorField({ name, label, disabled = false, required = false, colorLevel = 500 }: ColorFieldProps) {
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
      <DynamicColorProvider color="slate">
        <div className="flex flex-col">
          <Ariakit.FormLabel name={name} render={<Label disabled={disabled} />}>
            {label}
          </Ariakit.FormLabel>

          <Ariakit.FormControl
            name={name}
            required={required}
            render={
              <Ariakit.Select render={<Button className="cursor-pointer" />} disabled={disabled}>
                <ButtonContent
                  icon={<span className="w-5 h-5 rounded" style={{ background: colors[valueColor][colorLevel] }} />}
                  title={COLOR_NAMES[valueColor]}
                  endIcon={<Ariakit.SelectArrow render={selectOpen ? <CaretUp /> : <CaretDown />} />}
                />
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
            render={<Paper level="popover" />}
            className="max-h-[var(--popover-available-height)] overflow-hidden"
          >
            <div className="overflow-auto flex flex-col py-2">
              {VALID_COLORS.map((color) => (
                <Ariakit.SelectItem
                  key={color}
                  className="flex flex-row px-2 py-1 gap-2 items-center cursor-pointer data-active-item:bg-white/5"
                  value={color}
                >
                  <span className="w-5 h-5 rounded" style={{ background: colors[color][colorLevel] }} />
                  <span className="text-base">{COLOR_NAMES[color]}</span>
                </Ariakit.SelectItem>
              ))}
            </div>
          </Ariakit.SelectPopover>
        </div>
      </DynamicColorProvider>
    </Ariakit.SelectProvider>
  );
}
