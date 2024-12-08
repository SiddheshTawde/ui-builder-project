import { CSSProperties, InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import React from "react";

export interface HTMLContentProps extends InputHTMLAttributes<HTMLDivElement> {
  styles?: CSSProperties;
  classNames?: string;
  children: string;
}

const HTMLContent = React.forwardRef<HTMLDivElement, HTMLContentProps>(
  ({ children = "HTML Content", ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={props.styles}
        className={cn("ui-flex ui-w-full ui-flex-col", [props.classNames])}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  },
);

export default HTMLContent;
