import { chemin, splitPathname, TChemin, TSimplify } from "@dldc/chemin";
import { safeSearchParams, TDtObjBase, TDtObjOutputStrict } from "@dldc/safe-search-params";
import { Simplify } from "type-fest";

export interface TRouteLocation {
  readonly pathname: readonly string[];
  readonly search: URLSearchParams;
}

export interface TRouteMatch<Params> {
  readonly params: Params;
  readonly rest: TRouteLocation;
  readonly exact: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TDefaultSearch = {};

export type TRouteData<Params, Search extends TDtObjBase = TDefaultSearch> = TSimplify<
  Params & TDtObjOutputStrict<Search>
>;

export type TMaybeRouteMatch<Params> = TRouteMatch<Params> | null;

export interface TRoute<Params, Search extends TDtObjBase = TDefaultSearch> {
  readonly pathname: TChemin<Params>;
  readonly search: Search;

  readonly serialize: (location: TRouteLocation, data: TRouteData<Params, Search>) => TRouteLocation;
  readonly match: (location: TRouteLocation) => TMaybeRouteMatch<TRouteData<Params, Search>>;
  readonly matchExact: (location: TRouteLocation) => TRouteData<Params, Search> | null;
}

export type TInferRouteData<R extends TRoute<any, any>> = NonNullable<ReturnType<R["matchExact"]>>;

export function route<Params, Search extends TDtObjBase = TDefaultSearch>(
  pathname: TChemin<Params>,
  search: Search = {} as any,
): TRoute<Params, Search> {
  const route: TRoute<Params, Search> = {
    pathname,
    search,
    match: (location) => match(route, location),
    matchExact: (location) => matchExact(route, location),
    serialize: (location, data) => serialize(route, location, data),
  };

  return route;
}

export function extendsRoute<
  BaseParams,
  BaseSearch extends TDtObjBase,
  Params,
  Search extends TDtObjBase = TDefaultSearch,
>(
  base: TRoute<BaseParams, BaseSearch>,
  pathname: TChemin<Params>,
  searchProps: Search = {} as any,
): TRoute<BaseParams & Params, BaseSearch & Search> {
  return route(chemin(base.pathname, pathname) as TChemin<BaseParams & Params>, {
    ...base.search,
    ...searchProps,
  });
}

export function serialize<Params, Search extends TDtObjBase = TDefaultSearch>(
  route: TRoute<Params, Search>,
  currentLocation: TRouteLocation,
  data: TRouteData<Params, Search>,
): TRouteLocation {
  const pathname = route.pathname.serialize(data as any);
  const isSamePath = currentLocation.pathname.join("/") === pathname;
  const search = safeSearchParams(isSamePath ? currentLocation.search : undefined);
  const updated = search.setObj(route.search, data as any);

  return {
    pathname: splitPathname(pathname),
    search: new URLSearchParams(updated.toString()),
  };
}

export function match<Params, Search extends TDtObjBase>(
  route: TRoute<Params, Search>,
  location: TRouteLocation,
): TMaybeRouteMatch<TRouteData<Params, Search>> {
  // First try to match the pathname
  const pathnameMatch = route.pathname.match(location.pathname);
  if (!pathnameMatch) {
    return null;
  }
  const search = safeSearchParams(location.search);
  const searchOutput = search.getObjStrict(route.search);
  if (searchOutput === null) {
    // If a type does not match or a required field is missing, the route does not match
    return null;
  }

  return {
    exact: pathnameMatch.exact,
    params: { ...pathnameMatch.params, ...searchOutput },
    rest: {
      pathname: pathnameMatch.rest,
      search: location.search,
    },
  };
}

export function matchExact<Params, Search extends TDtObjBase>(
  route: TRoute<Params, Search>,
  location: TRouteLocation,
): TRouteData<Params, Search> | null {
  const matched = match(route, location);
  if (matched && matched.exact) {
    return matched.params;
  }
  return null;
}

export function parseLocation(pathname: string, search?: string): TRouteLocation {
  return {
    pathname: splitPathname(pathname),
    search: new URLSearchParams(search),
  };
}

export function joinPathname(pathname: readonly string[]): string {
  return "/" + pathname.join("/");
}

export function createRouteMatcher<AllRoutes extends Record<string, TRoute<any, any>>>(allRoutes: AllRoutes) {
  type TRouteKey = keyof AllRoutes;

  return {
    allRoutes,
    matchFirst,
    matchFirstOrFail,
    matchExactFirst,
    matchExactFirstOrFail,
  };

  type TMatchFirstResult<Keys extends string> = {
    [K in Keys]: Simplify<{ key: K } & TRouteMatch<TInferRouteData<AllRoutes[K]>>>;
  }[Keys];

  function matchFirst<Keys extends readonly TRouteKey[]>(
    location: TRouteLocation,
    routes: Keys,
  ): TMatchFirstResult<Keys[number] & string> | null {
    for (const key of routes) {
      const route = allRoutes[key];
      const match = route.match(location);
      if (match) {
        return { key, ...match } as any;
      }
    }
    return null;
  }

  function matchFirstOrFail<Keys extends readonly TRouteKey[]>(
    location: TRouteLocation,
    routes: Keys,
  ): TMatchFirstResult<Keys[number] & string> {
    const match = matchFirst(location, routes);
    if (!match) {
      throw new Error("No route matched");
    }
    return match;
  }

  type TMatchFirstExactResult<Keys extends string> = {
    [K in Keys]: Simplify<{ key: K } & TInferRouteData<AllRoutes[K]>>;
  }[Keys];

  function matchExactFirst<Keys extends readonly TRouteKey[]>(
    location: TRouteLocation,
    routes: Keys,
  ): TMatchFirstExactResult<Keys[number] & string> | null {
    for (const key of routes) {
      const route = allRoutes[key];
      const match = route.matchExact(location);
      if (match) {
        return { key, ...match } as any;
      }
    }
    return null;
  }

  function matchExactFirstOrFail<Keys extends readonly TRouteKey[]>(
    location: TRouteLocation,
    routes: Keys,
  ): TMatchFirstExactResult<Keys[number] & string> {
    const match = matchExactFirst(location, routes);
    if (!match) {
      throw new Error("No route matched");
    }
    return match;
  }
}
