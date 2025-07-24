export function serializeSize(size: number): string {
  const base = size >= 0 ? Math.floor(size / 4) : Math.ceil(size / 4);
  const baseStr = base.toFixed(0);
  const remainder = size % 4;
  if (remainder === 0) {
    return baseStr;
  }
  if (remainder === 1 || remainder === -1) {
    return `${baseStr}_x`;
  }
  if (remainder === 2 || remainder === -2) {
    return `${baseStr}x`;
  }
  if (remainder === 3 || remainder === -3) {
    return `${baseStr}xx`;
  }
  throw new Error(`Invalid size: ${size}`);
}

export function range(min: number, max: number, moduloFilter: number): number[] {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i).filter((value) => value % moduloFilter === 0);
}

export function buildSizeTokenMap(
  values: number[],
  formatKey: (value: number) => string,
): Record<string, { value: string }> {
  return Object.fromEntries(values.map((value) => [formatKey(value), { value: `${value / 16}rem` }]));
}
