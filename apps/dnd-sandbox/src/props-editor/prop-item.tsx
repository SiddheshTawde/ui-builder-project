import { PropControl } from "./prop-control";

type PropItemProps = {
  prop: string;
  value: any;
  elementId: string;
  handlePropChange: (elementId: string, propName: string, propValue: any) => void;
};

export const PropItem = ({ prop, value, elementId, handlePropChange }: PropItemProps) => (
  <div>
    <p className="dnd-mb-1 dnd-text-xs dnd-font-semibold dnd-capitalize">{prop}:</p>
    <PropControl prop={prop} control={value} elementId={elementId} handlePropChange={handlePropChange} />
  </div>
);
