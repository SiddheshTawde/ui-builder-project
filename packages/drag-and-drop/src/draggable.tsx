"use client";

import React from "react";
import { FORMAT } from "./constants";
import { Effect, ElementType } from "./types";
import { generateUUID } from "./helpers";

export interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  effect: Effect;
  element: ElementType;
}

export function DragElement(props: DraggableProps) {
  const handleDragStarte: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.effectAllowed = props.effect;
    event.dataTransfer.setData(
      FORMAT,
      JSON.stringify({
        effect: props.effect,
        id: generateUUID(),
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
