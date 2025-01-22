export function notNullAssertion<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Unexpected null or undefined value");
  }
  return value;
}

export const nna = notNullAssertion;
