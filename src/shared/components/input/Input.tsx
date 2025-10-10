import { useCallback, useRef } from "react";
import { styled } from "../../../../styled-system/jsx";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { ComponentPropsBase } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TItemContentFragmentProps } from "../item-content/types";

export type InputProps = ComponentPropsBase<
  "div",
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      highlightColor?: TPaletteColor;
      highlighted?: boolean;

      // Props forwarded to the native input
      value?: string;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      placeholder?: string;

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Input(inProps: InputProps) {
  const { value, onChange, placeholder, onPointerDown: onPointerDownProps, ...frameProps } = inProps;

  const localRef = useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(localRef, inProps.ref);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      onPointerDownProps?.(event as React.PointerEvent<HTMLInputElement>);
      if (event.defaultPrevented) return;
      if (event.target === localRef.current) return;
      setTimeout(() => {
        // Find input in children and focus it
        const input = localRef.current?.querySelector("input");
        input?.focus();
      }, 0);
    },
    [onPointerDownProps],
  );

  return (
    <Frame variant="input" interactive onPointerDown={onPointerDown} {...frameProps} ref={ref}>
      <styled.input
        css={{ outline: "none", alignSelf: "stretch", flex: "1" }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Frame>
  );
}
