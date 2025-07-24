import { createPropsContext } from "../../utils/propsContext";

export interface TDisabledContextProps {
  disabled: boolean;
}

export const DisabledContext = createPropsContext("Disabled", { disabled: false } as TDisabledContextProps);
