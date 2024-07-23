"use client";

import React from "react";
import { remove } from "lodash";
import { motion, Reorder } from "framer-motion";
import { ComponentsMap } from "@repo/ui";

import { cn } from "./helpers";
import { Renderer } from "./render";
import { FORMAT } from "./constants";
import { Callback, ElementType } from "./types";
import { PropsEditor } from "./props-editor";

export interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  callback: (parsed: Callback) => void;
  elements: ElementType[];
  setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
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

    const dragcontent: Callback = JSON.parse(
      event.dataTransfer.getData(FORMAT),
    );

    props.callback(dragcontent);
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
      className={cn("dnd-flex dnd-items-stretch", [props.className])}
    >
      <Reorder.Group
        axis="y"
        values={props.elements}
        onReorder={props.setElements}
        className="dnd-flex dnd-flex-1 dnd-flex-col dnd-gap-2 dnd-p-2"
      >
        {props.elements.map((element) => (
          <Reorder.Item key={element.id} value={element}>
            <div
              className="dnd-group dnd-relative dnd-flex dnd-h-full dnd-w-full dnd-items-stretch"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setEdit(null);
                setEdit(element);
              }}
            >
              <div
                className={cn(
                  "dnd-flex-1 dnd-border-2 dnd-border-dashed dnd-border-transparent dnd-p-2 dnd-transition-all hover:dnd-border-transparent/40",
                  {
                    "dnd-border-indigo-400":
                      edit !== null && element.id === edit.id,
                  },
                )}
                style={{
                  borderColor:
                    element.id === edit?.id ? "rgb(129 140 248)" : "",
                }}
              >
                <Renderer name={element.title} />
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

      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: edit === null ? 0 : 300,
          padding: edit === null ? 0 : 8,
        }}
        className="dnd-h-full dnd-w-0 dnd-overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dnd-h-full dnd-rounded dnd-border dnd-p-2">
          <p className="dnd-mb-4 dnd-text-xl dnd-font-semibold">
            {edit?.title}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
