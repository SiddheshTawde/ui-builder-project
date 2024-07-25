import React from "react";
import { v4 as uuid } from "uuid";

import { cn } from "./helpers";
import { ElementType } from "./types";

type PropsEditorProps = {
  edit: ElementType;
  elementProps: Record<string, any>;
  updateElementProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const PropsEditor = ({
  edit,
  elementProps,
  updateElementProps,
}: PropsEditorProps) => {
  const [local, setLocal] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (edit.id) {
      setLocal(elementProps[edit.id]);
    }
  }, [edit.id, elementProps]);

  const handlePropChange = (
    elementId: string,
    propName: string,
    propValue: any,
  ) => {
    const updated = {
      ...local,
      [propName]: { ...local[propName], default: propValue },
    };

    const updatedProps = { ...elementProps, [elementId]: updated };

    setLocal(updated);
    updateElementProps(updatedProps);
  };

  return (
    <div className="dnd-flex dnd-flex-col dnd-gap-4 dnd-rounded dnd-border dnd-p-2">
      {Object.entries(local).map(([prop, value]) => (
        <div key={`${edit.id}-${prop}`}>
          <p className="dnd-mb-1 dnd-text-xs dnd-font-semibold dnd-capitalize">
            {prop}:
          </p>
          <PropControl
            prop={prop}
            control={value}
            elementId={edit.id || ""}
            handlePropChange={handlePropChange}
          />
        </div>
      ))}
    </div>
  );
};

type PropControlProps = {
  prop: string;
  control: {
    default: any;
    type: "boolean" | "select" | "string";
    value: any;
  };
  elementId: string;
  handlePropChange: (
    elementId: string,
    propName: string,
    propValue: any,
  ) => void;
};

const PropControl = ({
  elementId,
  prop,
  control,
  handlePropChange,
}: PropControlProps) => {
  if (control.type === "string") {
    return (
      <input
        placeholder="This props is hidden"
        value={control.default as any}
        onChange={(event) =>
          handlePropChange(elementId, prop, event.target.value)
        }
        className="dnd-w-full dnd-border dnd-p-2 dnd-text-sm dnd-outline-none"
      />
    );
  }

  if (control.type === "boolean") {
    return (
      <label className="dnd-relative dnd-inline-block dnd-h-6 dnd-w-12">
        <input
          type="checkbox"
          checked={control.default}
          onChange={(e) =>
            handlePropChange(elementId, prop, e.currentTarget.checked)
          }
          className="dnd-hidden"
        />
        <div
          className={cn(
            "dnd-block dnd-h-full dnd-w-full dnd-cursor-pointer dnd-rounded-full dnd-transition dnd-duration-200 dnd-ease-linear",
            { "dnd-bg-green-500": control.default },
            { "dnd-bg-gray-300": !control.default },
          )}
        />
        <span
          className={cn(
            "dnd-absolute dnd-left-0 dnd-top-0 dnd-inline-block dnd-h-6 dnd-w-6 dnd-transform dnd-rounded-full dnd-bg-white dnd-shadow-md dnd-transition-transform dnd-duration-200 dnd-ease-linear",
            { "dnd-translate-x-6": control.default },
            { "dnd-translate-x-0": !control.default },
          )}
        />
      </label>
    );
  }

  if (control.type === "select") {
    return (
      <select
        name={control.type}
        id={uuid()}
        value={control.default}
        onChange={(event) =>
          handlePropChange(elementId, prop, event.target.value)
        }
      >
        {control.value.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return null;
};
