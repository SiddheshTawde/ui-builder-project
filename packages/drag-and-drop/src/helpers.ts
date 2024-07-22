import { ElementType } from "./types";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomId(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function useInsertElement(array: ElementType[], item: ElementType, toIndex: number): ElementType[] {
  const newArray = [...array];
  newArray.splice(toIndex, 0, item);
  return newArray;
}

export function useRemoveElement(array: ElementType[], fromIndex: number): [ElementType[], ElementType] {
  const newArray = [...array];
  const [removedItem] = newArray.splice(fromIndex, 1);
  return [newArray, removedItem];
}

export function useMoveElement(array: ElementType[], fromIndex: number, toIndex: number): ElementType[] {
  const [removedArray, removedItem] = useRemoveElement(array, fromIndex);
  return useInsertElement(removedArray, removedItem, toIndex);
}
