import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateReadingTime(text: string, wordsPerMinute = 200) {
  const words = text.split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  return Math.ceil(minutes);
}