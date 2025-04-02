export function pick<T extends string, Out>(value: T, options: Record<T, Out>): Out {
  return options[value];
}

export function pickBoolStrict<Out>(value: boolean, trueVal: Out, falseVal: Out): Out {
  return value === true ? trueVal : falseVal;
}

export function pickBool<Out>(value: boolean | undefined, trueVal: Out, falseVal: Out): Out | undefined {
  return value === true ? trueVal : value === false ? falseVal : undefined;
}
