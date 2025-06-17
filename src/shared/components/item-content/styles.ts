import { cva } from "../../../../styled-system/css";

export const itemContentClass = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1",
    maxW: "full",
    gap: "var(--spacing-gap)",
    px: "var(--spacing-gap)",
    spacingGap: "[auto]",
  },
  variants: {
    startPadding: {
      icon: {},
      text: { paddingLeft: "[calc(var(--spacing-gap) * 1.5)]" },
      none: { paddingLeft: "0" },
    },
    endPadding: {
      icon: {},
      text: { paddingRight: "[calc(var(--spacing-gap) * 1.5)]" },
      none: { paddingRight: "0" },
    },
  },
});
