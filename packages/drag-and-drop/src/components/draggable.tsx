import React from "react";
import { v4 as uuid } from "uuid";

import { useDnD } from "../context";
import { DnDElementType } from "../types";

type Props = {
  dragdata: DnDElementType;
  className?: string;
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
};

export function Draggable({ as: Element = "li", ...props }: Props) {
  const { state, setState } = useDnD();
  const handleDragStart = (event: React.DragEvent) => {
    event.stopPropagation();

    setState({ ...state, dragging: { id: uuid(), ...props.dragdata } });
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.stopPropagation();

    setState({ ...state, dragging: null });
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
