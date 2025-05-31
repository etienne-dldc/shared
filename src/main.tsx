import { CaretRightIcon } from "@phosphor-icons/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { VStack } from "../styled-system/jsx";
import "./index.css";
import { Button } from "./shared/components/button/Button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      {/* <Playground /> */}
      <VStack p="1" alignItems="start">
        <Button
          crossSize="2x"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="3"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="3x"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="4"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="4x"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="5"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="6"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="7"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="8"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
        <Button
          crossSize="10"
          content="Hello"
          endAction={<Button icon={<CaretRightIcon />} css={{ bg: "blue.500" }} />}
        />
      </VStack>
    </Suspense>
  </StrictMode>,
);
