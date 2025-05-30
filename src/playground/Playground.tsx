import * as Ariakit from "@ariakit/react";
import {
  CaretDownIcon,
  CaretRightIcon,
  CircleDashedIcon,
  FolderIcon,
  ListIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { createBrowserHistory } from "history";
import { RefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { LoadingBlock } from "../shared/components/common/LoadingBlock";
import { Paper } from "../shared/components/common/Paper";
import { DesignContext } from "../shared/components/core/DesignContext";
import { EmptyState } from "../shared/components/layouts/EmptyState";
import { MenuItem } from "../shared/components/menu/MenuItem";
import { cn } from "../shared/styles/utils";
import { routes, TRoute, TRouteFolder, TRouteItem } from "./routes";

const history = createBrowserHistory();

export function Playground() {
  const [location, setLocation] = useState(() => history.location);

  useEffect(() => {
    return history.listen((e) => setLocation(e.location));
  }, []);

  const routeMatch = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) {
      return null;
    }
    const parentsParts = parts.slice(0, -1);
    const routePart = parts[parts.length - 1];
    let current = routes;
    const parents: TRouteFolder[] = [];
    for (const part of parentsParts) {
      const match = current.find((r) => r.kind === "folder" && r.name === part);
      if (!match || match.kind !== "folder") {
        return null;
      }
      current = match.routes;
      parents.push(match);
    }
    const match = current.find((r) => r.kind === "route" && r.name === routePart);
    if (!match || match.kind !== "route") {
      return null;
    }
    return { match, parents };
  }, [location.pathname]);

  return (
    <div className="grid min-h-screen gap-4 p-4" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="flex flex-row">
        <ButtonGroup primary>
          <RouteMenu items={routes} icon={<ListIcon />} />
          {routeMatch?.parents.map((parent) => {
            return (
              <RouteMenu
                key={parent.name}
                items={parent.routes}
                title={parent.name}
                icon={<FolderIcon />}
                endIcon={<CaretDownIcon />}
              />
            );
          })}
          {routeMatch?.match && <ButtonLike title={routeMatch?.match.name} icon={<SquaresFourIcon />} />}
        </ButtonGroup>
      </div>
      <div className="relative">
        <Suspense fallback={<LoadingBlock />}>
          {routeMatch ? (
            <routeMatch.match.component />
          ) : (
            <EmptyState text="Route not found" icon={<CircleDashedIcon />} />
          )}
        </Suspense>
      </div>
    </div>
  );
}

interface RouteMenuProps {
  title?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  items: TRouteItem[];
}

function RouteMenu({ items, title, icon, endIcon }: RouteMenuProps) {
  const topMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <Ariakit.MenuProvider>
      <Ariakit.MenuButton render={<Button title={title} icon={icon} endIcon={endIcon} />} />
      <Ariakit.Menu
        gutter={8}
        ref={topMenuRef}
        render={<Paper />}
        className={cn("p-2 outline-hidden h-[300px] min-w-36")}
        portal={true}
        unmountOnHide
      >
        <DesignContext.Define rounded="all">{items.map((item) => renderItem(item, topMenuRef))}</DesignContext.Define>
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
}

interface NestedMenuProps {
  item: TRouteFolder;
  parentRef?: RefObject<HTMLDivElement | null>;
}

function NestedMenu({ item, parentRef }: NestedMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <Ariakit.MenuProvider>
      <MenuItem render={<Ariakit.MenuButton />} title={item.name} icon={<FolderIcon />} endIcon={<CaretRightIcon />} />
      <Ariakit.Menu
        gutter={8}
        getAnchorRect={parentRef ? () => parentRef.current?.getBoundingClientRect() ?? null : undefined}
        render={<Paper />}
        className={cn("p-2 outline-hidden h-[300px] min-w-36")}
        ref={menuRef}
      >
        {item.routes.map((item) => renderItem(item, menuRef))}
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
}

interface NavItemProps {
  item: TRoute;
}

function NavItem({ item }: NavItemProps) {
  const menuStore = Ariakit.useMenuContext();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey) {
        return;
      }
      event.preventDefault();
      history.push(item.path);
      menuStore?.hideAll();
    },
    [item.path, menuStore],
  );

  return <MenuItem title={item.name} icon={<SquaresFourIcon />} render={<a href={item.path} onClick={onClick} />} />;
}

function renderItem(item: TRouteItem, parentRef?: RefObject<HTMLDivElement | null>) {
  const key = `${item.kind}-${item.name}`;
  if (item.kind === "route") {
    return <NavItem item={item} key={key} />;
  }
  return <NestedMenu item={item} parentRef={parentRef} key={key} />;
}
