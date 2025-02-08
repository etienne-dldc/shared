import {
  CSSProperties,
  ReactElement,
  Ref,
  RefAttributes,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";

export type TDynamicColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

const DynamicColorContext = createContext<TDynamicColor>("blue");

interface DynamicColorProviderProps {
  color?: TDynamicColor;
  force?: boolean; // Force the color to be applied, usefull for portal
  children: React.ReactElement; // children must be a single element with a ref pointing to an html element
}

export const DynamicColorProvider = forwardRef<HTMLElement, DynamicColorProviderProps>(function DynamicColorProvider(
  { color, force, children },
  ref,
) {
  const localRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergeRefs(ref, localRef, getRefProperty(children));

  const childrenWithRef = useMemo(() => {
    const renderProps = { ...children.props, ref: mergedRef };
    return cloneElement(children, renderProps);
  }, [children, mergedRef]);

  const parentColor = useContext(DynamicColorContext);
  const currentColor = color ?? parentColor;
  const shouldUpdateContext = currentColor !== parentColor;
  const shouldSetColor = shouldUpdateContext || force;

  useLayoutEffect(() => {
    if (!shouldSetColor) return;
    const elem = localRef.current;
    if (!elem) return;
    const colorsVariables = dynamicColors(currentColor);
    Object.entries(colorsVariables).forEach(([key, value]) => {
      elem.style.setProperty(key, value);
    });
    return () => {
      Object.keys(colorsVariables).forEach((key) => {
        elem.style.removeProperty(key);
      });
    };
  }, [currentColor, shouldSetColor]);

  if (currentColor !== parentColor) {
    return <DynamicColorContext.Provider value={currentColor}>{childrenWithRef}</DynamicColorContext.Provider>;
  }

  return childrenWithRef;
});

function getRefProperty(element: unknown) {
  if (!isValidElementWithRef(element)) return null;
  return element.ref as Ref<any> | undefined;
}

function isValidElementWithRef<P>(element: unknown): element is ReactElement<P> & RefAttributes<any> {
  if (!element) return false;
  if (!isValidElement(element)) return false;
  if (!("ref" in element)) return false;
  return true;
}

function dynamicColors(color: TDynamicColor): CSSProperties {
  return {
    "--color-dynamic-50": `var(--color-${color}-50)`,
    "--color-dynamic-100": `var(--color-${color}-100)`,
    "--color-dynamic-200": `var(--color-${color}-200)`,
    "--color-dynamic-300": `var(--color-${color}-300)`,
    "--color-dynamic-400": `var(--color-${color}-400)`,
    "--color-dynamic-500": `var(--color-${color}-500)`,
    "--color-dynamic-600": `var(--color-${color}-600)`,
    "--color-dynamic-700": `var(--color-${color}-700)`,
    "--color-dynamic-800": `var(--color-${color}-800)`,
    "--color-dynamic-900": `var(--color-${color}-900)`,
    "--color-dynamic-950": `var(--color-${color}-950)`,
  } as CSSProperties;
}
