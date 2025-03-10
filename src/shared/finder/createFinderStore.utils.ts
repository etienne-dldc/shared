import { History, parsePath, Path, To } from "history";
import { TNavigateOptions, TPanelsUpdateFn } from "./createFinderStore.types";

export function resolveNavigateParams<Panel>(
  currentPanels: readonly Panel[],
  options: TNavigateOptions<Panel>,
): readonly Panel[] {
  const { fromIndex: currentIndex = -1, panels } = options;
  if (typeof panels === "function") {
    return (panels as TPanelsUpdateFn<Panel>)(currentPanels);
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
