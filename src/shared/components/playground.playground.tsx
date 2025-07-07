import { CaretDownIcon, CaretRightIcon, DotIcon, DotsSixVerticalIcon, HouseIcon, PenIcon } from "@phosphor-icons/react";
import { ComponentPropsWithRef, Fragment, useState } from "react";
import { Merge } from "type-fest";
import { HStack, styled } from "../../../styled-system/jsx";
import { BASE_HEIGHT_RATIO } from "../design/sizes";
import { clamp } from "../utils/math";
import { pipePropsSplitters } from "../utils/propsSplitters";
import { Button } from "./button/Button";
import { ButtonGroup } from "./button/ButtonGroup";
import { ButtonLike } from "./button/ButtonLike";
import { DesignContext, designPropsSplitter, useContainerDesignProps } from "./core/DesignContext";
import { ItemContent } from "./item-content/ItemContent";
import { ItemContentFragment } from "./item-content/ItemContentFragment";
import { TItemContentFragmentProps } from "./item-content/types";

export default function Playground() {
  return (
    <styled.div display="flex" flexDirection="column" gap="1" alignItems="start">
      <ButtonLike height={6} variant="subtle" startIcon={null} startPadding="icon" endPadding="icon">
        <ButtonLike variant="solid" startIcon={<DotsSixVerticalIcon />} />
        <ButtonLike variant="solid" startIcon={<CaretRightIcon />} />
      </ButtonLike>
      <div style={{ height: 20 }} />

      <ButtonLike variant="subtle" startIcon={<HouseIcon />} />
      <ButtonLike variant="subtle">Playground</ButtonLike>
      <ButtonLike variant="subtle" startIcon={<HouseIcon />}>
        Playground
      </ButtonLike>
      <ButtonLike variant="subtle" endIcon={<HouseIcon />}>
        Playground
      </ButtonLike>
      <ButtonLike variant="subtle" startIcon={<HouseIcon />} endIcon={<HouseIcon />}>
        Playground
      </ButtonLike>
      <div style={{ height: 20 }} />

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

      <ButtonGroup direction="vertical">
        <Button>Open</Button>
        <Button>Reset</Button>
        <Button>Close</Button>
      </ButtonGroup>
      <ButtonGroup direction="horizontal">
        <Button>Open</Button>
        <Button>Reset</Button>
        <Button>Close</Button>
      </ButtonGroup>
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
    </styled.div>
  );
}

function ButtonPlayground() {
  const [height, setHeight] = useState(6);
  const [heightRatio, setHeightRatio] = useState(BASE_HEIGHT_RATIO);

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

      <p>Height Ratio {heightRatio}</p>
      <input
        type="range"
        min={0.01}
        max={1}
        step={0.01}
        value={heightRatio}
        onChange={(e) => setHeightRatio(parseFloat(e.target.value))}
        style={{ width: 300 }}
      />

      <styled.div
        display="flex"
        flexDirection="column"
        gap="1"
        alignItems="start"
        // className={colorPaletteClass({ colorPalette: "blue" })}
        // css={{ "& *": { outline: "[1px solid blue]" } }}
      >
        <DesignContext.Define height={height} heightRatio={heightRatio}>
          <Button>Text</Button>
          <Button startIcon={<HouseIcon />}>Text</Button>
          <Button endIcon={<HouseIcon />}>Text</Button>
          <Button startIcon={<HouseIcon />} endIcon={<HouseIcon />}>
            Text
          </Button>
          <Button startIcon={<HouseIcon />} />
          <ButtonLike startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}>Nested Button</ButtonLike>
          <ButtonLike heightRatio={0.8} startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}>
            Nested Button fixed ratio
          </ButtonLike>
          <ButtonLike heightRatio={(p) => p * 0.8} startSlot={<Button variant="solid" startIcon={<HouseIcon />} />}>
            Nested Button scaled ratio
          </ButtonLike>
          <ButtonLike
            heightRatio={(p) => clamp(p + 0.2, 0.1, 0.95)}
            startSlot={<Button variant="ghost" startIcon={<HouseIcon />} />}
          >
            Nested Button added ratio
          </ButtonLike>
        </DesignContext.Define>
      </styled.div>
    </Fragment>
  );
}

function TreePlayground() {
  const [height, setHeight] = useState(6);
  const [heightRatio, setHeightRatio] = useState(BASE_HEIGHT_RATIO);

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

      <p>Height Ratio {heightRatio}</p>
      <input
        type="range"
        min={0.01}
        max={1}
        step={0.01}
        value={heightRatio}
        onChange={(e) => setHeightRatio(parseFloat(e.target.value))}
        style={{ width: 300 }}
      />

      <styled.div display="flex" flexDirection="column" alignItems="stretch" w="320px">
        <DesignContext.Define height={height} heightRatio={heightRatio}>
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
        </DesignContext.Define>
      </styled.div>
    </Fragment>
  );
}

type PlaygroundItemProps = Merge<
  Omit<ComponentPropsWithRef<"button">, "color">,
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
  const parentHeightRation = DesignContext.useProps().heightRatio;

  return (
    <DesignContext.Define heightRatio={parentHeightRation ?? 0.85}>
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
          <ItemContent heightRatio={0.7} css={{ flex: "1" }}>
            {children}
          </ItemContent>
        </ItemContentFragment>
      </Button>
    </DesignContext.Define>
  );
}

function PowerSizeDemo() {
  const [power, setPower] = useState(0.68);

  return (
    <DesignContext.Define heightRatio={power}>
      <styled.div display="flex" flexDirection="column" gap="1" alignItems="start">
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
          <DesignContext.Define height={10} heightRatio={1}>
            <PowerButtonContent>
              <span>Button 14</span>
              <PowerButton>Button 14</PowerButton>
              <PowerButtonContent>
                <span>N1</span>
                <PowerButton>N2</PowerButton>
              </PowerButtonContent>
            </PowerButtonContent>
          </DesignContext.Define>
        </PowerButton>
      </styled.div>
    </DesignContext.Define>
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
      <DesignContext.Define height={inProps.height} heightRatio={inProps.heightRatio}>
        {children}
      </DesignContext.Define>
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
      <DesignContext.Define height={contentHeight} heightRatio={inProps.heightRatio}>
        {children}
      </DesignContext.Define>
    </div>
  );
}
