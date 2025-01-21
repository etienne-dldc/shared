import { useCallback, useEffect, useState } from "react";
import { useLatestRef } from "./useLatestRef";

export function useSwitchDelay(delayMs: number): [value: boolean, activate: () => void] {
  const [value, setValue] = useState(false);
  const [effectKey, setEffectKey] = useState(0);
  const deleyRef = useLatestRef(delayMs);

  const activate = useCallback(() => {
    setValue(true);
    setEffectKey((p) => p + 1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(false);
    }, deleyRef.current);
    return () => clearTimeout(timeout);
  }, [deleyRef, effectKey]);

  return [value, activate];
}
