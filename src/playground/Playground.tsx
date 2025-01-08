import { createBrowserHistory } from "history";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, routes } from "../routes/routes";
import { Button } from "../shared/components/button/Button";

const history = createBrowserHistory();

export function Playground() {
  const [location, setLocation] = useState(() => history.location);

  useEffect(() => {
    return history.listen((e) => setLocation(e.location));
  }, []);

  const routeName = useMemo(() => {
    const path = location.pathname.replace("/", "");
    if (path in routes) {
      return path as Route;
    }
    return null;
  }, [location.pathname]);

  const route = routeName ? routes[routeName] : <p>Not found</p>;

  return (
    <div
      className="grid px-4 gap-4 py-4 min-h-screen"
      style={{
        gridTemplateColumns: "200px 1fr",
      }}
    >
      <nav className="flex flex-col gap-2">
        {Object.keys(routes).map((route) => (
          <NavItem key={route} route={route as Route} active={route === routeName} />
        ))}
      </nav>
      <div className="px-2 relative overflow-hidden">{route}</div>
    </div>
  );
}

function NavItem({ route, active }: { route: Route; active: boolean }) {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey) {
        return;
      }
      event.preventDefault();
      history.push(`/${route}`);
    },
    [route],
  );

  return (
    <Button
      size="md"
      variant={active ? "primary" : "secondary"}
      rounded="all"
      title={route}
      render={<a href={`/${route}`} onClick={onClick} />}
      className="uppercase font-bold tracking-wider"
    />
  );
}
