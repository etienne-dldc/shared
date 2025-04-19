import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { measureText } from "../utils/measureText";

export function useTextWidth(ref: RefObject<HTMLInputElement | null>, text: string, enabled: boolean): number | null {
  const [width, setWidth] = useState<number | null>(null);

  const prevConfigRef = useRef<{ content: string; styles: CSSStyleDeclaration } | null>(null);

  useLayoutEffect(() => {
    prevConfigRef.current = null;
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !ref.current) {
      prevConfigRef.current = null;
      return;
    }
    const input = ref.current;
    const prevConfig = prevConfigRef.current;

    const styles = window.getComputedStyle(input);

    if (prevConfig && prevConfig.content === text && textStylesEqual(prevConfig.styles, styles)) {
      return;
    }

    prevConfigRef.current = { content: text, styles };

    const result = measureText(text, styles);
    const paddings = [styles.paddingLeft, styles.paddingRight, styles.borderLeftWidth, styles.borderRightWidth]
      .map((n) => parseFloat(n))
      .filter((n) => !isNaN(n))
      .reduce((a, b) => a + b, 0);

    setWidth(result.width + paddings);
  }, [enabled, ref, text]);

  return width;
}

function textStylesEqual(left: CSSStyleDeclaration, right: CSSStyleDeclaration | undefined): boolean {
  if (!right) {
    return false;
  }
  return (
    left.fontFamily === right.fontFamily &&
    left.fontSize === right.fontSize &&
    left.fontStyle === right.fontStyle &&
    left.fontWeight === right.fontWeight &&
    left.letterSpacing === right.letterSpacing &&
    left.lineHeight === right.lineHeight &&
    left.textTransform === right.textTransform
  );
}
