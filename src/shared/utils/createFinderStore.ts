import { parsePath, Path, To } from "history";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithDefault } from "jotai/utils";
import { createElement, forwardRef, ReactNode, useCallback, useMemo } from "react";
import { historyAtom } from "../atoms/history";
import { FinderPanelProps, FinderPanel as PanelBase } from "../components/finder/FinderPanel";
import { useAtomFromValue } from "../hooks/useAtomFromValue";
import { useMemoRecord } from "../hooks/useMemoRecord";
import { createHookProvider } from "../utils/hookProvider";
import {
  FinderLinkProps,
  ProviderPropsBase,
  TFinderPanelDefBase,
  TInternalState,
  TPanelStateBase,
  TPanelStatesBase,
} from "./createFinderStore.types";

export function createFinderStore<PanelStates extends TPanelStatesBase>() {
  type TPanelState = TPanelStateBase<PanelStates>;
  type TPanelsState = readonly TPanelState[];

  const {
    Provider: FinderProvider,
    useMaybe: useFinderMaybe,
    useOrFail: useFinderOrFail,
  } = createHookProvider("Finder", ({ panels: panelsDefs, matchLocation }: ProviderPropsBase<PanelStates>) => {
    const {
      history,
      $effect: $historyEffect,
      $location,
    } = useMemo(() => {
      return historyAtom<Partial<TInternalState<PanelStates>>>();
    }, []);
    useAtom($historyEffect);

    // Need object because jotai does not like functions as values
    const $matchLocationObj = useAtomFromValue(useMemo(() => ({ matchLocation }), [matchLocation]));
    const $panelsDefs = useAtomFromValue(panelsDefs);

    const toPath = useCallback(
      (pathTo: To): Path => {
        return { pathname: "/", search: "", hash: "", ...parsePath(history.createHref(pathTo)) };
      },
      [history],
    );

    const findPanelsLocation = useCallback(
      function findPanelsLocation<PanelStates extends Record<string, any>>(
        panelsDefs: readonly TFinderPanelDefBase<PanelStates>[],
        panels: readonly TPanelStateBase<PanelStates>[],
      ): Path {
        const panelsReverse = [...panels].reverse();
        for (const panel of panelsReverse) {
          const def = panelsDefs.find((def) => def.key === panel.key);
          if (!def) {
            throw new Error(`Panel definition not found for key ${String(panel.key)}`);
          }
          if (def.toLocation) {
            return toPath(def.toLocation(panel.state));
          }
        }
        throw new Error("No location found for panels");
      },
      [toPath],
    );

    const $matchLocationWithTools = useMemo(
      () =>
        atom((get) => {
          const matchLocationObj = get($matchLocationObj);
          const panelsDefs = get($panelsDefs);

          const withParents = (panel: TPanelState) => {
            return [...resolvePanelParents(panelsDefs, panel), panel];
          };

          return (location: Path) => {
            return matchLocationObj.matchLocation(location, { withParents });
          };
        }),
      [$matchLocationObj, $panelsDefs],
    );

    const $panelStates = useMemo(
      () =>
        atom((get): TPanelsState => {
          const location = get($location);
          if (location.state && location.state.panels) {
            return location.state.panels;
          }
          // if no state, we need to find the panels from the path
          return get($matchLocationWithTools)(location);
        }),
      [$location, $matchLocationWithTools],
    );

    const $requestedPanelStates = useMemo(
      () =>
        atomWithDefault<{
          action: "push" | "replace" | "init";
          panels: TPanelsState;
        } | null>((get) => {
          return { action: "init", panels: get($panelStates) };
        }),
      [$panelStates],
    );

    const $loading = useMemo(() => atom((get) => get($requestedPanelStates) !== null), [$requestedPanelStates]);

    const $loaderEffect = useMemo(() => {
      return atomEffect((get, set) => {
        const panelsDefs = get($panelsDefs);
        const requestedPanels = get($requestedPanelStates);
        if (!requestedPanels) {
          return;
        }
        const { action, panels } = requestedPanels;
        const resolved = panels.map((panel) => {
          const def = panelsDefs.find((def) => def.key === panel.key);
          if (!def) {
            throw new Error(`Panel definition not found for key ${String(panel.key)}`);
          }
          const preloaded = Boolean(def.preload && def.preloaded && def.preloaded(panel.state));
          return { def, panel, preloaded };
        });
        // Check if all panels are preloaded
        const allPreloaded = resolved.every(({ preloaded }) => preloaded);

        function navigateNow() {
          set($requestedPanelStates, null);
          if (action === "init") {
            return;
          }
          const location = findPanelsLocation(get($panelsDefs), panels);
          if (action === "push") {
            history.push(location, { panels });
            return;
          }
          if (action === "replace") {
            history.replace(location, { panels });
            return;
          }
          action satisfies never;
        }

        if (allPreloaded) {
          navigateNow();
          return;
        }

        const controller = new AbortController();
        (async () => {
          try {
            await Promise.all(
              resolved.map(async ({ def, panel, preloaded }) => {
                if (preloaded || !def.preload) {
                  return;
                }
                controller.signal.throwIfAborted();
                await def.preload(panel.state);
              }),
            );
            if (controller.signal.aborted) {
              return;
            }
          } catch (error) {
            if (controller.signal.aborted) {
              return;
            }
            console.error("Error during preload", error);
          }
          navigateNow();
        })();
        return () => {
          controller.abort();
        };
      });
    }, [$panelsDefs, $requestedPanelStates, findPanelsLocation, history]);
    useAtom($loaderEffect);

    // Active panel is the second to last panel
    const $activeIndex = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          if (panels.length < 2) {
            return null;
          }
          return panels.length - 2;
        }),
      [$panelStates],
    );

    const $navigate = useMemo(
      () =>
        atom(null, (_get, set, action: "push" | "replace", panels: TPanelsState) => {
          set($requestedPanelStates, { action, panels });
        }),
      [$requestedPanelStates],
    );

    const $navigateTo = useMemo(
      () =>
        atom(null, (get, set, action: "push" | "replace", pathTo: To) => {
          const panels = get($matchLocationWithTools)(toPath(pathTo));
          set($navigate, action, panels);
        }),
      [$matchLocationWithTools, $navigate, toPath],
    );

    const $openPanelFromIndex = useMemo(
      () =>
        atom(null, (get, set, fromIndex: number, panel: TPanelState) => {
          const panels = get($panelStates);
          const base = panels.slice(0, fromIndex + 1);
          // const stateDef = get($panelsDefs).find((def) => def.key === panel.key);
          // if (!stateDef) {
          //   throw new Error(`Panel definition not found for key ${String(panel.key)}`);
          // }
          // if (!stateDef.toLocation) {
          //   throw new Error(`Panel definition ${String(panel.key)} has no toLocation method`);
          // }
          const nextPanels = [...base, panel];
          set($navigate, "push", nextPanels);
        }),
      [$navigate, $panelStates],
    );

    const $updateStateByIndex = useMemo(
      () =>
        atom(null, (get, set, panelIndex: number, key: string, update: React.SetStateAction<TPanelState>) => {
          const panels = get($panelStates);
          const nextPanels = [...panels];
          const prevPanel = panels[panelIndex];
          if (prevPanel.key !== key) {
            throw new Error(`Panel key mismatch: expected ${String(key)}, got ${String(prevPanel.key)}`);
          }
          nextPanels[panelIndex] = {
            ...prevPanel,
            state: typeof update === "function" ? update(prevPanel.state) : update,
          };
          set($navigate, "replace", nextPanels);
        }),
      [$navigate, $panelStates],
    );

    const $closePanelsAfterIndex = useMemo(
      () =>
        atom(null, (get, set, fromIndex: number) => {
          const panels = get($panelStates);
          const nextPanels = panels.slice(0, fromIndex + 1);
          set($navigate, "push", nextPanels);
        }),
      [$navigate, $panelStates],
    );

    const navigate = useSetAtom($navigate);
    const navigateTo = useSetAtom($navigateTo);
    const openPanelFromIndex = useSetAtom($openPanelFromIndex);
    const updateStateByIndex = useSetAtom($updateStateByIndex);
    const closePanelsAfterIndex = useSetAtom($closePanelsAfterIndex);

    return useMemoRecord({
      history,
      $location,
      $loading,
      $panelsDefs,
      $panelStates,
      $activeIndex,
      navigate,
      navigateTo,
      openPanelFromIndex,
      updateStateByIndex,
      closePanelsAfterIndex,
      findPanelsLocation,
    });
  });

  const {
    Provider: PanelProvider,
    useMaybe: usePanelMaybe,
    useOrFail: usePanelOrFail,
  } = createHookProvider("Panel", ({ panelIndex }: { panelIndex: number }) => {
    const { $panelStates, $activeIndex, openPanelFromIndex, updateStateByIndex, closePanelsAfterIndex } =
      useFinderOrFail();

    const $currentPanel = useMemo(() => atom((get) => get($panelStates)[panelIndex]), [$panelStates, panelIndex]);

    const $currentPanelKey = useMemo(() => atom((get) => get($currentPanel).key), [$currentPanel]);

    const $isActive = useMemo(() => atom((get) => get($activeIndex) === panelIndex), [$activeIndex, panelIndex]);
    const $isLast = useMemo(
      () => atom((get) => get($panelStates).length - 1 === panelIndex),
      [$panelStates, panelIndex],
    );

    const $state = useMemo(() => atom((get) => get($currentPanel).state), [$currentPanel]);

    const $nextPanel = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          const nextIndex = panelIndex + 1;
          if (nextIndex >= panels.length) {
            return null;
          }
          const nextPanel = panels[nextIndex];
          return nextPanel;
        }),
      [$panelStates, panelIndex],
    );

    const openPanel = useCallback(
      (panel: TPanelState) => {
        return openPanelFromIndex(panelIndex, panel);
      },
      [openPanelFromIndex, panelIndex],
    );

    const updateState = useCallback(
      <K extends keyof PanelStates>(key: K, update: React.SetStateAction<Extract<TPanelState, { key: K }>>) => {
        return updateStateByIndex(
          panelIndex,
          key as string,
          update as React.SetStateAction<TPanelStateBase<PanelStates>>,
        );
      },
      [panelIndex, updateStateByIndex],
    );

    const closePanelsAfter = useCallback(() => {
      return closePanelsAfterIndex(panelIndex);
    }, [closePanelsAfterIndex, panelIndex]);

    return useMemoRecord({
      panelIndex,
      $isActive,
      $isLast,
      $currentPanel,
      $currentPanelKey,
      $state,
      $nextPanel,
      openPanel,
      updateState,
      closePanelsAfter,
    });
  });

  function usePanelState<K extends keyof PanelStates>(key: K): PanelStates[K] {
    const state = useAtomValue(usePanelOrFail().$currentPanel);
    if (state.key !== key) {
      throw new Error(`Panel key mismatch: expected ${String(key)}, got ${String(state.key)}`);
    }
    return state.state as PanelStates[K];
  }

  function usePanelLinkProps(
    panel: TPanelState,
    linkProps: React.ComponentPropsWithoutRef<"a">,
  ): React.ComponentPropsWithoutRef<"a"> {
    const { $panelStates, $panelsDefs, findPanelsLocation } = useFinderOrFail();
    const { openPanel, panelIndex } = usePanelOrFail();

    const $nextPanels = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          const base = panels.slice(0, panelIndex + 1);
          const nextPanels = [...base, panel];
          return nextPanels;
        }),
      [$panelStates, panel, panelIndex],
    );

    const $nextLocation = useMemo(
      () =>
        atom((get) => {
          return findPanelsLocation(get($panelsDefs), get($nextPanels));
        }),
      [$nextPanels, $panelsDefs, findPanelsLocation],
    );

    const nextLocation = useAtomValue($nextLocation);

    return useMemo(() => {
      return {
        href: nextLocation.pathname,
        onClick: (event) => {
          linkProps.onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (shouldProcessLinkClick(event, linkProps.target)) {
            event.preventDefault();
            openPanel(panel);
          }
        },
      };
    }, [linkProps, nextLocation.pathname, openPanel, panel]);
  }

  /**
   * Renders a panel with the correct isActive and resizeLocalStorageKey props
   */
  function Panel({ children, ...props }: FinderPanelProps): ReactNode {
    const { $isLast, $currentPanelKey } = usePanelOrFail();

    const isActive = useAtomValue($isLast);
    const currentPanelKey = useAtomValue($currentPanelKey);

    const nextProps: FinderPanelProps = {
      isActive,
      resizeLocalStorageKey: `finder-panel-size-${currentPanelKey as string}`,
      ...props,
    };

    return createElement(PanelBase, nextProps, children);
  }

  const FinderLink = forwardRef<HTMLAnchorElement, FinderLinkProps<PanelStates>>(function FinderLink(
    { toPanel, ...rest },
    ref,
  ): ReactNode {
    const props = usePanelLinkProps(toPanel, rest);

    return createElement("a", {
      ...rest,
      ...props,
      ref,
    });
  });

  return {
    FinderProvider,
    FinderLink,
    PanelProvider,
    useFinderMaybe,
    useFinderOrFail,
    usePanelMaybe,
    usePanelOrFail,
    usePanelState,
    Panel,
  };
}

function resolvePanelParents<PanelStates extends Record<string, any>>(
  panelsDefs: readonly TFinderPanelDefBase<PanelStates>[],
  panelState: TPanelStateBase<PanelStates>,
): readonly TPanelStateBase<PanelStates>[] {
  const def = panelsDefs.find((def) => def.key === panelState.key);
  if (!def) {
    throw new Error(`Panel definition not found for key ${String(panelState.key)}`);
  }
  if (!def.parentPanels) {
    return [];
  }
  const parentPanel = def.parentPanels(panelState.state);
  if (!parentPanel) {
    return [];
  }
  return [...resolvePanelParents(panelsDefs, parentPanel), parentPanel];
}

type LimitedMouseEvent = Pick<MouseEvent, "button" | "metaKey" | "altKey" | "ctrlKey" | "shiftKey">;

function isModifiedEvent(event: LimitedMouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function shouldProcessLinkClick(event: LimitedMouseEvent, target?: string) {
  return (
    event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // Ignore clicks with modifier keys
  );
}
