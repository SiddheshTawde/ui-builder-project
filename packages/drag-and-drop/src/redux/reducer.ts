import { DnDActions, DnDState } from "../types";
import { findElementById, insertNode, removeElementById } from "../utils";

export const reducer = (draft: DnDState, action: DnDActions): void => {
  switch (action.type) {
    case "UPDATE_ELEMENT": {
      const { elements } = action.payload;
      draft.elements = elements;
      break;
    }

    case "ADD_ELEMENT": {
      const { dropped, target } = action.payload;

      if (target === "dnd-root-canvas") {
        draft.elements.push(dropped);
      } else {
        const parent = findElementById(draft.elements, target);

        if (parent) {
          parent.children.push(dropped);
        }
      }
      break;
    }

    case "REMOVE_ELEMENT": {
      const { id } = action.payload;
      const updated = removeElementById(draft.elements, id);
      draft.elements = updated;
      break;
    }

    case "SELECT_ELEMENT": {
      const { id } = action.payload;
      draft.selected = id;
      break;
    }

    case "DRAGGING_ELEMENT": {
      const { element } = action.payload;
      draft.dragging = element;
      break;
    }

    case "INSERT_NODE": {
      const { dropped, edge, target } = action.payload;
      draft.elements = insertNode(draft.elements, target, dropped, edge);
      break;
    }

    default:
      break;
  }
};
