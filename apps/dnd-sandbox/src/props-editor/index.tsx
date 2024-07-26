import React, { useState, useEffect } from "react";
import { ElementType } from "@repo/drag-and-drop";
import { PropItem } from "./prop-item";

type PropsEditorProps = {
  className: string;
  selectedElement: ElementType;
  elementProps: Record<string, any>;
  updateElementProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const PropsEditor = ({ selectedElement, elementProps, updateElementProps }: PropsEditorProps) => {
  const [local, setLocal] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedElement.id) {
      setLocal(elementProps[selectedElement.id] || {});
    }
  }, [selectedElement.id, elementProps]);

  const handlePropChange = (elementId: string, propName: string, propValue: any) => {
    const updated = { ...local, [propName]: { ...local[propName], default: propValue } };
    const updatedProps = { ...elementProps, [elementId]: updated };

    setLocal(updated);
    updateElementProps(updatedProps);
  };

  return (
    <div className="dnd-flex dnd-flex-col dnd-gap-4 dnd-rounded dnd-border dnd-p-2">
      {Object.entries(local).map(([prop, value]) => (
        <PropItem
          key={`${selectedElement.id}-${prop}`}
          prop={prop}
          value={value}
          elementId={selectedElement.id || ""}
          handlePropChange={handlePropChange}
        />
      ))}
    </div>
  );
};
