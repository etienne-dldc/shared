import { atom, useSetAtom } from "jotai";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

/**
 *
 * @param value Cannot be a function, see useAtomFromFunctionValue
 * @returns
 */
export function useAtomFromValue<T>(value: T) {
  useEffect(() => {
    if (import.meta.env.DEV && typeof value === "function") {
      console.error(
        "useAtomFromValue should not be used with a function as argument, wrap your function in a useMemo(() => ({ fn }), [])",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValuRef = useRef(value);
  const $atom = useMemo(() => atom(initialValuRef.current), []);
  const setAtom = useSetAtom($atom);
  useLayoutEffect(() => {
    setAtom(value);
  }, [setAtom, value]);

  const $readonlyAtom = useMemo(() => atom((get) => get($atom)), [$atom]);
  return $readonlyAtom;
}

/**
 * useAtomFromValue with a function does not work,
 * so this is a helper to wrap the function in an object.
 * @param value
 * @returns
 */
export function useAtomFromFunctionValue<T>(value: T) {
  const $atom = useAtomFromValue(useMemo(() => ({ fn: value }), [value]));
  return useMemo(() => atom((get) => get($atom).fn), [$atom]);
}
