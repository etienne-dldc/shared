import * as Ariakit from "@ariakit/react";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";
import { forwardRef, useId, useMemo, useRef } from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { cn, pick, tw } from "../../styles/utils";

interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "size"> {
  renderTextarea?: React.ReactElement;
  textareaClassName?: string;
  size?: "xs" | "sm" | "md";
  noHightlight?: boolean;
  noBackground?: boolean;
  noHorizontalPadding?: boolean;
  colored?: boolean;
  isError?: boolean;
  onValueChange?: (value: string) => void;
}

export const Textarea = forwardRef(function Textarea(
  {
    renderTextarea,
    className,
    colored = false,
    disabled,
    textareaClassName,
    noBackground = false,
    noHightlight = false,
    noHorizontalPadding = false,
    isError = false,
    onChange,
    onValueChange,
    size = "md",
    value,
    placeholder,
    ...textareaProps
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const finalRef = useMergeRefs(ref, textareaRef);

  const inputContainerClasses = cn(
    tw`appearance-none relative w-full flex flex-row items-center rounded-md sm:text-sm`,
    tw`autofill:bg-transparent`,
    !noHightlight &&
      tw`focus:outline-none focus-within:ring-2 focus-within:ring-purple-400/40`,
    isError && tw`ring-2 ring-red-500/40`,
    colored
      ? disabled
        ? tw`text-dynamic-300/50`
        : tw`text-dynamic-200`
      : disabled
      ? tw`text-stone-700`
      : tw`text-white`,
    !noBackground && (disabled ? tw`bg-black/10` : tw`bg-black/30`),
    !disabled && !noBackground && tw`hover:bg-black/20`,
    className
  );

  const sizeClasses = pick(size, {
    xs: tw`py-1 text-sm`,
    sm: tw`py-1 text-base`,
    md: tw`py-2 text-base`,
  });

  const hPadding = pick(size, {
    xs: 8,
    sm: 12,
    md: 12,
  });

  const textareaClasses = cn(
    tw`block grow bg-transparent rounded outline-none border-none placeholder-white/30 text-left w-10 autofill:bg-transparent`,
    sizeClasses,
    // !noHorizontalPadding && hPaddingClass,
    disabled && tw`cursor-not-allowed placeholder-white/20 text-stone-400`,
    textareaClassName
  );

  const id = useId();

  const inputOnChange = useMemo(() => {
    if (!onValueChange && !onChange) {
      return undefined;
    }
    return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange?.(event.target.value);
      onChange?.(event);
    };
  }, [onChange, onValueChange]);

  return (
    <div className={inputContainerClasses}>
      <Ariakit.Role.textarea
        render={renderTextarea}
        ref={finalRef}
        id={id}
        className={textareaClasses}
        disabled={disabled}
        value={value}
        onChange={inputOnChange}
        placeholder={placeholder}
        style={{
          paddingLeft: noHorizontalPadding ? undefined : hPadding,
          paddingRight: noHorizontalPadding ? undefined : hPadding,
          ...textareaProps.style,
        }}
        {...textareaProps}
      />
    </div>
  );
});
