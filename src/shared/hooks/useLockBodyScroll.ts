import { useLayoutEffect } from "react";

export function useLockBodyScroll(enabled: boolean = true) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}
