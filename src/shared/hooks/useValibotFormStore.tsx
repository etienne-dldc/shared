import * as Core from "@ariakit/core/form/form-store";
import type { PickRequired } from "@ariakit/core/utils/types";
import * as Ariakit from "@ariakit/react";
import { useCallback, useMemo } from "react";
import * as v from "valibot";

type TFormStorePropsBase<Data extends Core.FormStoreValues> = PickRequired<
  Ariakit.FormStoreProps<Data>,
  | "values"
  | "defaultValues"
  | "errors"
  | "defaultErrors"
  | "touched"
  | "defaultTouched"
>;

export type TUseValibotFormStoreOptions<
  StoreData extends Core.FormStoreValues,
  Output
> = TFormStorePropsBase<StoreData> & {
  schema: v.BaseSchema<StoreData, Output, v.BaseIssue<unknown>>;
};

export function useValibotFormStore<
  StoreData extends Core.FormStoreValues,
  Output
>({ schema, ...storeProps }: TUseValibotFormStoreOptions<StoreData, Output>) {
  const baseStore = Ariakit.useFormStore(storeProps);

  const { setError, useSubmit } = baseStore;

  const validate = useCallback(
    (values: unknown) => {
      const parsed = v.safeParse(schema, values);
      if (parsed.success) {
        return parsed;
      }
      const pathlessIssues: v.BaseIssue<unknown>[] = [];
      parsed.issues.forEach((issue) => {
        const path = v.getDotPath(issue);
        if (!path) {
          pathlessIssues.push(issue);
          return;
        }
        setError(path, issue.message);
      });
      if (pathlessIssues.length) {
        const [firstIssue, ...others] = pathlessIssues;
        throw new v.ValiError([firstIssue, ...others]);
      }
      return null;
    },
    [setError, schema]
  );

  baseStore.useValidate((state) => {
    validate(state.values);
  });

  const useSafeSubmit = useCallback(
    function useSafeSubmit(
      callback: (
        data: Output,
        state: Core.FormStoreState<StoreData>
      ) => void | Promise<void>
    ) {
      return useSubmit(async (state) => {
        const parsed = validate(state.values);
        if (parsed) {
          await callback(parsed.output, state);
        }
      });
    },
    [useSubmit, validate]
  );

  return useMemo(
    () => ({
      ...baseStore,
      useSafeSubmit,
    }),
    [baseStore, useSafeSubmit]
  );
}
