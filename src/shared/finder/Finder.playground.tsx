import { nanoid } from "nanoid";
import { useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { css } from "../../../styled-system/css";
import { Button } from "../components/button/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { Finder } from "./Finder";
import { FinderPanel, useFinderPanelRefOrFail, useFinderPanelSize } from "./FinderPanel";

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
            <div className={css({ display: "flex", flexDirection: "column", gap: "2", padding: "2" })}>
              <Button onClick={open(i)} content="Open" />
              <Button onClick={reset(i)} content="Reset" />
              {i > 0 && <Button onClick={close(i)} content="Close" />}
            </div>
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
      <Button
        onClick={() => {
          if (panelRef.current) {
            scrollIntoView(panelRef.current);
          }
        }}
        content="Scroll into view"
      />
      <Button onClick={() => setExpanded((prev) => !prev)} content={expanded ? "Collapse" : "Expand"} />
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
