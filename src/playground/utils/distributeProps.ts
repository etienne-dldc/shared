import { Merge } from "type-fest";

export function distributeProps<L1, L2>(l1: L1[], l2: L2[]): Merge<L1, L2>[]; // prettier-ignore
export function distributeProps<L1, L2, L3>(l1: L1[], l2: L2[], l3: L3[]): Merge<Merge<L1, L2>, L3>[]; // prettier-ignore
export function distributeProps<L1, L2, L3, L4>(l1: L1[], l2: L2[], l3: L3[], l4: L4[]): Merge<Merge<Merge<L1, L2>, L3>, L4>[]; // prettier-ignore
export function distributeProps<L1, L2, L3, L4, L5>(l1: L1[], l2: L2[], l3: L3[], l4: L4[], l5: L5[]): Merge<Merge<Merge<Merge<L1, L2>, L3>, L4>, L5>[]; // prettier-ignore
export function distributeProps(ls: any[][]): any[] {
  const result: any[] = [{}];
  for (const l of ls) {
    for (let i = 0; i < l.length; i++) {
      for (let j = 0; j < result.length; j++) {
        result.push({ ...result[j], ...l[i] });
      }
    }
  }
  return result;
}
