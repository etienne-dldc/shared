import * as Ariakit from "@ariakit/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { ComponentPropsWithRef, Ref, useMemo } from "react";
import { Merge } from "type-fest";
import { css, cx } from "../../../../styled-system/css";
import { styled } from "../../../../styled-system/jsx";
import { vstack } from "../../../../styled-system/patterns";
import { SystemStyleObject } from "../../../../styled-system/types";
import { colorPaletteClass } from "../../design/styles";
import { TDesignHeight, TDesignSpacing, TDesignVariant, TPaletteColor } from "../../design/types";
import { pipePropsSplitters } from "../../utils/propsSplitters";
import { Button } from "../button/Button";
import { DefaultDesignProvider, designPropsSplitter } from "../core/DesignContext";
import { DisabledContext } from "../core/DisabledContext";
import { Label } from "../form/Label";
import { FrameContentFragment } from "../frame/FrameContentFragment";
import { SelectItem } from "./SelectItem";
import { TSelectItem } from "./types";

export type SelectProps<Value extends string> = Merge<
  ComponentPropsWithRef<"button">,
  {
    // Design
    disabled?: boolean;
    height?: TDesignHeight;
    heightRatio?: number;
    spacing?: TDesignSpacing;
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
    css: cssProps,

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
            ref={ref as Ref<HTMLDivElement>}
            render={renderWrapper ?? <div />}
            className={cx(
              css(
                vstack.raw({ alignItems: "start", gap: "0" }),
                inProps.color && colorPaletteClass.raw({ colorPalette: inProps.color }),
                cssProps,
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
                  <FrameContentFragment
                    endIcon={caret && <Ariakit.SelectArrow render={<CaretDownIcon children={null} />} />}
                    startIcon={selectedItem.icon}
                  >
                    {selectedIsEmpty ? (
                      <span className={css({ opacity: 0.5 })}>{selectedItem.content}</span>
                    ) : (
                      selectedItem.content
                    )}
                  </FrameContentFragment>
                )
              ) : null}
            </Ariakit.Select>
            {issues}
          </Ariakit.Role>
          <Ariakit.SelectPopover
            gutter={4}
            portal
            render={
              <styled.div
                css={{
                  overflow: "hidden",
                  background: "neutral.800",
                  rounded: "2",
                  borderWidth: "0__x",
                  borderColor: "white/10",
                  boxShadow: "md",
                  outline: "none",
                  width: "[min-content]",
                }}
              />
            }
            sameWidth={sameWidth}
            unmountOnHide
          >
            <styled.div
              css={{
                p: "1",
                minW: "var(--popover-anchor-width)",
                maxW: "var(--popover-available-width)",
                maxH: "var(--popover-available-height)",
                overflowY: "auto",
              }}
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
