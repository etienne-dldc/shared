export function withoutUndefined<T extends Record<string, any>>(value: T): Partial<T> {
  const result: Record<string, any> = {};
  for (const key in value) {
    if (value[key] !== undefined) {
      result[key] = value[key];
    }
  }
  return result as Partial<T>;
}
