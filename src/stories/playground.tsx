import { CaretRightIcon, PenIcon } from "@phosphor-icons/react";
import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { Merge } from "type-fest";
import { HTMLStyledProps, Paper, styled } from "../../styled-system/jsx";
import { OmittedHTMLProps } from "../../styled-system/types";
import { Button } from "../shared/components/button/Button";
import {
  DefaultDesignProvider,
  NestedDefaultDesignProvider,
  useContainerDesignProps,
} from "../shared/components/core/DesignContext";
import { Frame } from "../shared/components/frame/Frame";
import { ItemContent } from "../shared/components/item-content/ItemContent";
import { ItemContentFragment } from "../shared/components/item-content/ItemContentFragment";
import { TItemContentFragmentProps } from "../shared/components/item-content/types";
import { TDesignProps, TNestedDesignValues, TPaletteColor } from "../shared/design/types";
import { autoContentHeight } from "../shared/design/utils";
import { useMergeRefs } from "../shared/hooks/useMergeRefs";
import { ComponentPropsBase } from "../shared/utils/componentProps";

export default function Playground() {
  return (
    <styled.div css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}>
      <TreePlayground />
      <div style={{ height: 20 }} />

      <Paper
        css={{ padding: "2", bg: "neutral.900", display: "grid", gap: "2", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        <styled.div
          css={{
            "--test-var": "[demo]",
          }}
        />
      </Paper>

      <Paper
        css={{ padding: "2", bg: "neutral.900", display: "grid", gap: "2", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {(["input", "surface", "subtle", "solid", "ghost"] as const).map((variant) => (
          <Fragment key={variant}>
            <Input color="neutral" variant={variant} highlighted highlightColor="red" placeholder={`${variant} 400`} />
            <Input color="blue" variant={variant} highlighted highlightColor="red" placeholder={`${variant} 500`} />
            <Input color="red" variant={variant} highlighted highlightColor="yellow" placeholder={`${variant} 600`} />
            <Input color="yellow" variant={variant} highlighted highlightColor="red" placeholder={`${variant} 700`} />
          </Fragment>
        ))}
      </Paper>
    </styled.div>
  );
}

function TreePlayground() {
  const [height, setHeight] = useState(6);

  return (
    <Fragment>
      <p>Height {height}</p>
      <input
        type="range"
        min={6}
        max={20}
        step={1}
        value={height}
        onChange={(e) => setHeight(parseInt(e.target.value, 10))}
        style={{ width: 300 }}
      />

      <styled.div css={{ display: "flex", flexDirection: "column", alignItems: "stretch", width: "320px" }}>
        <DefaultDesignProvider height={height}>
          <PlaygroundItem endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}>Hey</PlaygroundItem>
          <PlaygroundItem
            style={{ paddingLeft: 4 * height }}
            endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}
          >
            Hey
          </PlaygroundItem>
          <PlaygroundItem
            style={{ paddingLeft: 4 * height }}
            endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}
          >
            Hey
          </PlaygroundItem>
          <PlaygroundItem endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}>Hey</PlaygroundItem>
          <PlaygroundItem endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}>Hey</PlaygroundItem>
        </DefaultDesignProvider>
      </styled.div>
    </Fragment>
  );
}

type PlaygroundItemProps = Merge<
  Omit<HTMLStyledProps<"div">, "title" | OmittedHTMLProps>,
  { height?: number; children?: React.ReactNode } & TItemContentFragmentProps
>;

function PlaygroundItem({
  height,
  children,
  endIcon,
  endPadding,
  endSlot,
  loading,
  noLayout,
  padding,
  startIcon,
  startPadding,
  startSlot,
  ...htmlProps
}: PlaygroundItemProps) {
  const { height: resolvedHeight } = useContainerDesignProps({ height });

  const nestedDesign = useMemo(
    (): TNestedDesignValues => [
      { height: resolvedHeight },
      { height: autoContentHeight(resolvedHeight, 0.9) },
      { height: autoContentHeight(resolvedHeight, 0.7) },
    ],
    [resolvedHeight],
  );

  return (
    <NestedDefaultDesignProvider values={nestedDesign}>
      <Frame
        interactive
        variant="ghost"
        className="group"
        startPadding="icon"
        startSlot={<Button variant="ghost" startIcon={<CaretRightIcon />} />}
        endIcon={endIcon}
        endPadding={endPadding}
        endSlot={endSlot}
        noLayout={noLayout}
        loading={loading}
        padding={padding}
        {...htmlProps}
      >
        <ItemContentFragment {...{ startIcon, startPadding, startSlot }}>
          <ItemContent css={{ flex: "1" }} padding="none">
            {children}
          </ItemContent>
        </ItemContentFragment>
      </Frame>
    </NestedDefaultDesignProvider>
  );
}

type InputProps = ComponentPropsBase<
  "input",
  TItemContentFragmentProps &
    TDesignProps & {
      disabled?: boolean;

      color?: TPaletteColor;
      highlightColor?: TPaletteColor;
      highlighted?: boolean;

      // Data attributes
      "data-hover"?: boolean;
      "data-focus-visible"?: boolean;
    }
>;

function Input(inProps: InputProps) {
  const { value, onChange, placeholder, onPointerDown: onPointerDownProps, ...frameProps } = inProps;

  const localRef = useRef<HTMLInputElement>(null);
  const ref = useMergeRefs(localRef, inProps.ref);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      onPointerDownProps?.(event as React.PointerEvent<HTMLInputElement>);
      if (event.defaultPrevented) return;
      if (event.target === localRef.current) return;
      setTimeout(() => localRef.current?.focus(), 0);
    },
    [onPointerDownProps],
  );

  return (
    <Frame variant="input" interactive onPointerDown={onPointerDown} {...frameProps}>
      <styled.input
        css={{ outline: "none", alignSelf: "stretch" }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
      />
    </Frame>
  );
}
