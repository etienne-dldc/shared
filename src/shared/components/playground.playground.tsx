import { CaretDownIcon, CaretRightIcon, DotIcon, DotsSixVerticalIcon, HouseIcon, PenIcon } from "@phosphor-icons/react";
import { HStack, styled } from "../../../styled-system/jsx";
import { Button } from "./button/Button";
import { ButtonLike } from "./button/ButtonLike";
import { DefineNestedHeight, dynamicNestedHeight } from "./core/DesignContext";
import { ItemContent } from "./item-content/ItemContent";
import { ItemContentFragment } from "./item-content/ItemContentFragment";

export default function Playground() {
  return (
    <styled.div display="flex" flexDirection="column" gap="1" alignItems="start">
      <ButtonLike variant="subtle" startIcon={<HouseIcon />} />
      <ButtonLike variant="subtle" content="Playground" />
      <ButtonLike variant="subtle" startIcon={<HouseIcon />} content="Playground" />
      <ButtonLike variant="subtle" endIcon={<HouseIcon />} content="Playground" />
      <ButtonLike variant="subtle" startIcon={<HouseIcon />} endIcon={<HouseIcon />} content="Playground" />
      <div style={{ height: 20 }} />

      <ButtonLike
        variant="subtle"
        // nestedHeight="5"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="ghost" startIcon={<CaretRightIcon />} />
          </HStack>
        }
        content="Playground 1"
      />
      <div style={{ height: 20 }} />

      <ButtonLike
        variant="subtle"
        nestedHeight="6"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} css={{ mr: "-1" }} />
            <Button variant="ghost" startIcon={<CaretRightIcon />} />
          </HStack>
        }
        endPadding="icon"
        content={
          <ItemContent
            height="4"
            startSlot={<HouseIcon />}
            endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}
            startPadding="none"
            endPadding="none"
          >
            Playground Item
          </ItemContent>
        }
      />
      <PlaygroundItem height={7} />
      <PlaygroundItem height={8} />
      <PlaygroundItem height={9} />
      <PlaygroundItem height={10} />
      <PlaygroundItem height={11} />
      <PlaygroundItem height={12} />
      <PlaygroundItem height={13} />
      <PlaygroundItem height={14} />
      <div style={{ height: 20 }} />

      <ButtonLike
        variant="subtle"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="ghost" startIcon={<CaretDownIcon />} />
          </HStack>
        }
        content="Playground 2"
      />
      <ButtonLike
        variant="subtle"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="ghost" startIcon={<DotIcon />} />
          </HStack>
        }
        content={
          <ItemContentFragment startSlot={<HouseIcon />} endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}>
            Playground
          </ItemContentFragment>
        }
      />
      <ButtonLike
        startSlot={<HouseIcon />}
        endIcon={<HouseIcon />}
        content={
          <ItemContentFragment startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
            Playground
          </ItemContentFragment>
        }
      />
      <ButtonLike
        startSlot={<HouseIcon />}
        endIcon={<HouseIcon />}
        content={<ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>}
      />
      <div style={{ height: 20 }} />

      <ButtonLike>
        <ItemContent startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
          <ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>
        </ItemContent>
      </ButtonLike>
      <div style={{ height: 20 }} />

      <ButtonLike
        startSlot={"Hello"}
        endIcon={<HouseIcon />}
        startPadding="text"
        content={<ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>}
      />
      <div style={{ height: 20 }} />
    </styled.div>
  );
}

function PlaygroundItem({ height }: { height: number }) {
  return (
    <ButtonLike
      variant="subtle"
      height={height}
      nestedHeight={dynamicNestedHeight(0.65)}
      className="group"
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
      endPadding="icon"
      content={
        <ItemContent endSlot={<Button variant="ghost" startIcon={<PenIcon />} />} startPadding="none" endPadding="none">
          <DefineNestedHeight nestedHeight={dynamicNestedHeight(0.5)}>
            <ItemContent startSlot={<HouseIcon />} startPadding="none" endPadding="none">
              Playground Item
            </ItemContent>
          </DefineNestedHeight>
        </ItemContent>
      }
    />
  );
}
