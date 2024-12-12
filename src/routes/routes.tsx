import { ButtonsRoute } from "./buttons";
import { PaperRoute } from "./paper";

export type Route = keyof typeof routes;

export const routes = {
  paper: <PaperRoute />,
  buttons: <ButtonsRoute />,
} as const;
