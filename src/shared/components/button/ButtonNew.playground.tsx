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
  text: utils.prop("content", {
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
  icon: utils.prop("icon", {
    none: undefined,
    user: <UserIcon />,
    workspace: <CirclesFourIcon />,
    select: <CaretDownIcon />,
  }),
  endAction: utils.prop("endAction", {
    none: undefined,
    dotsButton: <ButtonLike icon={<DotsThreeVerticalIcon />} />,
    caretButton: <ButtonLike icon={<CaretDownIcon />} />,
    cancelButton: <ButtonLike content="Cancel" color="red" />,
    primaryDotsButton: <ButtonLike icon={<DotsThreeVerticalIcon />} />,
  }),
  spacing: {
    default: utils.value({ spacing: undefined }),
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
  height: utils.prop("height", {
    default: undefined,
    "2x": "2x",
    "3": "3",
    "3x": "3x",
    "4": "4",
    "4x": "4x",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "10": "10",
    "12": "12",
  }),
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

console.log(tree.data.color.indigo);

export default function ButtonPlayground() {
  return (
    <VStack alignItems="stretch">
      <Variants
        tree={tree}
        render={(props) => <Button content="Label" {...props} />}
        dimentions={[
          { name: "Color", keys: ["spacing.basic"], type: "row" },
          { name: "Color", keys: ["color"], type: "column" },
          { name: "Color", keys: ["spacing"], type: "config" },
        ]}
      />
      <Variants
        tree={tree}
        render={(props) => <Button content="Label" {...props} />}
        dimentions={[
          { name: "Color", keys: ["variant"], type: "row" },
          { name: "Color", keys: ["color"], type: "column" },
        ]}
      />
      <Variants
        tree={tree}
        render={(props) => <Button content="Label" {...props} />}
        dimentions={[
          { name: "Color", keys: ["variant"], type: "row" },
          { name: "Color", keys: ["state"], type: "column" },
          { name: "Color", keys: ["color"], type: "row" },
        ]}
      />
    </VStack>
  );
}
