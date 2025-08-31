import React from "react";

/**
 * Given some JSX element, return a string representation of it.
 * printElement(<Button foo="bar" />) -> '<Button foo="bar" />'
 */
export function printElement(element: React.ReactElement): string {
  if (!element) {
    return "";
  }

  // Get the component name
  const componentName = getComponentName(element.type);

  // Extract props and children
  const props = element.props || {};
  const { children, ...otherProps } = props as any;

  // Format props
  const propsString = formatProps(otherProps);

  // Format children
  const childrenString = formatChildren(children);

  // Return the formatted element
  if (childrenString) {
    return `<${componentName}${propsString}>${childrenString}</${componentName}>`;
  } else {
    return `<${componentName}${propsString} />`;
  }
}

function getComponentName(type: any): string {
  if (typeof type === "string") {
    // HTML element
    return type;
  } else if (typeof type === "function") {
    // React component
    return type.displayName || type.name || "Component";
  } else if (type && typeof type === "object" && type.$$typeof === Symbol.for("react.forward_ref")) {
    // ForwardRef component - extract name from render function
    const renderFunction = type.render;
    if (renderFunction) {
      return renderFunction.displayName || renderFunction.name || "ForwardRef";
    }
    return "ForwardRef";
  } else {
    return "Unknown";
  }
}

function formatProps(props: Record<string, any>): string {
  if (!props || Object.keys(props).length === 0) {
    return "";
  }

  const propEntries = Object.entries(props);
  const propStrings = propEntries
    .map(([key, value]) => {
      if (value === true) {
        // Boolean prop set to true - use shortcut
        return key;
      } else if (value === false || value === null || value === undefined) {
        // Skip false, null, undefined props
        return null;
      } else if (typeof value === "string") {
        // String prop
        return `${key}="${value}"`;
      } else if (React.isValidElement(value)) {
        // JSX element as prop
        return `${key}={${printElement(value)}}`;
      } else {
        // Other values (numbers, objects, etc.)
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .filter(Boolean);

  return propStrings.length > 0 ? " " + propStrings.join(" ") : "";
}

function formatChildren(children: any): string {
  if (!children) {
    return "";
  }

  if (typeof children === "string") {
    return children;
  }

  if (React.isValidElement(children)) {
    return printElement(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else if (React.isValidElement(child)) {
          return printElement(child);
        } else {
          return String(child);
        }
      })
      .join("");
  }

  return String(children);
}
