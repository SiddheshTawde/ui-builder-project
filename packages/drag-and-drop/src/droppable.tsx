"use client";

import React from "react";
import { FORMAT } from "./constants";
import { Callback } from "./types";

export interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  callback: (parsed: Callback) => void;
}

export function DropElement(props: DroppableProps) {
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const dragcontent = JSON.parse(event.dataTransfer.getData(FORMAT));
    props.callback(dragcontent);
  };

  return (
    <div className={props.className} style={props.style} onDragOver={handleDragOver} onDrop={handleDrop}>
      {props.children}
    </div>
  );
}
