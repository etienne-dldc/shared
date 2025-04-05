import * as Ariakit from "@ariakit/react";
import { CaretRight, File, SignOut, Square } from "@phosphor-icons/react";
import { Variants } from "../../../playground/Variants";
import { cn } from "../../styles/utils";
import { Button } from "../button/Button";
import { DesignContext } from "../core/DesignContext";
import { List } from "./List";
import { ListGroup } from "./ListGroup";
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
          <DesignContext.Define xSize="lg">
            <Ariakit.CompositeProvider>
              <Ariakit.Composite render={<List size="lg" color="blue" />}>
                <ListItem title="Item 1" endIcon={<CaretRight />} icon={<File />} />
                <ListItem title="Item 2" endIcon={<CaretRight />} icon={<File />} />
                <ListItem title="Item 3" endIcon={<CaretRight />} icon={<File />} />
                <ListItem title="Item 4" endIcon={<CaretRight />} icon={<File />} />
                <ListItem title="Item 5" endIcon={<CaretRight />} icon={<File />} />
                <ListGroup title="Group LG" size="lg">
                  <ListItem title="Item 6" endIcon={<CaretRight />} icon={<Square />} />
                  <ListItem title="Item 7" endIcon={<CaretRight />} icon={<File />} />
                </ListGroup>
                <ListGroup title="Group MD" size="md">
                  <ListItem title="Item 8" endIcon={<CaretRight />} icon={<Square />} />
                  <ListItem title="Item 9" endIcon={<CaretRight />} icon={<File />} />
                </ListGroup>
                <ListGroup title="Group SM" size="sm">
                  <ListItem title="Item 10" endIcon={<CaretRight />} icon={<Square />} />
                  <ListItem title="Item 11" endIcon={<CaretRight />} icon={<File />} />
                </ListGroup>
                <ListGroup title="Group XS" size="xs">
                  <ListItem title="Item 10" endIcon={<CaretRight />} icon={<Square />} />
                  <ListItem title="Item 11" endIcon={<CaretRight />} icon={<File />} />
                </ListGroup>
                <Button
                  render={<Ariakit.CompositeItem />}
                  title="Button"
                  color="red"
                  filled={false}
                  hoverFilled
                  icon={<SignOut />}
                  ySize="md"
                />
              </Ariakit.Composite>
            </Ariakit.CompositeProvider>
          </DesignContext.Define>
        </div>
      )}
    />
  );
}
