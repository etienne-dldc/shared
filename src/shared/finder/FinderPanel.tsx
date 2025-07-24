import * as Ariakit from "@ariakit/react";
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { createContext, ForwardedRef, forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { css, cx } from "../../../styled-system/css";
import { styled } from "../../../styled-system/jsx";
import { SystemStyleObject } from "../../../styled-system/types";
import { Scrollbars } from "../components/common/Scrollbars";
import { useLatestRef } from "../hooks/useLatestRef";
import { useMergeRefs } from "../hooks/useMergeRefs";
import { TUseResizeWidth, useResize } from "../hooks/useResize";
import { onDoubleTap } from "../utils/onDoubleTap";
import "./panel-scrollbar.css";
import { panelScrollbarClass } from "./scrollbar";

OverlayScrollbars.plugin(ClickScrollPlugin);

const PanelSizeContext = createContext<TUseResizeWidth>(0);
const PanelRefContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useFinderPanelSize() {
  return useContext(PanelSizeContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFinderPanelRef() {
  return useContext(PanelRefContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFinderPanelRefOrFail() {
  const ref = useContext(PanelRefContext);
  if (!ref) {
    throw new Error("useFinderPanelRefOrFail must be used inside a FinderPanel");
  }
  return ref;
}

const GUTTER_WIDTH = 10;
const MINI_HANDLE_HEIGHT = 20;

export interface FinderPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  initialWidth?: TUseResizeWidth;
  resizeLocalStorageKey?: string;
  isActive?: boolean;
  onActivate?: () => void;
  className?: string;
  css?: SystemStyleObject;
}

export const FinderPanel = forwardRef(function FinderPanel(
  { children, className, isActive = false, onActivate, resizeLocalStorageKey, css: cssProp, ...rest }: FinderPanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergeRefs(ref, panelRef);
  const onActivateRef = useLatestRef(() => {
    const panelEl = panelRef.current;
    if (panelEl) {
      scrollIntoView(panelEl);
    }
    onActivate?.();
  });

  const resizer = useResize(panelRef, {
    direction: "left",
    initialSize: "auto",
    localStorageKey: resizeLocalStorageKey,
  });

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const timer = setTimeout(() => {
      onActivateRef.current();
    }, 10);
    return () => clearTimeout(timer);
  }, [isActive, onActivateRef]);

  const onHandleClick = useMemo(() => onDoubleTap(resizer.reset), [resizer.reset]);

  const onCompositeKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && event.currentTarget === event.target) {
        event.preventDefault();
        event.stopPropagation();
        onActivateRef.current();
      }
    },
    [onActivateRef],
  );

  return (
    <Ariakit.CompositeItem
      ref={mergedRef}
      className={cx(
        css(
          {
            flexShrink: "0",
            position: "relative",
            maxWidth: "[var(--finder-panel-max-width)]",
            outline: "none",
            "&::after": {
              content: "''",
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              right: "[var(--gutter-width)]",
              pointerEvents: "none",
              zIndex: 9999,
            },
            _focusVisible: {
              "&::after": {
                borderWidth: "0x",
                borderColor: "neutral.700",
                borderStyle: "solid",
              },
            },
          },
          cssProp,
        ),
        className,
      )}
      style={{
        width: resizer.dynamicSize,
        ["--gutter-width" as string]: `${GUTTER_WIDTH}px`,
        ["--mini-handle-height" as string]: `${MINI_HANDLE_HEIGHT}px`,
      }}
      render={<section {...rest} />}
      onKeyDown={onCompositeKeyDown}
    >
      <PanelRefContext.Provider value={panelRef}>
        <PanelSizeContext.Provider value={resizer.size}>
          <Scrollbars
            defer
            className={css({ height: "full", width: "full" })}
            style={{ paddingRight: GUTTER_WIDTH }}
            options={{
              scrollbars: {
                theme: cx("os-theme-dark os-panel-theme", panelScrollbarClass),
                autoHide: "scroll",
                clickScroll: true,
              },
              overflow: { x: "scroll", y: "scroll" },
            }}
          >
            {children}
          </Scrollbars>
        </PanelSizeContext.Provider>
      </PanelRefContext.Provider>
      <styled.div
        position="absolute"
        insetY="0"
        right="0"
        width="[var(--gutter-width)]"
        pointerEvents="none"
        bg="black/25"
        zIndex={10}
      />
      <MiniHandle
        onPointerDown={resizer.onPointerDown}
        className={css({ top: "0", right: "0", zIndex: 10 })}
        style={{ width: GUTTER_WIDTH, height: MINI_HANDLE_HEIGHT }}
        onClick={onHandleClick}
      />
      <MiniHandle
        onPointerDown={resizer.onPointerDown}
        className={css({ bottom: "0", right: "0", zIndex: 10 })}
        style={{ width: GUTTER_WIDTH, height: MINI_HANDLE_HEIGHT }}
        onClick={onHandleClick}
      />
    </Ariakit.CompositeItem>
  );
});

function MiniHandle({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx(
        css({
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0xx",
          padding: "0_x",
          cursor: "col-resize",
          touchAction: "none",
          "&::before": {
            content: "''",
            position: "absolute",
            left: "-0_x",
            top: "0",
            bottom: "0",
            right: "0",
          },
        }),
        className,
      )}
      {...rest}
    >
      <div className={css({ width: "0_x", backgroundColor: "neutral.600", borderRadius: "full", height: "2" })} />
      <div className={css({ width: "0_x", backgroundColor: "neutral.600", borderRadius: "full", height: "2" })} />
    </div>
  );
}
