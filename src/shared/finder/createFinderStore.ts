import { To } from "history";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithDefault } from "jotai/utils";
import { nanoid } from "nanoid";
import { createElement, ForwardedRef, forwardRef, ReactNode, useCallback, useMemo, useState } from "react";
import { historyAtom } from "../atoms/history";
import { useAtomFromFunctionValue, useAtomFromValue } from "../hooks/useAtomFromValue";
import { useMemoEqual } from "../hooks/useMemoEqual";
import { useMemoRecord } from "../hooks/useMemoRecord";
import { createHookProvider } from "../utils/hookProvider";
import { shouldProcessLinkClick } from "../utils/linkEvents";
import { FinderLinkProps, ProviderPropsBase, TInternalState, TNavigateOptions } from "./createFinderStore.types";
import { resolveNavigateParams, toPath } from "./createFinderStore.utils";
import { FinderPanelProps, FinderPanel as PanelBase } from "./FinderPanel";

export function createFinderStore<Panel, PanelContext>() {
  const {
    Provider: FinderProvider,
    useMaybe: useFinderMaybe,
    useOrFail: useFinderOrFail,
  } = createHookProvider(
    "Finder",
    ({ matchLocation, toLocation, panelLoader, panelKey, context }: ProviderPropsBase<Panel, PanelContext>) => {
      const historyTools = useMemo(() => historyAtom<Partial<TInternalState<Panel>>>(), []);
      const { history, $effect: $historyEffect, $location } = historyTools;
      useAtom($historyEffect);

      const $matchLocationFn = useAtomFromFunctionValue(matchLocation);
      const $toLocationFn = useAtomFromFunctionValue(toLocation);
      const $panelLoaderFn = useAtomFromFunctionValue(panelLoader);
      const $panelKeyFn = useAtomFromFunctionValue(panelKey);
      const $context = useAtomFromValue(context);

      /**
       * Given a location, returns the panels
       */
      const $parseLocation = useMemo(
        () =>
          atom(null, (get, _set, pathTo: To) => {
            const matchLocation = get($matchLocationFn);
            const context = get($context);
            return matchLocation(toPath(history, pathTo), context);
          }),
        [$context, $matchLocationFn, history],
      );
      const parseLocation = useSetAtom($parseLocation);

      /**
       * Given panels, returns the location
       */
      const $serializeLocation = useMemo(
        () =>
          atom(null, (get, _set, panels: readonly Panel[]) => {
            const currentLocation = get($location);
            const toLocation = get($toLocationFn);
            const context = get($context);
            const location = toLocation(panels, currentLocation, context);
            return toPath(history, location);
          }),
        [$context, $location, $toLocationFn, history],
      );
      const serializeLocation = useSetAtom($serializeLocation);

      const routingId = useState(() => nanoid())[0];
      const initialPanels = useState(() => parseLocation(history.location))[0];

      const $panels = useMemo(
        () =>
          atom((get): readonly Panel[] => {
            const location = get($location);
            if (location.state && location.state.routingId && location.state.panels) {
              if (location.state.routingId === routingId) {
                return location.state.panels;
              }
            }
            return initialPanels;
          }),
        [$location, initialPanels, routingId],
      );

      interface TRequestedPanelStates {
        action: "push" | "replace" | "pulled";
        panels: readonly Panel[];
      }

      const $requestedPanelStates = useMemo(
        () =>
          atomWithDefault<TRequestedPanelStates | null>(() => {
            return { action: "pulled", panels: initialPanels };
          }),
        [initialPanels],
      );

      const $navigate = useMemo(
        () =>
          atom(null, (get, set, options: TNavigateOptions<Panel>) => {
            const currentPanels = get($panels);
            const nextPanels = resolveNavigateParams(currentPanels, options);
            const action = options.replace ? "replace" : "push";
            set($requestedPanelStates, { action, panels: nextPanels });
          }),
        [$panels, $requestedPanelStates],
      );

      const navigate = useSetAtom($navigate);
      const navigateTo = useCallback(
        (options: TNavigateOptions<Panel>) => {
          return navigate({ fromIndex: -1, ...options });
        },
        [navigate],
      );

      const refreshLocation = useCallback(
        ({ replace }: { replace?: boolean } = {}) => {
          navigateTo({ replace, panels: parseLocation(history.location) });
        },
        [history, navigateTo, parseLocation],
      );

      const $updatePanelByIndex = useMemo(
        () =>
          atom(null, (get, set, panelIndex: number, update: React.SetStateAction<Panel>) => {
            const panels = get($panels);
            const nextPanels = [...panels];
            const prevPanel = panels[panelIndex];
            nextPanels[panelIndex] = typeof update === "function" ? (update as (p: Panel) => Panel)(prevPanel) : update;
            set($navigate, {
              replace: true,
              panels: nextPanels,
              fromIndex: -1, // Replace all panels
            });
          }),
        [$navigate, $panels],
      );
      const updatePanelByIndex = useSetAtom($updatePanelByIndex);

      const $loading = useMemo(() => atom((get) => get($requestedPanelStates) !== null), [$requestedPanelStates]);

      // Run loader on panels and navigate when ready
      const $loaderEffect = useMemo(() => {
        return atomEffect((get, set) => {
          const panelLoader = get($panelLoaderFn);
          const context = get($context);
          const requestedPanels = get($requestedPanelStates);
          if (!requestedPanels) {
            return;
          }
          const { action, panels } = requestedPanels;
          const resolved = panels.map((panel) => {
            if (!panelLoader) {
              return { panel, loaded: true, load: null };
            }
            const loadResult = panelLoader(panel, context);
            return { panel, ...loadResult };
          });
          // Check if all panels are loaded
          const allLoaded = resolved.every(({ loaded }) => loaded);

          function navigateNow() {
            set($requestedPanelStates, null);
            if (action === "pulled") {
              return;
            }
            const location = serializeLocation(panels);
            if (action === "push") {
              history.push(location, { panels, routingId });
              return;
            }
            if (action === "replace") {
              history.replace(location, { panels, routingId });
              return;
            }
            action satisfies never;
          }

          if (allLoaded) {
            navigateNow();
            return;
          }

          const controller = new AbortController();
          (async () => {
            try {
              await Promise.all(
                resolved.map(async ({ loaded, load }) => {
                  if (loaded || !load) {
                    return;
                  }
                  controller.signal.throwIfAborted();
                  await load();
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
      }, [$context, $panelLoaderFn, $requestedPanelStates, history, routingId, serializeLocation]);
      useAtom($loaderEffect);

      return useMemoRecord({
        history,
        $location,
        $loading,
        $panels,
        $toLocationFn,
        $context,
        $panelKeyFn,
        navigate,
        navigateTo,
        updatePanelByIndex,
        refreshLocation,
        parseLocation,
        serializeLocation,
      });
    },
  );

  const {
    Provider: PanelProvider,
    useMaybe: usePanelMaybe,
    useOrFail: usePanelOrFail,
  } = createHookProvider("Panel", ({ panelIndex }: { panelIndex: number }) => {
    const { $panels: $panelStates, $panelKeyFn, updatePanelByIndex } = useFinderOrFail();

    const $panel = useMemo(() => atom((get) => get($panelStates)[panelIndex]), [$panelStates, panelIndex]);

    const $panelKey = useMemo(() => atom((get) => get($panelKeyFn)(get($panel))), [$panel, $panelKeyFn]);

    // Active panel if second to last or single panel
    const $isActive = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          return panels.length === 1 || panelIndex === panels.length - 2;
        }),
      [$panelStates, panelIndex],
    );

    const $isLast = useMemo(
      () => atom((get) => get($panelStates).length - 1 === panelIndex),
      [$panelStates, panelIndex],
    );

    const $nextPanel = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          if (panelIndex + 1 >= panels.length) {
            return null;
          }
          return panels[panelIndex + 1];
        }),
      [$panelStates, panelIndex],
    );

    const $nextPanels = useMemo(
      () =>
        atom((get) => {
          const panels = get($panelStates);
          if (panelIndex + 1 >= panels.length) {
            return [];
          }
          return panels.slice(panelIndex + 1);
        }),
      [$panelStates, panelIndex],
    );

    const updateState = useCallback(
      (update: React.SetStateAction<Panel>) => {
        return updatePanelByIndex(panelIndex, update);
      },
      [panelIndex, updatePanelByIndex],
    );

    return useMemoRecord({
      panelIndex,
      $isActive,
      $isLast,
      $panel,
      $panelKey,
      $nextPanel,
      $nextPanels,
      updateState,
    });
  });

  function usePanelLinkProps(
    options: TNavigateOptions<Panel>,
    linkProps: React.ComponentPropsWithoutRef<"a">,
  ): React.ComponentPropsWithoutRef<"a"> {
    const { $panels, $toLocationFn, $context, history, navigate, $location } = useFinderOrFail();
    const { panelIndex } = usePanelOrFail();

    const { panels, fromIndex = panelIndex, replace } = options;
    const localOptions = useMemo(() => ({ panels, fromIndex, replace }), [panels, fromIndex, replace]);

    const $nextLocation = useMemo(
      () =>
        atom((get) => {
          const nextPanels = resolveNavigateParams(get($panels), localOptions);
          return toPath(history, get($toLocationFn)(nextPanels, get($location), get($context)));
        }),
      [$context, $location, $panels, $toLocationFn, history, localOptions],
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
            navigate(localOptions);
          }
        },
      };
    }, [linkProps, localOptions, navigate, nextLocation.pathname]);
  }

  /**
   * Renders a panel with the correct isActive and resizeLocalStorageKey props
   */
  const Panel = forwardRef(function Panel(
    { children, ...props }: FinderPanelProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactNode {
    const { $isLast, $panelKey } = usePanelOrFail();

    const isActive = useAtomValue($isLast);
    const panelKey = useAtomValue($panelKey);

    const nextProps: FinderPanelProps = {
      isActive,
      resizeLocalStorageKey: `finder-panel-size-${panelKey as string}`,
      ...props,
    };

    return createElement(PanelBase, { ...nextProps, ref }, children);
  });

  const FinderLink = forwardRef<HTMLAnchorElement, FinderLinkProps<Panel>>(function FinderLink(
    { panels, replace, fromIndex, ...rest },
    ref,
  ): ReactNode {
    const panelsStable = useMemoEqual(panels);
    const props = usePanelLinkProps({ panels: panelsStable, replace, fromIndex }, rest);
    return createElement("a", { ...rest, ...props, ref });
  });

  return {
    FinderProvider,
    FinderLink,
    PanelProvider,
    useFinderMaybe,
    useFinderOrFail,
    usePanelMaybe,
    usePanelOrFail,
    Panel,
  };
}
