import { Fragment } from "react/jsx-runtime";
import { Variants } from "../../../playground/Variants";
import { Select, TSelectItem } from "./Select";

const selectItems: TSelectItem<string>[] = [
  {
    value: "apple",
    title: "Apple",
  },
  {
    value: "banana",
    title: "Banana",
  },
  {
    value: "cherry",
    title: "Cherry",
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
        initialAxis={{ column: [], row: [] }}
        render={({ disabled }) => (
          <Select items={selectItems} label="Select a fruit" defaultValue="apple" disabled={disabled} />
        )}
      />
      <div>
        <h2>Select with placeholder item</h2>
        <Select
          items={[
            {
              value: "",
              title: "Select a fruit",
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
