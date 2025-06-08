/* eslint-disable react-refresh/only-export-components */

import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

OverlayScrollbars.plugin(ClickScrollPlugin);

export {
  OverlayScrollbarsComponent as Scrollbars,
  useOverlayScrollbars as useScrollbars,
  type UseOverlayScrollbarsInitialization as ScrollbarsInitialization,
  type UseOverlayScrollbarsInstance as ScrollbarsInstance,
  type UseOverlayScrollbarsParams as ScrollbarsParams,
  type OverlayScrollbarsComponentProps as ScrollbarsProps,
  type OverlayScrollbarsComponentRef as ScrollbarsRef,
} from "overlayscrollbars-react";
