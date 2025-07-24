import { lazy } from "react";

const modules = import.meta.glob("../shared/**/*.playground.{ts,tsx}");

export interface TRouteFolder {
  kind: "folder";
  name: string;
  routes: TRouteItem[];
}

export interface TRoute {
  kind: "route";
  name: string;
  path: string;
  module: () => Promise<{ default: React.ComponentType }>;
  component: React.ComponentType;
}

export type TRouteItem = TRoute | TRouteFolder;

const rootRoute: TRouteFolder = {
  kind: "folder",
  name: "root",
  routes: [],
};

Object.entries(modules).forEach(([rawPath, module]) => {
  const path = rawPath.replace("../shared/", "").replace(/\.playground\.(ts|tsx)$/, "");

  const parts = path.split("/");
  const parent = resolveRouteFolder(parts.slice(0, -1));
  parent.routes.push({
    kind: "route",
    name: parts[parts.length - 1],
    module: module as any,
    path: `/${path}`,
    component: lazy(module as any),
  });
});

function resolveRouteFolder(path: string[]): TRouteFolder {
  let current = rootRoute;
  for (const part of path) {
    let folder = current.routes.find((r) => r.kind === "folder" && r.name === part);
    if (!folder || folder.kind !== "folder") {
      folder = { kind: "folder", name: part, routes: [] };
      current.routes.push(folder);
    }
    current = folder;
  }
  return current;
}

function sortRoutes(items: TRouteItem[]): void {
  items.sort((a, b) => {
    if (a.kind === b.kind) {
      return a.name.localeCompare(b.name);
    }
    return a.kind === "folder" ? -1 : 1;
  });
  for (const item of items) {
    if (item.kind === "folder") {
      sortRoutes(item.routes);
    }
  }
}

sortRoutes(rootRoute.routes);

export const routes = rootRoute.routes;
