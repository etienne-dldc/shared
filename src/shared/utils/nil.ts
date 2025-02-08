export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function isNotNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}

export function notNullAssertion<T>(value: T | null | undefined): T {
  if (isNil(value)) {
    throw new Error("Unexpected null or undefined value");
  }
  return value;
}

export const nna = notNullAssertion;
