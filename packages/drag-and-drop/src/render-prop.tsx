import React from "react";

type RenderPropProps = {
  prop: string;
  value: string | boolean | number;
  elementProps: Record<string, string | number | boolean>;
  updateElementProps: React.Dispatch<React.SetStateAction<Record<string, string | number | boolean>>>;
};

export const RenderProp = (props: RenderPropProps) => {
  const [propValue, updatePropValue] = React.useState(props.value);

  React.useEffect(() => {
    const updated = { ...props.elementProps };

    props.elementProps[props.prop] = propValue;

    props.updateElementProps(updated);
  }, [propValue]);

  return (
    <div className="grid grid-cols-4 gap-2">
      <p className="col-span-1">{props.prop}:</p>

      {typeof propValue === "boolean" ? (
        <input type="checkbox" checked={propValue} onChange={() => updatePropValue(!propValue)} className="col-span-3" />
      ) : (
        <input value={propValue.toString()} onChange={(e) => updatePropValue(e.target.value)} className="col-span-3" />
      )}
    </div>
  );
};
