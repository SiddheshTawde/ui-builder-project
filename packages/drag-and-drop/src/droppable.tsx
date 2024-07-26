"use client";

import React from "react";
import { remove } from "lodash";
import { Reorder } from "framer-motion";

import { cn } from "./helpers";
import { Renderer } from "./renderer";
import { FORMAT } from "./constants";
import { Callback, ElementType } from "./types";

export interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  elements: ElementType[];
  defaults: Record<string, any>;
  uicomponents: Record<string, any>;
  callback: (parsed: Callback) => void;
  setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
  selectedElement: ElementType | null;
  handleElementClick: React.Dispatch<React.SetStateAction<ElementType | null>>;
  elementProps: Record<string, any>;
  updateElementProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  axis: "x" | "y";
}

export function DropElement({ axis = "y", ...props }: DroppableProps) {
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const dragcontent: Callback = JSON.parse(
      event.dataTransfer.getData(FORMAT),
    );

    const updatedProps = { ...props.elementProps };
    updatedProps[dragcontent.id] = props.defaults[dragcontent.title];
    props.updateElementProps(updatedProps);

    props.callback(dragcontent);
  };

  const handleRemoveElement = (id: string) => {
    const updated = [...props.elements];

    remove(updated, (element) => element.id === id);

    props.setElements(updated);
  };

  return (
    <div
      style={props.style}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn("dnd-flex dnd-items-stretch", [props.className])}
    >
      <Reorder.Group
        axis={axis}
        values={props.elements}
        onReorder={props.setElements}
        className="dnd-flex dnd-flex-1 dnd-flex-col dnd-gap-2 dnd-p-2"
      >
        {props.elements.map((element) => (
          <Reorder.Item key={element.id} value={element}>
            <div
              key={element.id}
              className="dnd-group dnd-relative dnd-flex dnd-h-full dnd-w-full dnd-items-stretch"
              onClick={(event) => {
                event.stopPropagation();
                props.handleElementClick(element);
              }}
            >
              <div
                className={cn(
                  "dnd-flex-1 dnd-border-2 dnd-border-dashed dnd-border-transparent dnd-p-2 dnd-transition-all hover:dnd-border-transparent/40",
                  {
                    "!dnd-border-indigo-400":
                      element.id === props.selectedElement?.id,
                  },
                )}
              >
                <Renderer
                  name={element.title}
                  uicomponents={props.uicomponents}
                  props={props.elementProps[element.id || ""]}
                />
              </div>

              <div className="dnd-invisible dnd-absolute dnd-right-4 dnd-top-2 dnd-flex dnd-items-start dnd-gap-x-4 group-hover:dnd-visible">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveElement(element.id || "");
                  }}
                  className="dnd-h-fit dnd-text-xs dnd-font-semibold dnd-text-rose-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
