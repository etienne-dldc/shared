import * as Ariakit from "@ariakit/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { ForwardedRef, forwardRef, useMemo, type JSX } from "react";
import { cn, tw } from "../../styles/utils";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/ButtonContent";
import { buttonRoundedClass, buttonSizeClass } from "../button/styles";
import { Paper } from "../common/Paper";
import { DesignContext, resolveDesignProps } from "../core/DesignContext";
import { Label } from "../form/Label";

export interface TSelectItem<Value extends string> {
  value: Value;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  details?: string | React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

interface SelectProps<Value extends string> {
  caret?: boolean;
  className?: string;
  defaultValue?: Value;
  disabled?: boolean;
  items: TSelectItem<Value>[];
  label: React.ReactNode;
  name?: string;
  labelHidden?: boolean;
  onChange?: (value: Value) => void;
  open?: boolean;
  renderSelected?: (item: TSelectItem<Value>) => React.ReactNode;
  setOpen?: (open: boolean) => void;
  issues?: React.ReactNode;
  value?: Value;
  emptyValue?: Value;

  renderSelect?: React.ReactElement<any>;
  renderLabel?: React.ReactElement<any>;
  renderWrapper?: React.ReactElement<any>;
}

const SelectAny = forwardRef(function Select(
  {
    items,
    onChange,
    value,
    emptyValue,
    disabled,
    label,
    name,
    labelHidden,
    open,
    setOpen,
    renderSelected,
    caret = true,
    className,
    issues = null,
    defaultValue,

    renderLabel,
    renderSelect,
    renderWrapper,
  }: SelectProps<string>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const selectStore = Ariakit.useSelectStore({
    value,
    defaultValue,
    setValue: onChange ? (value) => onChange(value as string) : undefined,
    open,
    setOpen,
  });

  const storeValue = Ariakit.useStoreState(selectStore, (s) => s.value);

  const selectedItem = useMemo(() => items.find((item) => item.value === storeValue), [items, storeValue]);
  if (!selectedItem) {
    console.warn(`Select: value "${storeValue}" not found in items`);
  }

  const selectedIsEmpty = emptyValue !== undefined && storeValue === emptyValue;

  return (
    <Ariakit.SelectProvider store={selectStore}>
      <Ariakit.Role render={renderWrapper ?? <div className={cn("flex flex-col", className)} />} ref={ref}>
        <Ariakit.SelectLabel
          render={labelHidden ? <Ariakit.VisuallyHidden /> : (renderLabel ?? <Label disabled={disabled} />)}
        >
          {label}
        </Ariakit.SelectLabel>
        <Ariakit.Select disabled={disabled} name={name} render={renderSelect ?? <Button />}>
          {selectedItem ? (
            renderSelected ? (
              renderSelected(selectedItem)
            ) : (
              <ButtonContent
                details={selectedItem.details}
                endIcon={caret && <Ariakit.SelectArrow render={<CaretDownIcon />} />}
                icon={selectedItem.icon}
                title={<span className={selectedIsEmpty ? "opacity-50" : ""}>{selectedItem.title}</span>}
              />
            )
          ) : null}
        </Ariakit.Select>
        {issues}
      </Ariakit.Role>
      <Ariakit.SelectPopover
        gutter={4}
        portal
        render={<Paper className="p-2 outline-hidden" level="popover" />}
        sameWidth
        unmountOnHide
      >
        {items.map((item) => (
          <SelectItem item={item} key={item.value} />
        ))}
      </Ariakit.SelectPopover>
    </Ariakit.SelectProvider>
  );
});

export const Select = SelectAny as <Value extends string>(props: SelectProps<Value>) => JSX.Element;

interface SelectItemProps extends Ariakit.SelectItemProps {
  item: TSelectItem<string>;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(inProps, ref) {
  const [design, { item, ...props }] = DesignContext.useProps(inProps);
  const { size, xSize, ySize } = resolveDesignProps(design);

  const className = cn(
    tw`flex flex-row items-center justify-center text-left group overflow-hidden relative`,
    tw`outline-hidden cursor-pointer`,
    buttonRoundedClass("all"),
    buttonSizeClass(size, xSize, ySize),
    tw`disabled:cursor-not-allowed`,
    tw`data-active-item:bg-dynamic-600 data-active-item:text-white`,
    item.hidden && tw`hidden`,
  );

  return (
    <Ariakit.SelectItem
      ref={ref}
      {...props}
      className={className}
      disabled={item.disabled || item.hidden}
      value={item.value}
    >
      <ButtonContent details={item.details} endIcon={item.endIcon} icon={item.icon} title={item.title} />
    </Ariakit.SelectItem>
  );
});
