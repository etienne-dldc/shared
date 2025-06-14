import { CaretDownIcon, CirclesFourIcon, DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { VStack } from "../../../../styled-system/jsx";
import { createVariantsTreeUtils } from "../../../playground/variants/tree";
import { Variants } from "../../../playground/variants/Variants";
import { TDesignVariant } from "../core/DesignContext";
import { Button, ButtonProps } from "./Button";
import { ButtonLike } from "./ButtonLike";

const utils = createVariantsTreeUtils<ButtonProps>();

const tree = utils.root({
  yolo: {
    foo: {
      bar: utils.value({ color: "red", content: "Danger" }),
    },
  },
  content: utils.prop("content", {
    default: undefined,
    short: "Label",
    long: "Much longer text",
    very_long: "Much much longer text with biiiiiiiiiiig words",
  }),
  color: utils.prop("color", {
    default: undefined,
    red: "red",
    orange: "orange",
    amber: "amber",
    yellow: "yellow",
    lime: "lime",
    green: "green",
    emerald: "emerald",
    teal: "teal",
    cyan: "cyan",
    sky: "sky",
    blue: "blue",
    indigo: "indigo",
    violet: "violet",
    purple: "purple",
    fuchsia: "fuchsia",
    pink: "pink",
    rose: "rose",
    slate: "slate",
    gray: "gray",
    zinc: "zinc",
    neutral: "neutral",
    stone: "stone",
  }),
  icon: utils.prop("startIcon", {
    none: undefined,
    user: <UserIcon />,
    workspace: <CirclesFourIcon />,
    select: <CaretDownIcon />,
  }),
  endAction: utils.prop("endSlot", {
    none: undefined,
    dotsButton: <ButtonLike startIcon={<DotsThreeVerticalIcon />} />,
    caretButton: <ButtonLike startIcon={<CaretDownIcon />} />,
    cancelButton: <ButtonLike content="Cancel" color="red" />,
    primaryDotsButton: <ButtonLike startIcon={<DotsThreeVerticalIcon />} />,
  }),
  spacing: {
    default: utils.value({}),
    basic: utils.prop("spacing", {
      s2x: "2x",
      s3: "3",
      s3x: "3x",
      s4: "4",
      s4x: "4x",
      s5: "5",
      s6: "6",
    }),
    others: utils.prop("spacing", {
      s7: "7",
      s8: "8",
      s10: "10",
      s12: "12",
    }),
  },
  // height: utils.prop("height", {
  //   default: undefined,
  //   s2x: "2x",
  //   s3: "3",
  //   s3x: "3x",
  //   s4: "4",
  //   s4x: "4x",
  //   s5: "5",
  //   s6: "6",
  //   s7: "7",
  //   s8: "8",
  //   s10: "10",
  //   s12: "12",
  // }),
  height: {
    default: utils.value({}),
    small: utils.prop("height", {
      s2x: "2x",
      s3: "3",
      s3x: "3x",
    }),
    base: utils.prop("height", {
      s4: "4",
      s4x: "4x",
      s5: "5",
      s6: "6",
      s7: "7",
      s8: "8",
      s10: "10",
      s12: "12",
    }),
  },
  variant: utils.prop("variant", {
    solid: "solid",
    surface: "surface",
    subtle: "subtle",
    ghost: "ghost",
  } satisfies Record<TDesignVariant, TDesignVariant>),
  hoverVariant: utils.prop("hoverVariant", {
    solid: "solid",
    surface: "surface",
    subtle: "subtle",
    ghost: "ghost",
  } satisfies Record<TDesignVariant, TDesignVariant>),
  state: {
    base: utils.value({}),
    hover: utils.value({ "data-hover": true }),
    focused: utils.value({ "data-focus-visible": true }),
    disabled: utils.value({ disabled: true }),
  },
});

export default function ButtonPlayground() {
  return (
    <VStack alignItems="stretch">
      <Variants
        title="Color & Size"
        tree={tree}
        dimentions={[
          { id: "height", name: "Height", keys: ["height.base"], type: "row" },
          { id: "color", name: "Color", keys: ["color"], type: "column" },
          { id: "spacing", name: "Spacing", keys: ["spacing"], type: "config" },
        ]}
        base={["variant.solid", "content.short"]}
        render={(props) => <Button {...props} />}
      />
      <Variants
        title="Icon & End Action"
        tree={tree}
        render={(props) => <Button {...props} />}
        dimentions={[
          { id: "color1", name: "Color", keys: ["variant"], type: "row" },
          { id: "color2", name: "Color", keys: ["color"], type: "column" },
        ]}
        base={["content.short"]}
      />
      <Variants
        title="State"
        tree={tree}
        render={(props) => <Button {...props} />}
        base={["content.short"]}
        dimentions={[
          { id: "color1", name: "Color", keys: ["variant"], type: "row" },
          { id: "color2", name: "Color", keys: ["state"], type: "column" },
          { id: "color3", name: "Color", keys: ["color"], type: "row" },
        ]}
      />
    </VStack>
  );
}
