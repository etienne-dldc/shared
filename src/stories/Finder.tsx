import { nanoid } from "nanoid";
import { useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { css } from "../../styled-system/css";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { Finder } from "../shared/finder/Finder";
import { FinderPanel, useFinderPanelRefOrFail, useFinderPanelSize } from "../shared/finder/FinderPanel";
import { useIsMobile } from "../shared/hooks/useIsMobile";

export default function FinderPlayground() {
  const [keys, setKeys] = useState<string[]>([nanoid()]);

  const open = (fromIndex: number) => () => {
    setKeys((prev) => [...prev.slice(0, fromIndex + 1), nanoid()]);
  };

  const reset = (fromIndex: number) => () => {
    setKeys((prev) => prev.slice(0, fromIndex + 1));
  };

  const close = (fromIndex: number) => () => {
    setKeys((prev) => prev.slice(0, fromIndex));
  };

  return (
    <div className={css({ position: "absolute", inset: "0" })}>
      <Finder css={{ h: "full", w: "full", rounded: "2", shadow: "lg", position: "absolute", inset: "0" }}>
        {keys.map((key, i) => (
          <FinderPanel key={key} css={{ w: "full", md: { w: "[600px]" } }} isActive={i === keys.length - 1}>
            <ButtonGroup direction="vertical" css={{ p: "2" }}>
              <Button onClick={open(i)}>Open</Button>
              <Button onClick={reset(i)}>Reset</Button>
              {i > 0 && <Button onClick={close(i)}>Close</Button>}
            </ButtonGroup>
            <PanelContent />
          </FinderPanel>
        ))}
      </Finder>
    </div>
  );
}

function PanelContent() {
  const [expanded, setExpanded] = useState(false);
  const size = useFinderPanelSize();
  const panelRef = useFinderPanelRefOrFail();
  const isMobile = useIsMobile();
  const isCompact = size === "auto" ? isMobile : size < 600;

  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "2", padding: "2" })}>
      <div className={css({ display: "flex", gap: "3" }, isCompact && { flexDirection: "column" })}>
        <div className={css({ height: "10", rounded: "1_x", backgroundColor: "white/25", flexGrow: 1 })} />
        <div className={css({ height: "10", rounded: "1_x", backgroundColor: "white/25", flexGrow: 1 })} />
        <div className={css({ height: "10", rounded: "1_x", backgroundColor: "white/25", flexGrow: 1 })} />
      </div>
      <ButtonGroup direction="vertical">
        <Button
          onClick={() => {
            if (panelRef.current) {
              scrollIntoView(panelRef.current);
            }
          }}
        >
          Scroll into view
        </Button>
        <Button onClick={() => setExpanded((prev) => !prev)}>{expanded ? "Collapse" : "Expand"}</Button>
      </ButtonGroup>
      {expanded && (
        <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={css({ backgroundColor: "white/10", rounded: "1_x", height: "160px" })} />
          ))}
        </div>
      )}
    </div>
  );
}
