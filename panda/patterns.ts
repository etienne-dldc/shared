import { definePattern } from "@pandacss/dev";

const ellipsis = definePattern({
  description: "Text ellipsis",
  jsxElement: "span",
  properties: {},
  defaultValues: {},
  transform(props) {
    const { truncate, ...rest } = props;
    return {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      ...rest,
    };
  },
});

const paper = definePattern({
  description: "Paper component",
  jsxElement: "div",
  properties: {
    level: {
      type: "enum",
      value: ["card", "select", "modal"],
    },
  },
  transform(props) {
    const { level = "modal", ...rest } = props;
    switch (level) {
      case "card":
        return {
          overflow: "hidden",
          background: "neutral.900",
          borderColor: "neutral.825",
          borderRadius: "2",
          borderWidth: "0_x",
          ...rest,
        };
      case "select":
        return {
          overflow: "hidden",
          background: "neutral.900",
          borderColor: "neutral.800",
          borderRadius: "2",
          borderWidth: "0_x",
          boxShadow: "md",
          ...rest,
        };
      case "modal":
        return {
          overflow: "hidden",
          background: "neutral.950",
          borderColor: "neutral.900",
          borderRadius: "2",
          borderWidth: "0_x",
          boxShadow: "xl",
          ...rest,
        };
      default:
        return rest;
    }
  },
});

const backdrop = definePattern({
  description: "Backdrop component",
  jsxElement: "div",
  properties: {},
  transform() {
    return {
      position: "fixed",
      inset: "0",
      backgroundColor: "black/30",
      backdropFilter: "blur(4px)",
    };
  },
});

export const patterns = {
  ellipsis,
  paper,
  backdrop,
};
