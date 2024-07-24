"use client";

import React from "react";
import { FORMAT } from "./constants";
import { ElementType } from "./types";
import { v4 as uuidv4 } from "uuid";

export interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  element: ElementType;
}

export function DragElement(props: DraggableProps) {
  const handleDragStarte: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.setData(
      FORMAT,
      JSON.stringify({
        id: uuidv4(),
        title: props.element.title,
      }),
    );
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStarte}
      className={props.className}
      style={props.style}
      {...props}
    >
      {props.children}
    </div>
  );
}
