import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (string: string) =>
  string.length > 1
    ? string[0].toUpperCase() + string.slice(1)
    : string[0].toUpperCase();
