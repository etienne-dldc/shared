import * as Ariakit from "@ariakit/react";
import { IconContext, IconProps } from "@phosphor-icons/react";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef, useMemo, useRef } from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useTextWidth } from "../../hooks/useTextWidth";
import { cn, pick, tw } from "../../styles/utils";

export interface TextInputProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "size"> {
  renderInput?: React.ReactElement;
  innerClassName?: string;
  inputClassName?: string;
  startActions?: React.ReactNode;
  startIcon?: React.ReactNode;
  endActions?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  noHightlight?: boolean;
  noBackground?: boolean;
  noHorizontalPadding?: boolean;
  autoWidth?: boolean;
  colored?: boolean;
  type?: "text" | "password" | "email";
  isError?: boolean;
  onValueChange?: (value: string) => void;
}

export const TextInput = forwardRef(function TextInput(
  {
    renderInput,
    autoWidth = false,
    className,
    colored = false,
    disabled,
    innerClassName,
    inputClassName,
    noBackground = false,
    noHightlight = false,
    noHorizontalPadding = false,
    isError = false,
    onChange,
    onValueChange,
    size = "md",
    endActions,
    endIcon,
    startActions,
    startIcon,
    type = "text",
    value,
    placeholder,
    ...inputProps
  }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const finalRef = useMergeRefs(ref, inputRef);

  const coloredDisabledVariant = `${colored ? "colored" : "regular"}_${disabled ? "disabled" : "enabled"}` as const;

  const inputContainerClasses = cn(
    tw`appearance-none relative w-full flex flex-row items-center sm:text-sm`,
    tw`autofill:bg-transparent`,
    !noHightlight && tw`focus:outline-hidden focus-within:ring-2 focus-within:ring-purple-400/40`,
    isError && tw`ring-2 ring-red-500/40`,
    !noBackground && (disabled ? tw`bg-black/10` : tw`bg-black/30`),
    !noBackground && tw`rounded-md`,
    !disabled && !noBackground && tw`hover:bg-black/20`,
    innerClassName,
  );

  const sizeClasses = pick(size, {
    xs: tw`py-1 text-sm`,
    sm: tw`py-1 text-base`,
    md: tw`py-2 text-base`,
    lg: tw`py-3 text-lg`,
  });

  const hPadding = pick(size, {
    xs: 8,
    sm: 12,
    md: 12,
    lg: 16,
  });

  const inputClasses = cn(
    tw`block grow bg-transparent outline-hidden border-none text-left w-10 autofill:bg-transparent`,
    sizeClasses,
    // !noHorizontalPadding && hPaddingClass,
    disabled && tw`cursor-not-allowed`,
    !noBackground && tw`rounded-md`,
    pick(coloredDisabledVariant, {
      colored_enabled: tw`text-dynamic-200 placeholder-dynamic-200/30`,
      colored_disabled: tw`text-dynamic-300/50 placeholder-dynamic-200/20`,
      regular_enabled: tw`text-white placeholder-white/30`,
      regular_disabled: tw`text-stone-400 placeholder-white/20`,
    }),
    inputClassName,
  );

  const inputOnChange = useMemo(() => {
    if (!onValueChange && !onChange) {
      return undefined;
    }
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
      onChange?.(event);
    };
  }, [onChange, onValueChange]);

  const placeholderWidth = useTextWidth(inputRef, placeholder ?? "", autoWidth);
  const textWidth = useTextWidth(inputRef, String(value ?? ""), autoWidth);
  const autoWithWidth =
    autoWidth && placeholderWidth !== null && textWidth !== null ? Math.max(placeholderWidth, textWidth) : undefined;

  const iconProps = useMemo(
    (): IconProps => ({
      size: pick(size, {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
      }),
    }),
    [size],
  );

  const iconColor = pick(coloredDisabledVariant, {
    colored_enabled: "text-dynamic-200",
    colored_disabled: "text-dynamic-300/50",
    regular_enabled: "text-white",
    regular_disabled: "text-stone-400",
  });

  const startIconMargin = pick(size, {
    xs: tw`ml-1.5`,
    sm: tw`ml-1.5`,
    md: tw`ml-2`,
    lg: tw`ml-2`,
  });
  const iconStartAction = startIcon ? <div className={cn(iconColor, startIconMargin)}>{startIcon}</div> : null;

  const endIconMargin = pick(size, {
    xs: tw`mr-1.5`,
    sm: tw`mr-1.5`,
    md: tw`mr-2`,
    lg: tw`mr-2`,
  });

  const iconEndAction = endIcon ? <div className={cn(iconColor, endIconMargin)}>{endIcon}</div> : null;

  return (
    <IconContext.Provider value={iconProps}>
      <div className={cn(inputContainerClasses, className)}>
        {startActions ?? iconStartAction}
        <Ariakit.Role.input
          ref={finalRef}
          render={renderInput}
          type={type}
          className={inputClasses}
          disabled={disabled}
          value={value}
          onChange={inputOnChange}
          placeholder={placeholder}
          style={{
            width: autoWidth ? (autoWithWidth ?? inputProps.style?.width) : undefined,
            paddingLeft: noHorizontalPadding ? undefined : hPadding,
            paddingRight: noHorizontalPadding ? undefined : hPadding,
            ...inputProps.style,
          }}
          {...inputProps}
        />
        {endActions ?? iconEndAction}
      </div>
    </IconContext.Provider>
  );
});
