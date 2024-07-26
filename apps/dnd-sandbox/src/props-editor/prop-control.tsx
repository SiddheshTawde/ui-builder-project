import { v4 as uuid } from "uuid";

type PropControlProps = {
  prop: string;
  control: {
    default: any;
    type: "boolean" | "select" | "string";
    value: any;
  };
  elementId: string;
  handlePropChange: (elementId: string, propName: string, propValue: any) => void;
};

export const PropControl = ({ elementId, prop, control, handlePropChange }: PropControlProps) => {
  switch (control.type) {
    case "string":
      return (
        <input
          placeholder="This prop is hidden"
          value={control.default}
          onChange={(event) => handlePropChange(elementId, prop, event.target.value)}
          className="dnd-w-full dnd-border dnd-p-2 dnd-text-sm dnd-outline-none"
        />
      );
    case "boolean":
      return (
        <input
          type="checkbox"
          checked={control.default}
          onChange={(e) => handlePropChange(elementId, prop, e.currentTarget.checked)}
        />
      );
    case "select":
      return (
        <select
          name={control.type}
          id={uuid()}
          value={control.default}
          onChange={(event) => handlePropChange(elementId, prop, event.target.value)}
        >
          {control.value.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
};
