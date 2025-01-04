import { ButtonsRoute } from "./buttons";
import { FinderRoute } from "./finder";
import { PaperRoute } from "./paper";

export type Route = keyof typeof routes;

export const routes = {
  paper: <PaperRoute />,
  buttons: <ButtonsRoute />,
  finder: <FinderRoute />,
} as const;
