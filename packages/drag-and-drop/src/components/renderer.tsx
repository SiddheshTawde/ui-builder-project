import React from "react";
import { DnDElementType } from "../types";
import { useDnD } from "../context";
import { cn, DynamicComponentLoader, removeElementById } from "../utils";
import { Reorder } from "framer-motion";
import { isEqual } from "lodash";
import { EdgeDropIndicator } from "./edge-drop-indicator";

type Props = {
  hovered: string;
  element: DnDElementType;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseOver: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
};

export const Renderer = (props: Props) => {
  const { state, setState } = useDnD();
  const [reorder, handleReorder] = React.useState<DnDElementType[]>([]);

  React.useEffect(() => {
    if (!isEqual(reorder, props.element.children)) {
      handleReorder(props.element.children);
    }
  }, [props.element.children]);

  const selectElement = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setState({ ...state, selected: props.element.id || "" });
  };

  const handleRemove = () => {
    const updated = removeElementById(state.elements, props.element.id || "");
    setState({ ...state, elements: updated });
  };

  if (props.element.tag === "element") {
    return (
      <Reorder.Item
        id={props.element.id}
        value={props.element}
        onMouseEnter={props.handleMouseEnter}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
        onClick={selectElement}
        style={props.element.attributes?.style}
        className={cn(
          "dnd-relative dnd-rounded dnd-border-2 dnd-border-dashed dnd-border-transparent",
          { "dnd-px-2": props.element.title !== "Row" },
          { "dnd-pb-2": props.element.title === "Row" },
          { "!dnd-border-indigo-500": state.selected === props.element.id },
          { "dnd-border-transparent/60": props.hovered === props.element.id },
        )}
      >
        {props.hovered !== props.element.id ? null : (
          <div className="dnd-absolute dnd-right-0 dnd-top-0 dnd-flex dnd-w-full dnd-items-center dnd-justify-end dnd-px-2">
            <button
              className="dnd-h-fit dnd-w-fit dnd-text-xs dnd-text-red-500"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        )}
        <DynamicComponentLoader component={props.element.title} />
      </Reorder.Item>
    );
  }

  return (
    <Reorder.Item
      id={props.element.id}
      as={props.element.tag}
      value={props.element}
      onDrop={props.handleDrop}
      onDragOver={props.handleDragOver}
      onMouseEnter={props.handleMouseEnter}
      onMouseOver={props.handleMouseOver}
      onMouseLeave={props.handleMouseLeave}
      onClick={selectElement}
      style={props.element.attributes?.style}
      className={cn(
        "dnd-relative dnd-rounded dnd-border-2 dnd-border-dashed dnd-pt-6",
        { "dnd-px-2": props.element.title !== "Row" },
        { "dnd-pb-2": props.element.title === "Row" },
        { "!dnd-border-indigo-500": state.selected === props.element.id },
        { "dnd-border-transparent/60": props.hovered === props.element.id },
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
        >
          <EdgeDropIndicator
            index={-1}
            target={props.element.id || ""}
            reorder={reorder}
            handleReorder={handleReorder}
            title={props.element.title}
          />
          {reorder.map((child, index) => (
            <React.Fragment key={child.id}>
              <Renderer
                element={child}
                handleDrop={props.handleDrop}
                handleDragOver={props.handleDragOver}
                handleDragEnd={props.handleDragEnd}
                handleMouseEnter={props.handleMouseEnter}
                handleMouseOver={props.handleMouseOver}
                handleMouseLeave={props.handleMouseLeave}
                hovered={props.hovered}
              />
              <EdgeDropIndicator
                index={index}
                target={props.element.id || ""}
                reorder={reorder}
                handleReorder={handleReorder}
                title={props.element.title}
              />
            </React.Fragment>
          ))}
        </Reorder.Group>
      )}
    </Reorder.Item>
  );
};
