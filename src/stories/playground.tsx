import { CaretRightIcon, PenIcon } from "@phosphor-icons/react";
import { Fragment, useMemo, useState } from "react";
import { Merge } from "type-fest";
import { HTMLStyledProps, styled } from "../../styled-system/jsx";
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
import { autoContentHeight } from "../shared/design/sizes";
import { TNestedDesignValues } from "../shared/design/types";

export default function Playground() {
  return (
    <styled.div css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}>
      <TreePlayground />
      <div style={{ height: 20 }} />
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
