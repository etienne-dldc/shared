import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const tw = String.raw;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TInteractiveState = "hover" | "focus";
