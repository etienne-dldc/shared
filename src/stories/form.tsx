import { useState } from "react";
import { Variants } from "../playground/Variants";
import { CheckBox } from "../shared/components/form/CheckBox";

const CHECKED_VARIANTS = {
  yes: true,
  no: false,
  auto: "auto",
} as const;

const SIZE_VARIANTS = { xs: "xs", sm: "sm", md: "md", lg: "lg" } as const;

export default function FormPlayground() {
  const [globalCheched, setGlobalChecked] = useState(false);

  return (
    <Variants
      localStorageKey="checkbox"
      cellMinWidth={200}
      dimensions={{
        checked: CHECKED_VARIANTS,
        size: SIZE_VARIANTS,
      }}
      defaultSelected={{
        checked: "auto",
        size: "md",
      }}
      presets={{
        base: { row: [], column: [], selected: {} },
      }}
      render={({ checked }) => (
        <div
        // className={cn("w-full h-full")}
        >
          <CheckBox
            checked={checked === "auto" ? globalCheched : checked}
            onChange={checked === "auto" ? setGlobalChecked : undefined}
            // size={size}
          />
        </div>
      )}
    />
  );
}
