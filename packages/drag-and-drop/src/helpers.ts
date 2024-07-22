import { ElementType } from "./types";

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
