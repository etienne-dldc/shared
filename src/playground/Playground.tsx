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
import {
  ComponentPropsWithRef,
  Fragment,
  RefObject,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Merge } from "type-fest";
import { css } from "../../styled-system/css";
import { HStack, Paper, styled } from "../../styled-system/jsx";
import { Button } from "../shared/components/button/Button";
import { ButtonGroup } from "../shared/components/button/ButtonGroup";
import { ButtonLike } from "../shared/components/button/ButtonLike";
import { IconBox } from "../shared/components/common/IconBox";
import { LoadingBlock } from "../shared/components/common/LoadingBlock";
import { Scrollbars } from "../shared/components/common/Scrollbars";
import { EmptyState } from "../shared/components/layouts/EmptyState";
import { MenuItem } from "../shared/components/menu/MenuItem";
import { routes, TRoute, TRouteFolder, TRouteItem } from "./routes";

const history = createBrowserHistory();

const menuPaper = (
  <Paper
    bg="neutral.900"
    outline="none"
    w="[150px]"
    maxW="var(--popover-available-width)"
    maxH="var(--popover-available-height)"
    height="[300px]"
    position="relative"
  />
);

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
    <styled.div display="grid" gridTemplateRows="auto 1fr" gridTemplateColumns="100%" gap="4" p="4" minH="screen">
      <HStack gap="2">
        <ButtonGroup variant="solid" height="10" color="blue">
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
        </ButtonGroup>
        {routeMatch?.match && (
          <Fragment>
            <IconBox icon={<CaretRightIcon />} size="3" css={{ opacity: 0.6 }} />
            <ButtonLike height="10" color="blue" variant="subtle" startIcon={<SquaresFourIcon />}>
              {routeMatch?.match.name}
            </ButtonLike>
          </Fragment>
        )}
      </HStack>
      <styled.div position="relative">
        <Suspense fallback={<LoadingBlock />}>
          {routeMatch ? (
            <routeMatch.match.component />
          ) : (
            <EmptyState text="Route not found" icon={<CircleDashedIcon />} />
          )}
        </Suspense>
      </styled.div>
    </styled.div>
  );
}

type RouteMenuProps = Merge<
  ComponentPropsWithRef<"button">,
  {
    title?: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    items: TRouteItem[];
  }
>;

function RouteMenu({ items, title, icon, endIcon, ...buttonProps }: RouteMenuProps) {
  const topMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <Ariakit.MenuProvider>
      <Ariakit.MenuButton render={<Button startIcon={icon} endIcon={endIcon} />} {...buttonProps}>
        {title}
      </Ariakit.MenuButton>
      <Ariakit.Menu gutter={8} ref={topMenuRef} render={menuPaper} portal={true} unmountOnHide>
        <Scrollbars className={css({ inset: "0", position: "absolute", p: "1" })}>
          {items.map((item) => renderItem(item, topMenuRef))}
        </Scrollbars>
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
      <MenuItem render={<Ariakit.MenuButton />} startIcon={<FolderIcon />} endIcon={<CaretRightIcon />}>
        {item.name}
      </MenuItem>
      <Ariakit.Menu
        gutter={8}
        getAnchorRect={parentRef ? () => parentRef.current?.getBoundingClientRect() ?? null : undefined}
        render={menuPaper}
        ref={menuRef}
        portal={true}
      >
        <Scrollbars className={css({ inset: "0", position: "absolute", p: "1" })}>
          {item.routes.map((item) => renderItem(item, menuRef))}
        </Scrollbars>
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

  return (
    <MenuItem startIcon={<SquaresFourIcon />} render={<a href={item.path} onClick={onClick} />}>
      {item.name}
    </MenuItem>
  );
}

function renderItem(item: TRouteItem, parentRef?: RefObject<HTMLDivElement | null>) {
  const key = `${item.kind}-${item.name}`;
  if (item.kind === "route") {
    return <NavItem item={item} key={key} />;
  }
  return <NestedMenu item={item} parentRef={parentRef} key={key} />;
}
