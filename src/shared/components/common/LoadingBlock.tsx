import { css } from "../../../../styled-system/css";
import { LoadingIcon } from "./LoadingIcon";

export function LoadingBlock() {
  return (
    <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "3", py: "6" })}>
      <LoadingIcon size={60} weight="thin" />
      <div
        className={css({
          textTransform: "uppercase",
          letterSpacing: "wider",
          textStyle: "4",
          fontWeight: "semibold",
          paddingLeft: "3",
        })}
      >
        Loading...
      </div>
    </div>
  );
}

LoadingBlock.displayName = "LoadingBlock";
