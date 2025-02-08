import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const tw = String.raw;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pick<T extends string, Out>(value: T, options: Record<T, Out>): Out {
  return options[value];
}

export type TInteractiveState = "hover" | "focus" | "active";
