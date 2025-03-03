import { History, parsePath, Path, To } from "history";
import { TNavigateOptions, TPanelsStateBase, TPanelStatesBase } from "./createFinderStore.types";

export function resolveNavigateParams<PanelStates extends TPanelStatesBase>(
  currentPanels: TPanelsStateBase<PanelStates>,
  options: TNavigateOptions<PanelStates>,
): TPanelsStateBase<PanelStates> {
  const { fromIndex: currentIndex = -1, panels } = options;
  if (typeof panels === "function") {
    return panels(currentPanels);
  }
  const base = currentPanels.slice(0, currentIndex + 1);
  if (panels === null) {
    return base;
  }
  const panelsArr = Array.isArray(panels) ? panels : [panels];
  return [...base, ...panelsArr];
}

export function toPath(history: History, pathTo: To): Path {
  return { pathname: "/", search: "", hash: "", ...parsePath(history.createHref(pathTo)) };
}
