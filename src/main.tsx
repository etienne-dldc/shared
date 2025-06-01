import { CaretRightIcon, HouseIcon, InfoIcon } from "@phosphor-icons/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { VStack } from "../styled-system/jsx";
import "./index.css";
import { Button } from "./shared/components/button/Button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      {/* <Playground /> */}
      <VStack p="4" gap="2" alignItems="start">
        <Button mainSize="6" crossSize="4" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="4x" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="5" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="6" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="7" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="8" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="10" content="Hello" icon={<HouseIcon />} />
        <Button mainSize="6" crossSize="12" content="Hello" icon={<HouseIcon />} />

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

        <Button variant="solid" content="red" icon={<HouseIcon />} color="red" />
        <Button variant="solid" content="orange" icon={<HouseIcon />} color="orange" />
        <Button variant="solid" content="amber" icon={<HouseIcon />} color="amber" />
        <Button variant="solid" content="yellow" icon={<HouseIcon />} color="yellow" />
        <Button variant="solid" content="lime" icon={<HouseIcon />} color="lime" />
        <Button variant="solid" content="green" icon={<HouseIcon />} color="green" />
        <Button variant="solid" content="emerald" icon={<HouseIcon />} color="emerald" />
        <Button variant="solid" content="teal" icon={<HouseIcon />} color="teal" />
        <Button variant="solid" content="cyan" icon={<HouseIcon />} color="cyan" />
        <Button variant="solid" content="sky" icon={<HouseIcon />} color="sky" />
        <Button variant="solid" content="blue" icon={<HouseIcon />} color="blue" />
        <Button variant="solid" content="indigo" icon={<HouseIcon />} color="indigo" />
        <Button variant="solid" content="violet" icon={<HouseIcon />} color="violet" />
        <Button variant="solid" content="purple" icon={<HouseIcon />} color="purple" />
        <Button variant="solid" content="fuchsia" icon={<HouseIcon />} color="fuchsia" />
        <Button variant="solid" content="pink" icon={<HouseIcon />} color="pink" />
        <Button variant="solid" content="rose" icon={<HouseIcon />} color="rose" />
        <Button variant="solid" content="slate" icon={<HouseIcon />} color="slate" />
        <Button variant="solid" content="gray" icon={<HouseIcon />} color="gray" />
        <Button variant="solid" content="zinc" icon={<HouseIcon />} color="zinc" />
        <Button variant="solid" content="neutral" icon={<HouseIcon />} color="neutral" />
        <Button
          content="stone"
          icon={<HouseIcon />}
          color="stone"
          endAction={<Button variant="solid" icon={<InfoIcon />} />}
        />
      </VStack>
    </Suspense>
  </StrictMode>,
);
