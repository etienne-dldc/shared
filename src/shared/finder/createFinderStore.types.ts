import { Path, To } from "history";

export type { Path, To };

export interface TInternalState<Panel> {
  /**
   * List of panels
   */
  panels: readonly Panel[];
  /**
   * Unique Id to invalidate location state on reload
   */
  routingId: string;
}

export type TMatchLocation<Panel, PanelContext> = (location: Path, context: PanelContext) => readonly Panel[];

export type TToLocation<Panel, PanelContext> = (panels: readonly Panel[], location: Path, context: PanelContext) => To;

export interface TLoaderResult {
  loaded: boolean;
  load: () => Promise<void>;
}

export type TPanelLoader<Panel, PanelContext> = (panel: Panel, context: PanelContext) => TLoaderResult;

export type TPanelKey<Panel> = (panel: Panel) => string;

export interface ProviderPropsBase<Panel, PanelContext> {
  context: PanelContext;
  matchLocation: TMatchLocation<Panel, PanelContext>;
  toLocation: TToLocation<Panel, PanelContext>;
  panelKey: TPanelKey<Panel>;
  panelLoader?: TPanelLoader<Panel, PanelContext>;
}

export interface FinderLinkProps<Panel> extends React.ComponentPropsWithoutRef<"a">, TNavigateOptions<Panel> {}

export type TPanelsUpdateFn<Panel> = (panels: readonly Panel[]) => readonly Panel[];

export interface TNavigateOptions<Panel> {
  /**
   * Will keep the the panel and replace the panels after it
   * Set to -1 to replace all panels
   */
  fromIndex?: number;
  /**
   * Null will do slice from the currentIndex
   * If single panel or array, will replace the panels from the currentIndex
   * If function, will replace the panels (ignoring the currentIndex)
   */
  panels: null | Panel | readonly Panel[] | TPanelsUpdateFn<Panel>;
  /**
   * Do history.replace instead of history.push
   */
  replace?: boolean;
}
