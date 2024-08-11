import React from "react";
import { v4 as uuid } from "uuid";
import { DnDElementType } from "../types";
import { useDnD } from "../context";

type Props = {
  dragdata: DnDElementType;
  className?: string;
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
};

export function Draggable({ as: Element = "li", ...props }: Props) {
  const { dispatch } = useDnD();
  const handleDragStart = (event: React.DragEvent) => {
    event.stopPropagation();

    dispatch({
      type: "DRAGGING_ELEMENT",
      payload: { element: { id: uuid(), ...props.dragdata } },
    });
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.stopPropagation();
    dispatch({
      type: "DRAGGING_ELEMENT",
      payload: { element: null },
    });
  };

  return (
    <Element
      draggable
      style={props.styles}
      className={props.className}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      {props.children}
    </Element>
  );
}
