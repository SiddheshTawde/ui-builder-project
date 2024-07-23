import React from "react";
import { useState } from "react";

type PropsValue = string | number | boolean;

type PropsEditorProps = {
  props: Record<string, PropsValue>;
};

export const PropsEditor = ({ props }: PropsEditorProps) => {
  const [local, setLocal] = React.useState(props);

  React.useEffect(() => setLocal(props), [props]);

  return (
    <div className="dnd-flex dnd-flex-col dnd-gap-4 dnd-border dnd-p-2 dnd-rounded">
      {Object.keys(local).map((prop, index) => (
        <PropsField key={index} prop={prop} initial={props[prop]} />
      ))}
    </div>
  );
};

const PropsField = ({
  prop,
  initial,
}: {
  prop: string;
  initial: PropsValue;
}) => {
  const [value, updateValue] = useState<PropsValue>(initial);

  if (typeof value === "boolean") {
    return (
      <div className="dnd-flex dnd-items-center dnd-gap-2">
        <label className="dnd-text-xs dnd-font-semibold dnd-capitalize">
          {prop}
        </label>
        <input
          type="checkbox"
          checked={value}
          onChange={() => updateValue(!value)}
          className="dnd-border dnd-p-2 dnd-text-sm dnd-outline-none"
        />
      </div>
    );
  }

  return (
    <div>
      <p className="dnd-mb-1 dnd-text-xs dnd-font-semibold dnd-capitalize">
        {prop}:
      </p>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        className="dnd-w-full dnd-border dnd-p-2 dnd-text-sm dnd-outline-none"
      />
    </div>
  );
};
