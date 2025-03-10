import { chemin, splitPathname, TChemin } from "@dldc/chemin";
import * as v from "valibot";

export interface TRouteLocation {
  readonly pathname: readonly string[];
  readonly search: Record<string, string>;
}

export interface TRouteMatch<Params> {
  readonly params: Params;
  readonly rest: TRouteLocation;
  readonly exact: boolean;
}

export type TRouteData<Params, Search extends v.ObjectEntries> = Params & v.InferObjectOutput<Search>;

export type TMaybeRouteMatch<Params> = TRouteMatch<Params> | null;

export interface TRoute<Params, Search extends v.ObjectEntries> {
  readonly pathname: TChemin<Params>;
  readonly searchProps: Search;
  readonly searchSchema: v.ObjectSchema<Search, undefined>;

  readonly serialize: (data: TRouteData<Params, Search>) => TRouteLocation;
  readonly match: (location: TRouteLocation) => TMaybeRouteMatch<TRouteData<Params, Search>>;
  readonly matchExact: (location: TRouteLocation) => TRouteData<Params, Search> | null;
}

export type TInferRouteData<R extends TRoute<any, any>> = NonNullable<ReturnType<R["matchExact"]>>;

export function route<Params, Search extends v.ObjectEntries>(
  pathname: TChemin<Params>,
  searchProps: Search = {} as any,
): TRoute<Params, Search> {
  const route: TRoute<Params, Search> = {
    pathname,
    searchProps,
    searchSchema: v.object(searchProps),
    match: (location) => match(route, location),
    matchExact: (location) => matchExact(route, location),
    serialize: (data) => serialize(route, data),
  };

  return route;
}

export function extendsRoute<BaseParams, BaseSearch extends v.ObjectEntries, Params, Search extends v.ObjectEntries>(
  base: TRoute<BaseParams, BaseSearch>,
  pathname: TChemin<Params>,
  searchProps: Search = {} as any,
): TRoute<BaseParams & Params, BaseSearch & Search> {
  return route(chemin(base.pathname, pathname) as TChemin<BaseParams & Params>, {
    ...base.searchProps,
    ...searchProps,
  });
}

export function serialize<Params, Search extends v.ObjectEntries>(
  route: TRoute<Params, Search>,
  data: TRouteData<Params, Search>,
): TRouteLocation {
  const pathname = route.pathname.serialize(data as any);
  const search: Record<string, string> = {} as any;
  for (const key in route.searchProps) {
    search[key] = String(data[key]) as any;
  }
  return {
    pathname: splitPathname(pathname),
    search,
  };
}

export function match<Params, Search extends v.ObjectEntries>(
  route: TRoute<Params, Search>,
  location: TRouteLocation,
): TMaybeRouteMatch<TRouteData<Params, Search>> {
  // First try to match the pathname
  const pathnameMatch = route.pathname.match(location.pathname);
  if (!pathnameMatch) {
    return null;
  }
  // Then make sure the search schema passes
  const search = v.safeParse(route.searchSchema, location.search);
  if (!search.success) {
    return null;
  }
  const searchRest = { ...location.search };
  for (const key of Object.keys(search.output)) {
    delete searchRest[key];
  }

  return {
    exact: pathnameMatch.exact,
    params: { ...pathnameMatch.params, ...search.output },
    rest: {
      pathname: pathnameMatch.rest,
      search: searchRest,
    },
  };
}

export function matchExact<Params, Search extends v.ObjectEntries>(
  route: TRoute<Params, Search>,
  location: TRouteLocation,
): TRouteData<Params, Search> | null {
  const matched = match(route, location);
  if (matched && matched.exact) {
    return matched.params;
  }
  return null;
}
