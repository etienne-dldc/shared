import { CaretRightIcon, HouseIcon } from "@phosphor-icons/react";
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
      </VStack>
    </Suspense>
  </StrictMode>,
);
