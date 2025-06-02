import { CaretRightIcon, HouseIcon, PersonIcon } from "@phosphor-icons/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Paper, VStack } from "../styled-system/jsx";
import "./index.css";
import { Button } from "./shared/components/button/Button";
import { Select } from "./shared/components/select/Select";
import { TSelectItem } from "./shared/components/select/types";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      {/* <Playground /> */}
      <VStack p="4" gap="2" alignItems="start">
        <Button
          variant="solid"
          crossSize="7"
          content="Solid"
          icon={<HouseIcon />}
          endIcon={<CaretRightIcon />}
          color="blue"
        />
        <Button
          disabled
          variant="solid"
          crossSize="7"
          content="Solid"
          icon={<HouseIcon />}
          endIcon={<CaretRightIcon />}
          color="blue"
        />
        <Button variant="surface" crossSize="7" content="Surface" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button
          disabled
          variant="surface"
          crossSize="7"
          content="Surface"
          icon={<HouseIcon />}
          endIcon={<CaretRightIcon />}
        />
        <Button variant="subtle" crossSize="7" content="Subtle" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button
          disabled
          variant="subtle"
          crossSize="7"
          content="Subtle"
          icon={<HouseIcon />}
          endIcon={<CaretRightIcon />}
        />
        <Button variant="ghost" crossSize="7" content="Ghost" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button
          disabled
          variant="ghost"
          crossSize="7"
          content="Ghost"
          icon={<HouseIcon />}
          endIcon={<CaretRightIcon />}
        />
        <Paper w="72" h="36" p="4">
          <Button content="Hello" />
        </Paper>
        <Paper w="72" h="36" p="4" level="select">
          <Button content="Hello" />
        </Paper>
        <Select
          items={[
            { value: "1", content: "First", icon: <HouseIcon />, endIcon: <PersonIcon /> },
            { value: "2", content: "Second", icon: <HouseIcon /> },
            { value: "3", content: "Thrid long name", icon: <HouseIcon /> },
          ]}
          defaultValue="1"
          label="Select an item"
          renderSelect={<Button css={{ minW: "40" }} />}
        />

        <Select
          items={[
            { value: "1", content: "First", icon: <HouseIcon />, endIcon: <PersonIcon /> },
            { value: "2", content: "Second", icon: <HouseIcon /> },
            { value: "3", content: "Thrid long name", icon: <HouseIcon /> },
          ]}
          defaultValue="1"
          label="Select an item"
          renderSelect={<Button css={{ minW: "40" }} />}
          variant="solid"
          color="blue"
        />

        <Select
          items={[
            { value: "1", content: "First", icon: <HouseIcon />, endIcon: <PersonIcon /> },
            { value: "2", content: "Second", icon: <HouseIcon /> },
            { value: "3", content: "Thrid long name", icon: <HouseIcon /> },
            ...Array.from(
              { length: 20 },
              (_, i): TSelectItem<string> => ({
                value: (i + 4).toString(),
                content: `Item ${i + 4}`,
                icon: <HouseIcon />,
                disabled: i % 2 === 0,
              }),
            ),
          ]}
          defaultValue="1"
          label="Select an item"
          renderSelect={<Button css={{ minW: "40" }} />}
          crossSize="7"
        />
      </VStack>
    </Suspense>
  </StrictMode>,
);
