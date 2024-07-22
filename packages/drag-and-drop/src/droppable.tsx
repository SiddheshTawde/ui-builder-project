"use client";

import React from "react";
import { remove } from "lodash";
import { motion, Reorder } from "framer-motion";

import { cn } from "./helpers";
import { Renderer } from "./render";
import { FORMAT } from "./constants";
import { Callback, ElementType } from "./types";

export interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  callback: (parsed: Callback) => void;
  elements: ElementType[];
  setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
  defaults: Record<string, any>;
}

export function DropElement(props: DroppableProps) {
  const [edit, setEdit] = React.useState<ElementType | null>(null);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const dragcontent: Callback = JSON.parse(event.dataTransfer.getData(FORMAT));

    if (dragcontent.effect === "move") {
    } else {
      props.callback(dragcontent);
    }
  };

  const handleRemoveElement = (id: string) => {
    const updated = [...props.elements];

    remove(updated, (element) => element.id === id);
    setEdit(null);

    props.setElements(updated);
  };

  return (
    <div
      style={props.style}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => setEdit(null)}
      className={cn("flex items-stretch gap-4", [props.className])}
    >
      <Reorder.Group
        axis="y"
        values={props.elements}
        onReorder={props.setElements}
        className="flex-1 flex flex-col gap-2 p-2"
      >
        {props.elements.map((element) => (
          <Reorder.Item key={element.id} value={element}>
            <div
              className="relative group h-full w-full flex items-stretch"
              onClick={(event) => {
                event.stopPropagation();
                setEdit(element);
              }}
            >
              <div
                className={cn("p-2 flex-1 border border-transparent border-dashed transition-all", {
                  "border-2 border-indigo-400": element.id === edit?.id,
                })}
              >
                <Renderer name={element.title} props={props.defaults[element.title]} />
              </div>

              <div className="absolute top-2 right-4 invisible group-hover:visible flex items-start gap-x-4">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveElement(element.id || "");
                  }}
                  className="text-rose-500 text-xs font-semibold h-fit"
                >
                  Remove
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: edit === null ? 0 : 300, padding: edit === null ? 0 : 8 }}
        className="overflow-hidden h-full w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 h-full border rounded">
          <p className="text-xl font-semibold">{edit?.title}</p>

          <div>{edit ? JSON.stringify(props.defaults[edit.title]) : null}</div>
        </div>
      </motion.div>
    </div>
  );
}
