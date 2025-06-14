import { useRef } from "react";
import { Paper, styled, VStack } from "../../../styled-system/jsx";
import { DragHandle } from "../../shared/components/common/DragHandle";
import { useResize } from "../../shared/hooks/useResize";
import { DimentionsTree } from "./DimentionsTree";
import { VariantGrid } from "./VariantGrid";

export function VariantConfig() {
  const ref = useRef<HTMLDivElement>(null);
  const { dynamicSize, onPointerDown } = useResize(ref, { direction: "top", initialSize: 300 });

  return (
    <styled.div flex="1" pos="relative">
      <VStack pos="absolute" inset="0" overflow="hidden" alignItems="stretch">
        <styled.div ref={ref} maxH="3/4" minH="1/4" style={{ height: dynamicSize }}>
          <DimentionsTree />
        </styled.div>
        <DragHandle direction="horizontal" onPointerDown={onPointerDown} />
        <Paper level="card" display="flex" flexDirection="column" flex="1">
          <VariantGrid />
        </Paper>
      </VStack>
    </styled.div>
  );
}
