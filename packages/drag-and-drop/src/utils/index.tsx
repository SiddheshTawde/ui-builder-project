import React, { Suspense } from "react";
import { remove } from "lodash";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DnDElementType } from "../types";

import * as UIElements from "@siddheshtawde/ui/src";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addElementToId(
  elements: DnDElementType[],
  element: DnDElementType,
  id: string,
  index: number,
) {
  // Helper function to recursively search for the element with the given id and add the new element to its children at the correct position
  const addToChildren = (elements: DnDElementType[]): DnDElementType[] => {
    return elements.map((el) => {
      if (el.id === id) {
        let updatedChildren;

        if (index === -2) {
          // Add element to the end of the children array
          updatedChildren = [...el.children, element];
        } else if (index === -1) {
          // Add element to the beginning of the children array
          updatedChildren = [element, ...el.children];
        } else {
          // Add element after the given index
          updatedChildren = [
            ...el.children.slice(0, index + 1),
            element,
            ...el.children.slice(index + 1),
          ];
        }

        return {
          ...el,
          children: updatedChildren,
        };
      }

      // If not found, continue searching in the children
      return {
        ...el,
        children: addToChildren(el.children),
      };
    });
  };

  // If id is "dnd-root-canvas", add the element to the root array
  if (id === "dnd-root-canvas") {
    if (index === -2) {
      return [...elements, element];
    } else if (index === -1) {
      return [element, ...elements];
    } else {
      return [
        ...elements.slice(0, index + 1),
        element,
        ...elements.slice(index + 1),
      ];
    }
  }

  // Otherwise, try to add the element to the specified id's children
  return addToChildren(elements);
}

export function removeElementById(elements: DnDElementType[], id: string) {
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
  traverseAndRemove(elements);

  return elements;
}

export function updateChildrenById(
  elements: DnDElementType[],
  children: DnDElementType[],
  id: string,
) {
  // Helper function to recursively search for the element with the given id and update its children
  const updateChildren = (elements: DnDElementType[]): DnDElementType[] => {
    return elements.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          children: children, // Update the children of the matched element
        };
      }

      // If not found, continue searching in the children
      return {
        ...el,
        children: updateChildren(el.children),
      };
    });
  };

  // Start the recursive search and update
  return updateChildren(elements);
}

export const loadComponent = (component: JSX.Element) => {
  return React.lazy(() => UIElements?.[component as never]);
};

type LoadComponentProps = {
  component: string;
  attributes: React.HTMLAttributes<keyof React.ReactHTML>;
};

export const DynamicComponentLoader = (props: LoadComponentProps) => {
  // @ts-expect-error - No index signature with a parameter of type 'string' was found on type 'typeof import(...)'.
  const Component = UIElements?.[props.component];

  return <Component {...props.attributes} />;
};
