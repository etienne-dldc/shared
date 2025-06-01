import { CaretRightIcon, HouseIcon } from "@phosphor-icons/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { VStack } from "../styled-system/jsx";
import "./index.css";
import { Button } from "./shared/components/button/Button";
import { ButtonGroup } from "./shared/components/button/ButtonGroup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      {/* <Playground /> */}
      <VStack p="4" gap="2" alignItems="start">
        <ButtonGroup color="blue" variant="solid" direction="vertical" css={{ maxWidth: "24" }}>
          <Button content="Hello this is some long text" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="solid" rounded={false}>
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="surface" direction="vertical">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} variant="solid" />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="surface">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="subtle" direction="vertical">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} variant="solid" />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="subtle">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="ghost" direction="vertical">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <ButtonGroup color="blue" variant="ghost">
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hey" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
          <Button content="Hello" icon={<HouseIcon />} />
        </ButtonGroup>

        <Button crossSize="7" content="Hello" />
        <Button crossSize="7" icon={<HouseIcon />} />
        <Button crossSize="7" endIcon={<CaretRightIcon />} />
        <Button crossSize="7" content="Hello" icon={<HouseIcon />} />
        <Button crossSize="7" content="Hello" endIcon={<CaretRightIcon />} />
        <Button crossSize="7" content="Hello" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />

        <Button variant="solid" crossSize="7" content="Solid" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button variant="surface" crossSize="7" content="Surface" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button variant="subtle" crossSize="7" content="Subtle" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />
        <Button variant="ghost" crossSize="7" content="Ghost" icon={<HouseIcon />} endIcon={<CaretRightIcon />} />

        <Button variant="solid" crossSize="7" content="Hello" icon={<HouseIcon />} />
        <Button variant="surface" crossSize="7" content="Hello" icon={<HouseIcon />} />

        <Button variant="surface" content="red" icon={<HouseIcon />} color="red" />
        <Button variant="surface" content="orange" icon={<HouseIcon />} color="orange" />
        <Button variant="surface" content="amber" icon={<HouseIcon />} color="amber" />
        <Button variant="surface" content="yellow" icon={<HouseIcon />} color="yellow" />
        <Button variant="surface" content="lime" icon={<HouseIcon />} color="lime" />
        <Button variant="surface" content="green" icon={<HouseIcon />} color="green" />
        <Button variant="surface" content="emerald" icon={<HouseIcon />} color="emerald" />
        <Button variant="surface" content="teal" icon={<HouseIcon />} color="teal" />
        <Button variant="surface" content="cyan" icon={<HouseIcon />} color="cyan" />
        <Button variant="surface" content="sky" icon={<HouseIcon />} color="sky" />
        <Button variant="surface" content="blue" icon={<HouseIcon />} color="blue" />
        <Button variant="surface" content="indigo" icon={<HouseIcon />} color="indigo" />
        <Button variant="surface" content="violet" icon={<HouseIcon />} color="violet" />
        <Button variant="surface" content="purple" icon={<HouseIcon />} color="purple" />
        <Button variant="surface" content="fuchsia" icon={<HouseIcon />} color="fuchsia" />
        <Button variant="surface" content="pink" icon={<HouseIcon />} color="pink" />
        <Button variant="surface" content="rose" icon={<HouseIcon />} color="rose" />
        <Button variant="surface" content="slate" icon={<HouseIcon />} color="slate" />
        <Button variant="surface" content="gray" icon={<HouseIcon />} color="gray" />
        <Button variant="surface" content="zinc" icon={<HouseIcon />} color="zinc" />
        <Button variant="surface" content="neutral" icon={<HouseIcon />} color="neutral" />
      </VStack>
    </Suspense>
  </StrictMode>,
);
