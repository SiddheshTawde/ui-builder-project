import React from "react";
import { v4 } from "uuid";
import { cn, insertElementAfter } from "../utils";
import { useDnD } from "../context";
import { DnDElementType, Edge } from "../types";

type Props = {
  index: number;
  title: string;
  reorder: DnDElementType[];
  handleReorder: React.Dispatch<React.SetStateAction<DnDElementType[]>>;
};

export default function EdgeDropIndicator(props: Props) {
  const { state, dispatch } = useDnD();

  const [hovered, setHovered] = React.useState("");
  const uuid = React.useMemo(() => v4(), []);

  const handleEdgeDrop = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();

    if (state.dragging) {
      const updated = insertElementAfter(props.reorder, index, state.dragging);
      props.handleReorder(updated);
      dispatch({
        type: "ADD_ELEMENT",
        payload: { dropped: state.dragging, target: event.currentTarget.id },
      });
    }

    setHovered("");
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovered(event.currentTarget.id);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovered("");
  };

  return (
    <div
      id={uuid}
      onDrop={(event) => handleEdgeDrop(event, props.index)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDragExit={handleDragLeave}
      className={cn("dnd-flex dnd-h-2 dnd-items-center dnd-justify-center", {
        "dnd-h-full dnd-w-2": props.title === "Row",
      })}
    >
      <div
        className={cn(
          "dnd-h-[2px] dnd-w-full dnd-rounded",
          {
            "dnd-bg-indigo-700": hovered === uuid,
          },
          {
            "dnd-h-full dnd-w-[2px]": props.title === "Row",
          },
        )}
      />
    </div>
  );
}
