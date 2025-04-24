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

export function createSlug(title: string): string {
  return title
    .toLowerCase()                  // Convert to lowercase
    .trim()                         // Remove whitespace from both ends
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove non-word chars (except hyphens)
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Remove leading hyphens
    .replace(/-+$/, '');            // Remove trailing hyphens
}