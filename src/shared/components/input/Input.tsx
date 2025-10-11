import { useCallback, useRef } from "react";
import { TDesignProps, TPaletteColor } from "../../design/types";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { ComponentPropsBase } from "../../utils/componentProps";
import { Frame } from "../frame/Frame";
import { TFrameContentFragmentProps } from "../frame/FrameContentFragment";
import { FrameInputContent } from "../frame/FrameInputContent";

export type InputProps = ComponentPropsBase<
  "div",
  TFrameContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      highlightColor?: TPaletteColor;
      highlighted?: boolean;

      // Props forwarded to the native input
      value?: string;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      placeholder?: string;
      name?: string;
      type?: string;

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

export function Input(inProps: InputProps) {
  const {
    onPointerDown: onPointerDownProps,
    children,
    // Input props
    value,
    onChange,
    placeholder,
    name,
    type,

    ...frameProps
  } = inProps;

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

  const childrenResolved = children ?? (
    <FrameInputContent value={value} onChange={onChange} placeholder={placeholder} name={name} type={type} />
  );

  return (
    <Frame baseVariant="input" interactive onPointerDown={onPointerDown} {...frameProps} ref={ref}>
      {childrenResolved}
    </Frame>
  );
}
