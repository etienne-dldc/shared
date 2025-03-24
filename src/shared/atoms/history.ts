import { createBrowserHistory, Hash, Key, Pathname, Search } from "history";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";

export interface TLocation<TState> {
  pathname: Pathname;
  search: Search;
  hash: Hash;
  state?: TState;
  key: Key;
}

export function historyAtom<LocationState>() {
  const history = createBrowserHistory();

  const $locationInternal = atom(history.location);

  const $location = atom((get): TLocation<LocationState> => {
    return get($locationInternal) as TLocation<LocationState>;
  });

  const $effect = atomEffect((_get, set) => {
    set($locationInternal, history.location);
    const unlisten = history.listen((event) => {
      set($locationInternal, event.location);
    });
    return unlisten;
  });

  return {
    history,
    $location,
    $effect,
  };
}
