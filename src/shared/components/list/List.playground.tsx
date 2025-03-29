import * as Ariakit from "@ariakit/react";
import { CaretRight, File } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn } from "../../styles/utils";
import { List } from "./List";
import { ListItem } from "./ListItem";

export default function ButtonPlayground() {
  return (
    <Variants
      localStorageKey="list"
      cellMinWidth={200}
      dimensions={{}}
      defaultSelected={{}}
      presets={{ base: { column: [], row: [], selected: {} } }}
      render={() => (
        <div className={cn("w-full h-full")}>
          <Ariakit.CompositeProvider>
            <Ariakit.Composite render={<List size="lg" color="blue" />}>
              <ListItem title="Item 1" endIcon={<CaretRight />} icon={<File />} />
              <ListItem title="Item 2" endIcon={<CaretRight />} icon={<File />} />
              <ListItem title="Item 3" endIcon={<CaretRight />} icon={<File />} />
              <ListItem title="Item 4" endIcon={<CaretRight />} icon={<File />} />
              <ListItem title="Item 5" endIcon={<CaretRight />} icon={<File />} />
            </Ariakit.Composite>
          </Ariakit.CompositeProvider>
        </div>
      )}
    />
  );
}
