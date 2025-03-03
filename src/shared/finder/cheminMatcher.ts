import { IChemin } from "@dldc/chemin";
import { TMatchLocation, TPanelStatesBase, TToLocation } from "./createFinderStore.types";

export interface TCheminMatcher<PanelStates extends TPanelStatesBase, PanelContext> {
  matchLocation: TMatchLocation<PanelStates, PanelContext>;
  toLocation: TToLocation<PanelStates, PanelContext>;
}

export interface TCheminMatcherItem<
  PanelStates extends TPanelStatesBase,
  PanelContext,
  K extends keyof PanelStates,
  Params,
> {
  panel: K;
  path: IChemin<Params> | null;
  paramsToState: (params: Params) => PanelStates[K];
  searchToState: (search: URLSearchParams) => PanelStates[K];
  stateToParams: (state: PanelStates[K]) => Params;
  stateToSearch: (state: PanelStates[K]) => URLSearchParams | null;
  children: TCheminMatcherItem<PanelStates, PanelContext, keyof PanelStates, any>[];
}

export function cheminMatcherFactory<PanelStates extends TPanelStatesBase, PanelContext>() {
  return function cheminMatcher<K extends keyof PanelStates, Params>(
    key: K,
    path: IChemin<Params> | null,
    item: Omit<TCheminMatcherItem<PanelStates, PanelContext, K, Params>, "panel" | "path" | "children">,
    children: TCheminMatcherItem<PanelStates, PanelContext, keyof PanelStates, any>[] = [],
  ): TCheminMatcherItem<PanelStates, PanelContext, K, Params> {
    return {
      ...item,
      panel: key,
      path,
      children,
    };
  };
}

export function buildCheminMatcher<PanelStates extends TPanelStatesBase, PanelContext>(
  items: TCheminMatcherItem<PanelStates, PanelContext, keyof PanelStates, any>[],
): TCheminMatcher<PanelStates, PanelContext> {
  return {
    matchLocation(location, context) {
      throw new Error("Not implemented");
    },
    toLocation(panels, context) {
      throw new Error("Not implemented");
    },
  };
}
