import { CaretDownIcon, CaretRightIcon, DotIcon, DotsSixVerticalIcon, HouseIcon, PenIcon } from "@phosphor-icons/react";
import { ComponentPropsWithRef, Fragment, useMemo, useState } from "react";
import { Merge } from "type-fest";
import { HStack, styled } from "../../styled-system/jsx";
import { Button } from "../shared/components/button/Button";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import {
  DefaultDesignProvider,
  NestedDefaultDesignProvider,
  designPropsSplitter,
  useContainerDesignProps,
} from "../shared/components/core/DesignContext";
import { FrameGroup } from "../shared/components/frame/FrameGroup";
import { ItemContent } from "../shared/components/item-content/ItemContent";
import { ItemContentFragment } from "../shared/components/item-content/ItemContentFragment";
import { TItemContentFragmentProps } from "../shared/components/item-content/types";
import { Tooltip } from "../shared/components/popovers/Tooltip";
import { BASE_ROUNDED } from "../shared/design/sizes";
import { TNestedDesignValues } from "../shared/design/types";
import { pipePropsSplitters } from "../shared/utils/propsSplitters";

export default function Playground() {
  const [_state, setState] = useState(0);

  return (
    <styled.div css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}>
      <button onClick={() => setState((s) => s + 1)}>Re-render</button>
      <NestedButtonPlayground />
      <div style={{ height: 20 }} />

      <NestedDefaultDesignProvider values={[{ height: 20, rounded: 4, contentHeight: 16 }, { contentHeight: 12 }]}>
        <ButtonLike padding="icon">
          <ButtonLike padding="icon">
            <ButtonLike padding="icon">Hey</ButtonLike>
          </ButtonLike>
        </ButtonLike>
      </NestedDefaultDesignProvider>

      <NestedDefaultDesignProvider values={[{ height: 20, rounded: 4 }, { height: 14 }, { height: 10 }]}>
        <ButtonLike padding="icon">
          <ButtonLike padding="icon">
            <ButtonLike padding="icon">Hey</ButtonLike>
          </ButtonLike>
        </ButtonLike>
      </NestedDefaultDesignProvider>

      <ButtonLike padding="icon" rounded={4} height={20}>
        <ButtonLike padding="icon">
          <ButtonLike padding="icon">Hey</ButtonLike>
        </ButtonLike>
      </ButtonLike>

      <ButtonLike
        variant="subtle"
        height={14}
        startSlot={
          <Fragment>
            <Button variant="solid" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="solid" startIcon={<CaretRightIcon />} />
          </Fragment>
        }
      >
        Playground 1
      </ButtonLike>
      <div style={{ height: 20 }} />

      <ButtonPlayground />
      <div style={{ height: 20 }} />

      <TreePlayground />
      <div style={{ height: 20 }} />

      <ButtonLike
        variant="subtle"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="ghost" startIcon={<CaretDownIcon />} />
          </HStack>
        }
      >
        Playground 2
      </ButtonLike>
      <ButtonLike
        variant="subtle"
        startSlot={
          <HStack gap="0">
            <Button variant="ghost" startIcon={<DotsSixVerticalIcon />} />
            <Button variant="ghost" startIcon={<DotIcon />} />
          </HStack>
        }
      >
        <ItemContentFragment startSlot={<HouseIcon />} endSlot={<Button variant="ghost" startIcon={<PenIcon />} />}>
          Playground
        </ItemContentFragment>
      </ButtonLike>
      <ButtonLike startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
        <ItemContentFragment startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
          Playground
        </ItemContentFragment>
      </ButtonLike>
      <ButtonLike startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
        <ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>
      </ButtonLike>
      <div style={{ height: 20 }} />

      <ButtonLike>
        <ItemContent startSlot={<HouseIcon />} endIcon={<HouseIcon />}>
          <ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>
        </ItemContent>
      </ButtonLike>
      <div style={{ height: 20 }} />

      <ButtonLike startSlot={"Hello"} endIcon={<HouseIcon />} startPadding="text">
        <ItemContentFragment endIcon={<HouseIcon />}>Playground Frag</ItemContentFragment>
      </ButtonLike>
      <div style={{ height: 20 }} />

      <FrameGroup direction="vertical">
        <Button>Open</Button>
        <Button>Reset</Button>
        <Button>Close</Button>
      </FrameGroup>
      <FrameGroup direction="horizontal">
        <Button>Open</Button>
        <Button>Reset</Button>
        <Button>Close</Button>
      </FrameGroup>
      <div style={{ height: 20 }} />

      <ButtonLike>
        <ItemContent startIcon={<HouseIcon />}>Hello</ItemContent>
      </ButtonLike>
      <ButtonLike>
        <ItemContent>
          <ItemContent startIcon={<HouseIcon />}>Hello</ItemContent>
        </ItemContent>
      </ButtonLike>
      <ButtonLike>
        <ItemContent
          startIcon={<HouseIcon />}
          // heightRatio={0.5}
        >
          Hello
        </ItemContent>
      </ButtonLike>
      <ButtonLike
      // nestedHeight={0.5}
      >
        <ItemContent startIcon={<HouseIcon />}>Hello</ItemContent>
      </ButtonLike>
      <div style={{ height: 20 }} />

      <PowerSizeDemo />
      <div style={{ height: 20 }} />

      <FrameGroup height="12">
        <Tooltip content="This is a tooltip">
          <Button>Btn 1</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip">
          <Button>Btn 1</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip">
          <Button>Btn 1</Button>
        </Tooltip>
      </FrameGroup>
    </styled.div>
  );
}

function ButtonPlayground() {
  const [height, setHeight] = useState(6);
  const [contentHeight, setContentHeight] = useState(4);

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

      <p>Content Height {contentHeight}</p>
      <input
        type="range"
        min={2.5}
        max={20}
        step={0.5}
        value={contentHeight}
        onChange={(e) => setContentHeight(parseFloat(e.target.value))}
        style={{ width: 300 }}
      />

      <styled.div
        css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}
        // className={colorPaletteClass({ colorPalette: "blue" })}
        // css={{ "& *": { outline: "[1px solid blue]" } }}
      >
        <DefaultDesignProvider height={height} contentHeight={contentHeight}>
          <Button>Text</Button>
          <Button startIcon={<HouseIcon />}>Text</Button>
          <Button endIcon={<HouseIcon />}>Text</Button>
          <Button startIcon={<HouseIcon />} endIcon={<HouseIcon />}>
            Text
          </Button>
          <Button startIcon={<HouseIcon />} />
          <ButtonLike startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}>Nested Button</ButtonLike>
          <ButtonLike
            // heightRatio={0.8}
            startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}
          >
            Nested Button fixed ratio
          </ButtonLike>
          <ButtonLike
            // heightRatio={(p) => p * 0.8}
            startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}
          >
            Nested Button scaled ratio
          </ButtonLike>
          <ButtonLike
            // heightRatio={(p) => clamp(p + 0.2, 0.1, 0.95)}
            startSlot={<Button variant="ghost" startIcon={<HouseIcon />} />}
          >
            Nested Button added ratio
          </ButtonLike>
        </DefaultDesignProvider>
      </styled.div>
    </Fragment>
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
  Omit<ComponentPropsWithRef<"button">, "color">,
  { height?: number; children?: React.ReactNode } & TItemContentFragmentProps
>;

// function PlaygroundItem({
//   height,
//   children,
//   endIcon,
//   endPadding,
//   endSlot,
//   loading,
//   noLayout,
//   padding,
//   startIcon,
//   startPadding,
//   startSlot,
//   ...htmlProps
// }: PlaygroundItemProps) {
//   // const parentHeightRatio = DefaultDesignContext.useProps().heightRatio;

//   return (
//     <DefaultDesignProvider
//     // heightRatio={parentHeightRatio ?? 0.85}
//     >
//       <Button
//         variant="ghost"
//         className="group"
//         startPadding="icon"
//         startSlot={
//           <Button variant="ghost" startIcon={<CaretRightIcon />} />
//           // <HStack gap="0">
//           //   <IconBox
//           //     icon={<DotsSixVerticalIcon />}
//           //     css={{
//           //       // mr: "[calc(var(--spacing-gap) * -1)]",
//           //       opacity: 0.5,
//           //       _hover: { opacity: 1 },
//           //       cursor: "grab",
//           //     }}
//           //   />
//           //   {/* <Button
//           //   variant="ghost"
//           //   startIcon={<DotsSixVerticalIcon />}
//           //   css={{ mr: "[calc(var(--spacing-gap) * -1)]", opacity: 0.5, _groupHover: { opacity: 1 } }}
//           //   heightRatio={0.8}
//           // /> */}
//           //   <Button variant="ghost" startIcon={<CaretRightIcon />} />
//           // </HStack>
//         }
//         endIcon={endIcon}
//         endPadding={endPadding}
//         endSlot={endSlot}
//         noLayout={noLayout}
//         loading={loading}
//         padding={padding}
//         color="blue"
//         {...htmlProps}
//       >
//         <ItemContentFragment
//           {...{
//             startIcon,
//             startPadding,
//             startSlot,
//           }}
//         >
//           <ItemContent
//             // heightRatio={0.7}
//             css={{ flex: "1" }}
//           >
//             {children}
//           </ItemContent>
//         </ItemContentFragment>
//       </Button>
//     </DefaultDesignProvider>
//   );
// }

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
      { height: resolvedHeight - 2 },
      { height: resolvedHeight - 7 },
    ],
    [resolvedHeight],
  );

  return (
    <NestedDefaultDesignProvider values={nestedDesign}>
      <Button
        variant="ghost"
        className="group"
        startPadding="icon"
        startSlot={
          <Button variant="ghost" startIcon={<CaretRightIcon />} />
          // <HStack gap="0">
          //   <IconBox
          //     icon={<DotsSixVerticalIcon />}
          //     css={{
          //       // mr: "[calc(var(--spacing-gap) * -1)]",
          //       opacity: 0.5,
          //       _hover: { opacity: 1 },
          //       cursor: "grab",
          //     }}
          //   />
          //   {/* <Button
          //   variant="ghost"
          //   startIcon={<DotsSixVerticalIcon />}
          //   css={{ mr: "[calc(var(--spacing-gap) * -1)]", opacity: 0.5, _groupHover: { opacity: 1 } }}
          //   heightRatio={0.8}
          // /> */}
          //   <Button variant="ghost" startIcon={<CaretRightIcon />} />
          // </HStack>
        }
        endIcon={endIcon}
        endPadding={endPadding}
        endSlot={endSlot}
        noLayout={noLayout}
        loading={loading}
        padding={padding}
        color="blue"
        {...htmlProps}
      >
        <ItemContentFragment
          {...{
            startIcon,
            startPadding,
            startSlot,
          }}
        >
          <ItemContent css={{ flex: "1" }}>{children}</ItemContent>
        </ItemContentFragment>
      </Button>
    </NestedDefaultDesignProvider>
  );
}

function PowerSizeDemo() {
  const [power, setPower] = useState(0.68);

  return (
    <DefaultDesignProvider
    // heightRatio={power}
    >
      <styled.div css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}>
        {/* Power slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={power}
          onChange={(e) => setPower(parseFloat(e.target.value))}
          style={{ width: 300 }}
        />

        <PowerButton height={6}>
          <span>Button 6</span>
          <PowerButton>Button 6</PowerButton>
          <PowerButtonContent>
            <span>N1</span>
            <PowerButton>N2</PowerButton>
          </PowerButtonContent>
        </PowerButton>
        <PowerButton height={8}>
          <span>Button 8</span>
          <PowerButton>Button 8</PowerButton>
          <PowerButtonContent>
            <span>N1</span>
            <PowerButton>N2</PowerButton>
          </PowerButtonContent>
        </PowerButton>
        <PowerButton height={10}>
          <span>Button 10</span>
          <PowerButton>Button 10</PowerButton>
          <PowerButtonContent>
            <span>N1</span>
            <PowerButton>N2</PowerButton>
          </PowerButtonContent>
        </PowerButton>
        <PowerButton height={12}>
          <span>Button 12</span>
          <PowerButton>Button 12</PowerButton>
          <PowerButtonContent>
            <span>N1</span>
            <PowerButton>N2</PowerButton>
          </PowerButtonContent>
        </PowerButton>
        <PowerButton height={14}>
          <DefaultDesignProvider
            height={10}
            // heightRatio={1}
          >
            <PowerButtonContent>
              <span>Button 14</span>
              <PowerButton>Button 14</PowerButton>
              <PowerButtonContent>
                <span>N1</span>
                <PowerButton>N2</PowerButton>
              </PowerButtonContent>
            </PowerButtonContent>
          </DefaultDesignProvider>
        </PowerButton>
      </styled.div>
    </DefaultDesignProvider>
  );
}

interface PowerButtonProps {
  height?: number;
  heightRatio?: number;
  children?: React.ReactNode;
}

function PowerButton(inProps: PowerButtonProps) {
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const { children } = props;

  const { height, contentHeight } = useContainerDesignProps(localDesign);

  return (
    <div
      style={{
        height: height * 4,
        lineHeight: contentHeight * 4 + "px",
        fontSize: contentHeight * 4 * 0.88 + "px",
        background: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DefaultDesignProvider
        height={inProps.height}
        // heightRatio={inProps.heightRatio}
      >
        {children}
      </DefaultDesignProvider>
    </div>
  );
}

interface PowerButtonContentProps {
  heightRatio?: number;
  children?: React.ReactNode;
}

function PowerButtonContent(inProps: PowerButtonContentProps) {
  const [{ localDesign }, props] = pipePropsSplitters(inProps, {
    localDesign: designPropsSplitter,
  });

  const { children } = props;

  const { contentHeight } = useContainerDesignProps(localDesign);

  return (
    <div
      style={{
        paddingInline: 10,
        lineHeight: contentHeight * 4 + "px",
        fontSize: contentHeight * 4 * 0.88 + "px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DefaultDesignProvider
        height={contentHeight}
        // heightRatio={inProps.heightRatio}
      >
        {children}
      </DefaultDesignProvider>
    </div>
  );
}

function NestedButtonPlayground() {
  const [height, setHeight] = useState(6);
  const [contentHeight, setContentHeight] = useState(4);
  const [rounded, setRounded] = useState(BASE_ROUNDED);

  return (
    <styled.div css={{ display: "flex", flexDirection: "column", gap: "1", alignItems: "start" }}>
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

      <p>Content Height {contentHeight}</p>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={contentHeight}
        onChange={(e) => setContentHeight(parseInt(e.target.value, 10))}
        style={{ width: 300 }}
      />

      <p>Rounded {rounded}</p>
      <input
        type="range"
        min={0}
        max={6}
        step={0.5}
        value={rounded}
        onChange={(e) => setRounded(parseFloat(e.target.value))}
        style={{ width: 300 }}
      />

      <DefaultDesignProvider contentHeight={contentHeight} height={height}>
        <ButtonLike padding="icon" rounded={rounded}>
          <ButtonLike padding="icon">Hey</ButtonLike>
        </ButtonLike>
      </DefaultDesignProvider>
      {/* <DefaultDesignProvider heightRatio={heightRatio} height={height}>
        <ButtonLike padding="icon" rounded={rounded}>
          <ButtonLike padding="icon">
            <ButtonLike padding="icon">Hey</ButtonLike>
          </ButtonLike>
        </ButtonLike>
      </DefaultDesignProvider> */}
    </styled.div>
  );
}
