import { UnionToIntersection } from "type-fest";

export type BaseRecord = Record<string, any>;

export type TPropsSplitter<Out> = (props: BaseRecord) => Out;

export type TPropsSplittersResult<Props extends BaseRecord, Splitters extends Record<string, TPropsSplitter<any>>> = [
  { [K in keyof Splitters]: ReturnType<Splitters[K]> },
  Omit<Props, keyof UnionToIntersection<{ [K in keyof Splitters]: ReturnType<Splitters[K]> }[keyof Splitters]>>,
];

export function pipePropsSplitters<Props extends BaseRecord, Spliters extends Record<string, TPropsSplitter<any>>>(
  props: Props,
  splitters: Spliters,
): TPropsSplittersResult<Props, Spliters> {
  const result: Record<string, BaseRecord> = {};
  const rest: BaseRecord = { ...props };

  for (const key in splitters) {
    const splitter = splitters[key];
    result[key] = splitter(rest);
    // remove the properties that were split
    for (const prop in result[key]) {
      if (prop in rest) {
        delete rest[prop];
      }
    }
  }

  return [result, rest] as TPropsSplittersResult<Props, Spliters>;
}
