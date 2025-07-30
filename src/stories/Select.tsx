import { Fragment } from "react/jsx-runtime";
import { Variants } from "../playground/LegacyVariants";
import { Select } from "../shared/components/select/Select";
import { TSelectItem } from "../shared/components/select/types";

const selectItems: TSelectItem<string>[] = [
  {
    value: "apple",
    content: "Apple",
  },
  {
    value: "banana",
    content: "Banana",
  },
  {
    value: "cherry",
    content: "Cherry",
  },
];

const DISABLED_VARIANTS = { no: undefined, yes: true } as const;

export default function ButtonPlayground() {
  return (
    <Fragment>
      <Variants
        localStorageKey="select"
        cellMinWidth={200}
        dimensions={{
          disabled: DISABLED_VARIANTS,
        }}
        defaultSelected={{
          disabled: "no",
        }}
        presets={{
          base: { row: [], column: [], selected: {} },
        }}
        render={({ disabled }) => (
          <Select
            items={selectItems}
            label="Select a fruit"
            defaultValue="apple"
            disabled={disabled}
            height={12}
            heightRatio={0.8}
          />
        )}
      />
      <div>
        <h2>Select with placeholder item</h2>
        <Select
          items={[
            {
              value: "",
              content: "Select a fruit",
              hidden: true,
            },
            ...selectItems,
          ]}
          label="Select a fruit"
          defaultValue=""
          emptyValue=""
        />
      </div>
    </Fragment>
  );
}
