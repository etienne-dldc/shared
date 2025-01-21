import { useCallback, useEffect, useRef, useState } from "react";
import { useLatestRef } from "./useLatestRef";

export type AsyncProcessState<Result> =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; result: Result }
  | { status: "error"; error: Error };

export type UseAsyncProcessReturn<Result, Params extends any[]> = [
  start: (...args: Params) => void,
  state: AsyncProcessState<Result>,
];

export interface TUseAsyncProcessOptions<Result> {
  onSuccess?: (data: { result: Result }) => void;
  onError?: (data: { error: Error }) => void;
  onFinally?: () => void;
}

export function useAsyncProcess<Result, Params extends any[]>(
  asyncFn: (...params: Params) => Promise<Result>,
  options: TUseAsyncProcessOptions<Result> = {},
): UseAsyncProcessReturn<Result, Params> {
  const asyncFnRef = useLatestRef(asyncFn);
  const optionsRef = useLatestRef(options);

  const [state, setState] = useState<AsyncProcessState<Result>>({ status: "idle" });
  const stateRef = useLatestRef(state);

  const cancelledRef = useRef(false);

  const start = useCallback(
    (...params: Params) => {
      const state = stateRef.current;
      if (state.status === "pending") {
        return;
      }
      setState({ status: "pending" });
      asyncFnRef
        .current(...params)
        .then((result) => {
          if (cancelledRef.current) {
            return;
          }
          setState({ status: "success", result });
          optionsRef.current.onSuccess?.({ result });
        })
        .catch((error) => {
          if (cancelledRef.current) {
            return;
          }
          setState({ status: "error", error });
          const onError = optionsRef.current.onError ?? (() => console.error(error));
          onError({ error });
        })
        .finally(() => {
          optionsRef.current.onFinally?.();
        });
    },
    [asyncFnRef, optionsRef, stateRef],
  );

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return [start, state];
}
