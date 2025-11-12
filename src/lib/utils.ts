// src/lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: Array<string | false | null | undefined>) {
  return twMerge(clsx(inputs))
}