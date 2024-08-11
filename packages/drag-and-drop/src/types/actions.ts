import { DnDElementType, Edge } from ".";

export type UpdateElement = {
  type: "UPDATE_ELEMENT";
  payload: { elements: DnDElementType[] };
};

export type AddElement = {
  type: "ADD_ELEMENT";
  payload: { dropped: DnDElementType; target: string };
};

export type RemoveElement = {
  type: "REMOVE_ELEMENT";
  payload: { id: string };
};

export type SelectElement = {
  type: "SELECT_ELEMENT";
  payload: { id: string };
};

export type DraggingElement = {
  type: "DRAGGING_ELEMENT";
  payload: { element: DnDElementType | null };
};

export type InsertNode = {
  type: "INSERT_NODE";
  payload: { dropped: DnDElementType; edge: Edge; target: string };
};
