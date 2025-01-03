import React from "react";
import { cn } from "../lib/utils";
import sanitizeHtml from "sanitize-html";

export interface HTMLContentProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  styles?: React.CSSProperties;
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
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(children) }}
      />
    );
  },
);

export default HTMLContent;
