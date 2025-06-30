import { CaretRightIcon, DotsSixVerticalIcon, HouseIcon, PenIcon } from "@phosphor-icons/react";
import { ComponentProps } from "react";
import { Merge } from "type-fest";
import { HStack } from "../../../../styled-system/jsx";
import { Button } from "../button/Button";
import { DefineNestedHeight, dynamicNestedHeight, TDesignSize } from "../core/DesignContext";
import { ItemContent } from "../item-content/ItemContent";

export type TreeItemContentProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    height?: TDesignSize;
    spacing?: TDesignSize;
  }
>;

export function TreeItemContent({ height, spacing, children }: TreeItemContentProps) {
  return (
    <ItemContent
      height={height}
      spacing={spacing}
      // nestedHeight={dynamicNestedHeight(0.65)}
      className="group"
      endPadding="icon"
      startSlot={
        <HStack gap="0">
          <Button
            variant="ghost"
            nestedHeight={dynamicNestedHeight(0.5)}
            startIcon={<DotsSixVerticalIcon />}
            css={{ mr: "[calc(var(--spacing-gap) * -1)]", opacity: 0.3, _groupHover: { opacity: 1 } }}
          />
          <Button variant="ghost" nestedHeight={dynamicNestedHeight(0.5)} startIcon={<CaretRightIcon />} />
        </HStack>
      }
    >
      <ItemContent endSlot={<Button variant="ghost" startIcon={<PenIcon />} />} startPadding="none" endPadding="none">
        <DefineNestedHeight nestedHeight={dynamicNestedHeight(0.5)}>
          <ItemContent startSlot={<HouseIcon />} startPadding="none" endPadding="none">
            {children}
          </ItemContent>
        </DefineNestedHeight>
      </ItemContent>
    </ItemContent>
  );
}
