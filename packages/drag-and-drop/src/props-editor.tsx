import { useState } from "react";

type PropsValue = string | number | boolean;

type PropsEditorProps = {
  props: Record<string, PropsValue>;
};

export const PropsEditor = ({ props }: PropsEditorProps) => {
  return (
    <div className="dnd-bg-transparent/5 dnd-border dnd-border-transparent/20 dnd-p-2 dnd-flex dnd-flex-col dnd-gap-4">
      {Object.keys(props).map((prop, index) => (
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
        <label className="dnd-text-xs dnd-font-medium dnd-capitalize">
          {prop}
        </label>
        <input
          type="checkbox"
          checked={value}
          onChange={() => updateValue(!value)}
          className="dnd-border dnd-outline-none dnd-p-2 dnd-text-sm"
        />
      </div>
    );
  }

  return (
    <div>
      <p className="dnd-text-xs dnd-font-medium dnd-capitalize">{prop}</p>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        className="dnd-border dnd-w-full dnd-outline-none dnd-p-2 dnd-text-sm"
      />
    </div>
  );
};
