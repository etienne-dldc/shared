import * as Ariakit from "@ariakit/react";
import { CaretRightIcon, FileIcon, SignOutIcon, SquareIcon } from "@phosphor-icons/react";
import { Variants } from "../../../playground/LegacyVariants";
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
        <div
        // className={cn("w-full h-full")}
        >
          <DesignContext.Define
          // size="lg"
          >
            <Ariakit.CompositeProvider>
              <Ariakit.Composite
                render={
                  <List
                    // size="lg"
                    color="blue"
                  />
                }
              >
                <ListItem title="Item 1" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                <ListItem title="Item 2" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                <ListItem title="Item 3" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                <ListItem title="Item 4" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                <ListItem title="Item 5" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                <ListGroup
                  title="Group LG"
                  //size="lg"
                >
                  <ListItem title="Item 6" endIcon={<CaretRightIcon />} icon={<SquareIcon />} />
                  <ListItem title="Item 7" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group MD"
                  //size="md"
                >
                  <ListItem title="Item 8" endIcon={<CaretRightIcon />} icon={<SquareIcon />} />
                  <ListItem title="Item 9" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group SM"
                  //size="sm"
                >
                  <ListItem title="Item 10" endIcon={<CaretRightIcon />} icon={<SquareIcon />} />
                  <ListItem title="Item 11" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group XS"
                  //size="xs"
                >
                  <ListItem title="Item 10" endIcon={<CaretRightIcon />} icon={<SquareIcon />} />
                  <ListItem title="Item 11" endIcon={<CaretRightIcon />} icon={<FileIcon />} />
                </ListGroup>
                <Button
                  render={<Ariakit.CompositeItem />}
                  content="Button"
                  color="red"
                  variant="solid"
                  icon={<SignOutIcon />}
                />
              </Ariakit.Composite>
            </Ariakit.CompositeProvider>
          </DesignContext.Define>
        </div>
      )}
    />
  );
}
