import * as Ariakit from "@ariakit/react";
import { CaretRightIcon, FileIcon, SignOutIcon, SquareIcon } from "@phosphor-icons/react";
import { Variants } from "../../../playground/LegacyVariants";
import { Button } from "../button/Button";
import { DefaultDesignProvider } from "../core/DesignContext";
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
          <DefaultDesignProvider
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
                <ListItem content="Item 1" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                <ListItem content="Item 2" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                <ListItem content="Item 3" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                <ListItem content="Item 4" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                <ListItem content="Item 5" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                <ListGroup
                  title="Group LG"
                  //size="lg"
                >
                  <ListItem content="Item 6" endIcon={<CaretRightIcon />} startIcon={<SquareIcon />} />
                  <ListItem content="Item 7" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group MD"
                  //size="md"
                >
                  <ListItem content="Item 8" endIcon={<CaretRightIcon />} startIcon={<SquareIcon />} />
                  <ListItem content="Item 9" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group SM"
                  //size="sm"
                >
                  <ListItem content="Item 10" endIcon={<CaretRightIcon />} startIcon={<SquareIcon />} />
                  <ListItem content="Item 11" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                </ListGroup>
                <ListGroup
                  title="Group XS"
                  //size="xs"
                >
                  <ListItem content="Item 10" endIcon={<CaretRightIcon />} startIcon={<SquareIcon />} />
                  <ListItem content="Item 11" endIcon={<CaretRightIcon />} startIcon={<FileIcon />} />
                </ListGroup>
                <Button render={<Ariakit.CompositeItem />} color="red" variant="solid" startIcon={<SignOutIcon />}>
                  Button
                </Button>
              </Ariakit.Composite>
            </Ariakit.CompositeProvider>
          </DefaultDesignProvider>
        </div>
      )}
    />
  );
}
