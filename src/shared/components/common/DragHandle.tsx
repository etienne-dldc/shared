import { ComponentPropsWithRef } from "react";
import { Merge } from "type-fest";
import { css, cva, cx } from "../../../../styled-system/css";

type DragHandleProps = Merge<
  ComponentPropsWithRef<"div">,
  {
    innerClassName?: string;
    direction: "horizontal" | "vertical";
    active?: boolean;
    style?: React.CSSProperties;
  }
>;

const handleClass = cva({
  base: {
    //"border-none block hover:bg-white/5"
    display: "block",
    border: "none",
    _hover: {
      bg: "white/5",
    },
  },
  variants: {
    direction: {
      vertical: {
        pl: "1",
        pr: "1",
        cursor: "ew-resize",
        ml: "-1",
        mr: "-1",
        my: "3",
        py: "1",
      },
      horizontal: {
        pt: "1",
        pb: "1",
        cursor: "ns-resize",
        mt: "-1",
        mb: "-1",
        mx: "3",
        px: "1",
      },
    },
  },
});

const innerHandleClass = cva({
  variants: {
    direction: {
      vertical: {
        w: "0_x",
        h: "full",
        bg: "neutral.800",
      },
      horizontal: {
        h: "0_x",
        w: "full",
        bg: "neutral.800",
      },
    },
  },
});

export function DragHandle({ className, innerClassName, direction, active = false, ...rest }: DragHandleProps) {
  return (
    <div className={cx(css(handleClass.raw({ direction }), active && { bg: "white/10" }), className)} {...rest}>
      <div className={cx(innerHandleClass({ direction }), innerClassName)} />
    </div>
  );
}
