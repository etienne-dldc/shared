import { nanoid } from "nanoid";
import { OverlayScrollbars } from "overlayscrollbars";
import { useCallback, useRef, useState } from "react";
import { css, cx } from "../../../styled-system/css";
import { styled } from "../../../styled-system/jsx";
import { paper } from "../../../styled-system/patterns";
import { SystemStyleObject } from "../../../styled-system/types";
import { Scrollbars } from "../components/common/Scrollbars";

export type FinderProps = React.PropsWithChildren<{
  className?: string;
  css?: SystemStyleObject;
}>;

export function Finder({ children, className, css: cssProp }: FinderProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const setScrollWidth = useCallback((val: number) => {
    const elem = parentRef.current;
    if (!elem) {
      return;
    }
    elem.style.setProperty("--finder-panel-max-width", `${val}px`);
  }, []);

  const [contentMinSizeVarName] = useState(() => `--resizable-panel-size-${nanoid()}`);

  const updateContentMinSize = useCallback(
    (instance: OverlayScrollbars) => {
      const element = instance.elements().scrollEventElement as HTMLDivElement;
      const elementWith = element.getBoundingClientRect().width;
      const visibleMax = elementWith + element.scrollLeft;
      element.style.setProperty(contentMinSizeVarName, `${visibleMax}px`);
    },
    [contentMinSizeVarName],
  );

  const onInitUpdate = useCallback(
    (instance: OverlayScrollbars) => {
      setScrollWidth(instance.state().overflowEdge.x);
      updateContentMinSize(instance);
    },
    [setScrollWidth, updateContentMinSize],
  );

  return (
    <Scrollbars
      className={cx(css(paper.raw({ bg: "neutral.900" }), cssProp), className)}
      events={{
        initialized: onInitUpdate,
        updated: onInitUpdate,
        scroll: updateContentMinSize,
      }}
      options={{ scrollbars: { autoHide: "scroll" } }}
    >
      <styled.div
        ref={parentRef}
        style={{
          ["--scroll-content-min-width" as string]: `var(${contentMinSizeVarName})`,
        }}
        css={{
          display: "flex",
          flexDirection: "row",
          height: "full",
          minWidth: "[var(--scroll-content-min-width)]",
        }}
      >
        {children}
      </styled.div>
    </Scrollbars>
  );
}
