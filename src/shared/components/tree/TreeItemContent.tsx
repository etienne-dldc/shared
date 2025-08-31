import { CaretRightIcon, DotsSixVerticalIcon } from "@phosphor-icons/react";
import { ComponentProps } from "react";
import { Merge } from "type-fest";
import { HStack } from "../../../../styled-system/jsx";
import { TDesignSpacing } from "../../design/types";
import { Button } from "../button/Button";
import { ItemContent } from "../item-content/ItemContent";

export type TreeItemContentProps = Merge<
  Omit<ComponentProps<"div">, "title" | "height">,
  {
    spacing?: TDesignSpacing;
  }
>;

export function TreeItemContent({ spacing, children }: TreeItemContentProps) {
  return (
    <ItemContent
      // nestedHeight={nestedHeight}
      spacing={spacing}
      // nestedHeight={dynamicNestedHeight(0.65)}
      className="group"
      endPadding="icon"
      startSlot={
        <HStack gap="0">
          <Button
            variant="ghost"
            // nestedHeight={dynamicNestedHeight(0.5)}
            startIcon={<DotsSixVerticalIcon />}
            css={{ mr: "[calc(var(--spacing-gap) * -1)]", opacity: 0.3, _groupHover: { opacity: 1 } }}
          />
          <Button
            variant="ghost"
            // nestedHeight={dynamicNestedHeight(0.5)}
            startIcon={<CaretRightIcon />}
          />
        </HStack>
      }
    >
      {children}
      {/* <ItemContent endSlot={<Button variant="ghost" startIcon={<PenIcon />} />} startPadding="none" endPadding="none">
        <DefineNestedHeight nestedHeight={dynamicNestedHeight(0.5)}></DefineNestedHeight>
      </ItemContent> */}
    </ItemContent>
  );
}
