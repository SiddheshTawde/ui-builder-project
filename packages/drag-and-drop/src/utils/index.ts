import { remove } from "lodash";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DnDElementType, Edge } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findElementById(
  array: DnDElementType[],
  target: string,
): DnDElementType | undefined {
  var o;
  array.some(function iter(a) {
    if (a.id === target) {
      o = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  });
  return o;
}

export function removeElementById(array: DnDElementType[], id: string) {
  // Helper function to recursively traverse and remove object

  function traverseAndRemove(arr: DnDElementType[]) {
    // Use lodash's remove function to remove objects with the given id
    remove(arr, (item) => item.id === id);

    // Iterate through the array to find nested arrays and apply the function recursively
    arr.forEach((item) => {
      if (item.children && Array.isArray(item.children)) {
        traverseAndRemove(item.children);
      }
    });
  }

  // Start the recursive traversal
  traverseAndRemove(array);

  return array;
}

export const insertNode = (
  nodes: DnDElementType[],
  targetId: string,
  newNode: DnDElementType,
  position: Edge,
): DnDElementType[] => {
  return nodes.flatMap((node) => {
    if (node.id === targetId) {
      return position === "top" || position === "left"
        ? [newNode, node]
        : [node, newNode];
    } else if (node.children.length > 0) {
      return [
        {
          ...node,
          children: insertNode(node.children, targetId, newNode, position),
        },
      ];
    } else {
      return [node];
    }
  });
};

export function detectEdge(
  event: React.DragEvent,
  target: EventTarget & Element,
): Edge {
  const rect = target.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; // X position within the element
  const mouseY = event.clientY - rect.top; // Y position within the element

  const threshold = 24; // The threshold in pixels for detecting the edge

  let detectedEdge: Edge = null;

  if (mouseY < threshold) {
    detectedEdge = "top";
  } else if (mouseY > rect.height - threshold) {
    detectedEdge = "bottom";
  } else if (mouseX < threshold) {
    detectedEdge = "left";
  } else if (mouseX > rect.width - threshold) {
    detectedEdge = "right";
  }

  return detectedEdge;
}

export function updateChildrenById(
  elements: DnDElementType[],
  id: string,
  newChildren: DnDElementType[],
): DnDElementType[] {
  return elements.map((element) => {
    if (element.id === id) {
      return {
        ...element,
        children: newChildren,
      };
    } else if (element.children.length > 0) {
      return {
        ...element,
        children: updateChildrenById(element.children, id, newChildren),
      };
    }
    return element;
  });
}

export function insertElementAfter(
  elements: DnDElementType[],
  index: number,
  newItem: DnDElementType,
): DnDElementType[] {
  if (index === -1) {
    // Insert at the start of the array
    return [newItem, ...elements];
  } else if (index >= 0 && index < elements.length) {
    // Insert after the given index
    return [
      ...elements.slice(0, index + 1),
      newItem,
      ...elements.slice(index + 1),
    ];
  } else {
    // If the index is out of bounds, append the element at the end
    return [...elements, newItem];
  }
}
