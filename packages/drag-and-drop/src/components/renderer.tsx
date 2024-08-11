import React from "react";
import { DnDElementType, Edge } from "../types";
import { useDnD } from "../context";
import { cn, detectEdge, updateChildrenById } from "../utils";
import { Reorder } from "framer-motion";
import { isEqual } from "lodash";

type Props = {
  hovered: string;
  element: DnDElementType;
  handleDrop: (e: React.DragEvent, edge: Edge) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseOver: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
};

const Renderer = (props: Props) => {
  const { state, dispatch } = useDnD();
  const [edge, setEdge] = React.useState<Edge>(null);
  const [reorder, handleReorder] = React.useState(props.element.children);

  React.useEffect(() => {
    if (!isEqual(props.element.children, reorder)) {
      handleReorder(props.element.children);
    }
  }, [props.element.children]);

  React.useEffect(() => {
    const updated = updateChildrenById(
      state.elements,
      props.element.id || "",
      reorder,
    );

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { elements: updated },
    });
  }, [reorder]);

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ELEMENT",
      payload: { id: props.element.id || "" },
    });
  };
  const selectElement = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: "SELECT_ELEMENT",
      payload: { id: props.element.id || "" },
    });
  };

  const handleLocalDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    props.handleDrop(event, edge);
    setEdge(null);
  };
  const handleLocalDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    props.handleDragOver(event);

    setEdge(detectEdge(event, event.currentTarget));
  };
  const handleDragEnd = () => {
    setEdge(null);
  };

  return (
    <Reorder.Item
      id={props.element.id}
      as={props.element.tag}
      value={props.element}
      onDrop={handleLocalDrop}
      onDragOver={handleLocalDragOver}
      onDragEnd={handleDragEnd}
      onDragLeave={handleDragEnd}
      onDragExit={handleDragEnd}
      onMouseEnter={props.handleMouseEnter}
      onMouseOver={props.handleMouseOver}
      onMouseLeave={props.handleMouseLeave}
      onClick={selectElement}
      style={props.element.attributes?.style}
      className={cn(
        "dnd-relative dnd-gap-2 dnd-rounded dnd-border-2 dnd-border-dashed dnd-p-2 dnd-pt-8",
        { "dnd-border-transparent/60": props.hovered === props.element.id },
        { "dnd-border-indigo-500": state.selected === props.element.id },
        {
          "dnd-border-t-8 dnd-border-t-indigo-500":
            props.element.title !== "Column" && edge === "top",
        },
        {
          "dnd-border-b-8 dnd-border-b-indigo-500":
            props.element.title !== "Column" && edge === "bottom",
        },
        {
          "dnd-border-l-8 dnd-border-l-indigo-500":
            props.element.title === "Column" && edge === "left",
        },
        {
          "dnd-border-r-8 dnd-border-r-indigo-500":
            props.element.title === "Column" && edge === "right",
        },
      )}
    >
      <div className="dnd-absolute dnd-left-0 dnd-top-0 dnd-flex dnd-w-full dnd-items-center dnd-justify-between dnd-px-2">
        <span className="dnd-text-sm dnd-text-neutral-400">
          {props.element.title}
        </span>

        {props.hovered !== props.element.id ? null : (
          <button
            className="dnd-h-fit dnd-w-fit dnd-text-xs dnd-text-red-500"
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>
      {reorder.length === 0 ? null : (
        <Reorder.Group
          axis={props.element.title === "Row" ? "x" : "y"}
          values={reorder}
          onReorder={handleReorder}
          style={props.element.attributes?.style}
          className="dnd-gap-2"
        >
          {reorder.map((child) => (
            <Renderer
              key={child.id}
              element={child}
              handleDrop={props.handleDrop}
              handleDragOver={props.handleDragOver}
              handleDragEnd={props.handleDragEnd}
              handleMouseEnter={props.handleMouseEnter}
              handleMouseOver={props.handleMouseOver}
              handleMouseLeave={props.handleMouseLeave}
              hovered={props.hovered}
            />
          ))}
        </Reorder.Group>
      )}
    </Reorder.Item>
  );
};

export default Renderer;
