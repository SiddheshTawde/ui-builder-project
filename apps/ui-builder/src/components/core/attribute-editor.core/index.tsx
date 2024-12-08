"use client";

import React from "react";
import MonacoEditor from "@monaco-editor/react";

import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";

import { findElementById, updateElementById } from "@root/lib/utils";
import { DnDElementType, DnDState } from "@siddheshtawde/drag-and-drop/src";

interface AttributeEditorProps {
  state: DnDState;
  setState: React.Dispatch<React.SetStateAction<DnDState>>;
}

const AttributeEditor = ({ state, setState }: AttributeEditorProps) => {
  const [details, setDetails] = React.useState<Partial<DnDElementType> | null>(
    null,
  );

  React.useEffect(() => {
    if (state?.selected) {
      const element = findElementById(state?.elements, state?.selected);

      setDetails(element);
    } else {
      setDetails(null);
    }
  }, [state?.selected, details?.id]);

  const handleOnChange = (
    attribute: keyof React.HTMLAttributes<keyof React.ReactHTML>,
    value: string,
  ) => {
    const updatedDetails: Partial<DnDElementType> = { ...details };
    const updatedAttributes = { ...details?.attributes, [attribute]: value };
    updatedDetails.attributes = updatedAttributes;
    setDetails(updatedDetails);
    setState({
      ...state,
      elements: updateElementById(
        state?.elements,
        state?.selected || "",
        updatedDetails,
      ),
    });
  };

  if (details === null) {
    return (
      <div className="p-4 text-sm text-transparent/60">
        Select an element to see editing options.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <p className="text-3xl font-semibold">{details?.title}</p>
        <p className="font-mono text-sm text-transparent/40">{details?.tag}</p>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="edit-element-id">Id</Label>
        <Input
          type="text"
          id="edit-element-id"
          placeholder="Element Id"
          value={details?.attributes?.id || ""}
          onChange={(event) => handleOnChange("id", event.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="edit-element-classnames">Class Names</Label>
        <Input
          type="text"
          id="edit-element-classnames"
          placeholder="Element Classes"
          value={details?.attributes?.className || ""}
          onChange={(event) => handleOnChange("className", event.target.value)}
        />
        <p className="text-xs text-transparent/60">
          Use comma (",") separated values for multiple classes.
        </p>
      </div>

      {details?.title !== "Input" ? (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="edit-element-classnames">HTML Content</Label>
          <MonacoEditor
            height="20vh"
            theme="vs-dark"
            language="html"
            defaultLanguage="html"
            defaultValue="// some comment"
            value={details?.attributes?.children?.toLocaleString()}
            onChange={(value) => handleOnChange("children", value || "")}
            onMount={(editor) => {
              editor.setValue(
                details?.attributes?.children?.toLocaleString() || "",
              );
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AttributeEditor;
