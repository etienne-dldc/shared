/* eslint-disable react-refresh/only-export-components */
import * as Ariakit from "@ariakit/react";
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { createContext, ForwardedRef, forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import "overlayscrollbars/overlayscrollbars.css";

import { useLatestRef } from "../hooks/useLatestRef";
import { useMergeRefs } from "../hooks/useMergeRefs";
import { TUseResizeWidth, useResize } from "../hooks/useResize";
import { cn, tw } from "../styles/utils";
import { onDoubleTap } from "../utils/onDoubleTap";

OverlayScrollbars.plugin(ClickScrollPlugin);

const PanelSizeContext = createContext<TUseResizeWidth>(0);
const PanelRefContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function useFinderPanelSize() {
  return useContext(PanelSizeContext);
}

export function useFinderPanelRef() {
  return useContext(PanelRefContext);
}

export function useFinderPanelRefOrFail() {
  const ref = useContext(PanelRefContext);
  if (!ref) {
    throw new Error("useFinderPanelRefOrFail must be used inside a FinderPanel");
  }
  return ref;
}

const GUTTER_WIDTH = 11;
const MINI_HANDLE_HEIGHT = 20;

export interface FinderPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  initialWidth?: TUseResizeWidth;
  className?: string;
  resizeLocalStorageKey?: string;
  isActive?: boolean;
  onActivate?: () => void;
}

export const FinderPanel = forwardRef(function FinderPanel(
  { children, className, isActive = false, onActivate, resizeLocalStorageKey, ...rest }: FinderPanelProps,
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
      className={cn(
        "shrink-0 relative max-w-[var(--finder-panel-max-width)]",
        tw`outline-none`,
        tw`after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0 after:right-[var(--gutter-width)] after:pointer-events-none after:z-[9999]`,
        tw`data-focus-visible:after:border-2 data-focus-visible:after:border-neutral-700`,
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
          <OverlayScrollbarsComponent
            defer
            className={cn("h-full w-full")}
            style={{ paddingRight: GUTTER_WIDTH }}
            options={{
              scrollbars: {
                theme: "os-theme-dark os-panel-theme",
                autoHide: "scroll",
                clickScroll: true,
              },
              overflow: { x: "scroll", y: "scroll" },
            }}
          >
            {children}
          </OverlayScrollbarsComponent>
        </PanelSizeContext.Provider>
      </PanelRefContext.Provider>
      <div className="absolute inset-y-0 right-0 w-[var(--gutter-width)] pointer-events-none bg-neutral-900 z-10" />
      <MiniHandle
        onPointerDown={resizer.onPointerDown}
        className="top-0 right-0 z-10"
        style={{ width: GUTTER_WIDTH, height: MINI_HANDLE_HEIGHT }}
        onClick={onHandleClick}
      />
      <MiniHandle
        onPointerDown={resizer.onPointerDown}
        className="bottom-0 right-0 z-10"
        style={{ width: GUTTER_WIDTH, height: MINI_HANDLE_HEIGHT }}
        onClick={onHandleClick}
      />
    </Ariakit.CompositeItem>
  );
});

function MiniHandle({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "absolute flex justify-center items-center gap-[3px] p-0.5 cursor-col-resize touch-none",
        "before:content-[''] before:absolute before:-left-1 before:top-0 before:bottom-0 before:right-0",
        className,
      )}
      {...rest}
    >
      <div className="w-px bg-neutral-600 rounded-full h-2" />
      <div className="w-px bg-neutral-600 rounded-full h-2" />
    </div>
  );
}
