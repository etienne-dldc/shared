import { ArrowCounterClockwiseIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import { Fragment, useState } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { css } from "../../styled-system/css";
import { VStack } from "../../styled-system/jsx";
import { paper } from "../../styled-system/patterns";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { DefaultDesignProvider } from "../shared/components/core/DesignContext";
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
            <VStack gap="4" p="4" alignItems="stretch">
              <VStack alignItems="stretch" className={paper()} p="2" gap="1" bg="neutral.850">
                <DefaultDesignProvider variant="subtle" height="8">
                  <Button onClick={open(i)} startIcon={<PlusIcon />} hoverVariant="solid">
                    Open
                  </Button>
                  <Button onClick={reset(i)} startIcon={<ArrowCounterClockwiseIcon />}>
                    Reset
                  </Button>
                  {i > 0 && (
                    <Button onClick={close(i)} startIcon={<XIcon />} color="red" hoverVariant="solid">
                      Close
                    </Button>
                  )}
                </DefaultDesignProvider>
              </VStack>
              <PanelContent />
            </VStack>
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
    <Fragment>
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
    </Fragment>
  );
}
