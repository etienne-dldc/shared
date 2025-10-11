/* eslint-disable react-refresh/only-export-components */

import { createPropsContext } from "../../utils/propsContext";

export interface TDisabledContextProps {
  disabled: boolean;
}

export const DisabledContext = createPropsContext("Disabled", { disabled: false } as TDisabledContextProps);

export function useDisabled(localProps: Partial<TDisabledContextProps>) {
  const context = DisabledContext.useProps();
  return localProps.disabled ?? context.disabled;
}
