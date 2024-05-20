import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatQuestionResponse = (response: string) => {
  const startIndex = response?.indexOf('Question:');
  const endIndex = response?.indexOf('Hint:');
  if (startIndex !== -1 && endIndex !== -1) {
    const question = response.substring(startIndex + 10, endIndex).trim();
    const hint = response.substring(endIndex + 5).trim();
    return { question, hint };
  }
  return { question: '', hint: '' };
};