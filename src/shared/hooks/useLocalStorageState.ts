import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLatestRef } from "./useLatestRef";

export type TRestoreLocalStorageState<T> = (stored: unknown | null) => T;

export function useLocalStorageState<T>(
  key: string | null,
  defaultValue: TRestoreLocalStorageState<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const restoreRef = useLatestRef<() => T>(() => {
    const defaultValueFn =
      typeof defaultValue === "function" ? (defaultValue as TRestoreLocalStorageState<T>) : () => defaultValue;
    if (!key) {
      return defaultValueFn(null);
    }
    const storedValueRaw = localStorage.getItem(key);
    let storedValue: unknown | null = null;
    try {
      storedValue = storedValueRaw ? JSON.parse(storedValueRaw) : null;
    } catch {
      // Ignore JSON parse error
    }
    const restored = defaultValueFn(storedValue);
    const restoredRaw = JSON.stringify(restored);
    if (storedValueRaw !== restoredRaw) {
      localStorage.setItem(key, restoredRaw);
    }
    return restored;
  });

  // eslint-disable-next-line react-hooks/refs
  const [value, setValue] = useState<T>(() => restoreRef.current());

  // Restore from localStorage when key changes
  useEffect(() => {
    const restored = restoreRef.current();
    setValue(restored);
  }, [key, restoreRef]);

  // Update localStorage when value changes
  useEffect(() => {
    if (!key) {
      return;
    }
    const valueRaw = JSON.stringify(value);
    const storedValueRaw = localStorage.getItem(key);
    if (storedValueRaw !== valueRaw) {
      localStorage.setItem(key, valueRaw);
    }
  }, [key, value]);

  return [value, setValue];
}
