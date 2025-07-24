import * as Ariakit from "@ariakit/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { ComponentPropsWithRef, useMemo } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { Paper, styled } from "../../../../styled-system/jsx";
import { vstack } from "../../../../styled-system/patterns";
import { SystemStyleObject } from "../../../../styled-system/types";
import { TDesignSize, TDesignVariant, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { Button } from "../button/Button";
import { colorPaletteClass } from "../common/styles";
import { DefaultDesignProvider, designPropsSplitter } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { Label } from "../form/Label";
import { ItemContentFragment } from "../item-content/ItemContentFragment";
import { SelectItem } from "./SelectItem";
import { TSelectItem } from "./types";

export type SelectProps<Value extends string> = Merge<
  ComponentPropsWithRef<"button">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignSize;
    heightRatio?: number;
    spacing?: TDesignSize;
    variant?: TDesignVariant;
    hoverVariant?: TDesignVariant;

    color?: TPaletteColor;
    css?: SystemStyleObject;

    caret?: boolean;
    className?: string;
    defaultValue?: Value;
    items: TSelectItem<Value>[];
    label: React.ReactNode;
    name?: string;
    labelHidden?: boolean;
    onChange?: (value: Value) => void;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    issues?: React.ReactNode;
    value?: Value;
    emptyValue?: Value;
    sameWidth?: boolean;

    renderSelected?: (item: TSelectItem<Value>) => React.ReactNode;

    renderSelect?: React.ReactElement<any>;
    renderLabel?: React.ReactElement<any>;
    renderWrapper?: React.ReactElement<any>;
  }
>;

export function Select<Value extends string>(inProps: SelectProps<Value>) {
  const [{ localDesign, localDisabled }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
    localDisabled: DisabledContext.propsSplitter,
  });

  const {
    color,
    css: cssProp,

    items,
    label,
    name,
    labelHidden = false,
    onChange,
    open,
    setOpen,
    issues,
    value,
    caret = true,
    defaultValue,
    emptyValue,
    sameWidth = false,
    className,
    renderSelected,
    renderSelect,
    renderLabel,
    renderWrapper,
    ref,
    ...htmlProps
  } = props;

  const selectStore = Ariakit.useSelectStore({ value, defaultValue, setValue: onChange, open, setOpen });

  const storeValue = Ariakit.useStoreState(selectStore, (s) => s.value);

  const selectedItem = useMemo(() => items.find((item) => item.value === storeValue), [items, storeValue]);
  if (!selectedItem) {
    console.warn(`Select: value "${storeValue}" not found in items`);
  }

  const selectedIsEmpty = emptyValue !== undefined && storeValue === emptyValue;

  return (
    <DefaultDesignProvider {...localDesign}>
      <DisabledContext.Define disabled={inProps.disabled}>
        <Ariakit.SelectProvider store={selectStore}>
          <Ariakit.Role
            render={renderWrapper ?? <div />}
            className={cx(
              css(
                vstack.raw({ alignItems: "start", gap: "0" }),
                inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
              ),
              className,
            )}
          >
            <Ariakit.SelectLabel
              render={
                labelHidden ? <Ariakit.VisuallyHidden /> : (renderLabel ?? <Label disabled={localDisabled.disabled} />)
              }
            >
              {label}
            </Ariakit.SelectLabel>
            <Ariakit.Select
              disabled={localDisabled.disabled}
              name={name}
              {...htmlProps}
              render={
                renderSelect ?? (
                  <Button endPadding="icon" startPadding={selectedItem && selectedItem.icon ? "icon" : "text"} />
                )
              }
            >
              {selectedItem ? (
                renderSelected ? (
                  renderSelected(selectedItem)
                ) : (
                  <ItemContentFragment
                    endIcon={caret && <Ariakit.SelectArrow render={<CaretDownIcon children={null} />} />}
                    startIcon={selectedItem.icon}
                  >
                    {selectedIsEmpty ? (
                      <span className={css({ opacity: 0.5 })}>{selectedItem.content}</span>
                    ) : (
                      selectedItem.content
                    )}
                  </ItemContentFragment>
                )
              ) : null}
            </Ariakit.Select>
            {issues}
          </Ariakit.Role>
          <Ariakit.SelectPopover
            gutter={4}
            portal
            render={<Paper level="select" outline="none" />}
            sameWidth={sameWidth}
            unmountOnHide
          >
            <styled.div
              p="1"
              minW="var(--popover-anchor-width)"
              maxW="var(--popover-available-width)"
              maxH="var(--popover-available-height)"
              overflowY="auto"
            >
              {items.map((item) => (
                <SelectItem
                  item={item}
                  key={item.value}
                  // nestedHeight={contentHeight}
                />
              ))}
            </styled.div>
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </DisabledContext.Define>
    </DefaultDesignProvider>
  );
}
