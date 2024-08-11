import React from "react";
import {
  AddElement,
  DraggingElement,
  InsertNode,
  RemoveElement,
  SelectElement,
  UpdateElement,
} from "./actions";

export type DnDElementType = {
  id?: string;
  title: string;
  tag: keyof React.ReactHTML;
  attributes: React.HTMLAttributes<keyof React.ReactHTML>;
  children: DnDElementType[];
};

export type DnDState = {
  elements: DnDElementType[];
  selected: string | null;
  dragging: DnDElementType | null;
};

export type DnDActions =
  | UpdateElement
  | AddElement
  | RemoveElement
  | SelectElement
  | DraggingElement
  | InsertNode;

export type Edge = "top" | "bottom" | "left" | "right" | null;
