export function notNil<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Value is nil");
  }
  return value;
}
