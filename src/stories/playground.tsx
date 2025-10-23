import { CaretRightIcon, PenIcon } from "@phosphor-icons/react";
import { Fragment, useMemo, useState } from "react";
import { Paper, styled } from "../../styled-system/jsx";
import { Button } from "../shared/components/button/Button";
import {
  DefaultDesignProvider,
  NestedDefaultDesignProvider,
  useContainerDesignProps,
} from "../shared/components/core/DesignContext";
import { Input } from "../shared/components/form/Input";
import { Frame } from "../shared/components/frame/Frame";
import { FrameContent } from "../shared/components/frame/FrameContent";
import { FrameContentFragment, TFrameContentFragmentProps } from "../shared/components/frame/FrameContentFragment";
import { TNestedDesignValues } from "../shared/design/types";
import { autoContentHeight } from "../shared/design/utils";
import { SanitizePropsBase } from "../shared/utils/componentProps";

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
      <div style={{ height: 20 }} />
      <Paper css={{ padding: "2", bg: "neutral.900" }}>
        <Input>With content</Input>

        <Input>
          <span>With content</span>
        </Input>
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

type PlaygroundItemProps = SanitizePropsBase<
  HTMLDivElement,
  { height?: number; children?: React.ReactNode } & TFrameContentFragmentProps
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
  const { height: resolvedHeight } = useContainerDesignProps({ height }, "subtle");

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
        <FrameContentFragment {...{ startIcon, startPadding, startSlot }}>
          <FrameContent css={{ flex: "1" }} padding="none">
            {children}
          </FrameContent>
        </FrameContentFragment>
      </Frame>
    </NestedDefaultDesignProvider>
  );
}
