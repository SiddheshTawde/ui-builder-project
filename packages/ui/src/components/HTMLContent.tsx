import { CSSProperties, InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import React from "react";

export interface HTMLContentProps extends InputHTMLAttributes<HTMLDivElement> {
  styles?: CSSProperties;
  classNames?: string;
}

const HTMLContent = React.forwardRef<HTMLDivElement, HTMLContentProps>(
  ({ children = "HTML Content", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("ui-flex ui-w-full ui-flex-col", [props.classNames])}
        style={props.styles}
      >
        {children}
      </div>
    );
  },
);

export default HTMLContent;
