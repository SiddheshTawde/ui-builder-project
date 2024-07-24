import React from "react";
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

  const handlePropChange = (propName: string, propValue: any) => {
    const updated = { ...local };
    updated[propName] = propValue;

    const updatedProps = { ...elementProps };

    if (edit.id) {
      updatedProps[edit.id] = updated;
      updateElementProps(updatedProps);
    }
  };

  return (
    <div className="dnd-flex dnd-flex-col dnd-gap-4 dnd-rounded dnd-border dnd-p-2">
      {Object.entries(local).map(([prop, value]) => (
        <div key={`${edit.id}-${prop}`}>
          <p className="dnd-mb-1 dnd-text-xs dnd-font-semibold dnd-capitalize">
            {prop}:
          </p>
          <input
            placeholder="This props is hidden"
            value={value as any}
            onChange={(event) => handlePropChange(prop, event.target.value)}
            className="dnd-w-full dnd-border dnd-p-2 dnd-text-sm dnd-outline-none"
          />
        </div>
      ))}
    </div>
  );
};
