import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import PropTypes from 'prop-types'
import { FiLoader } from "react-icons/fi";
import { cn } from "../lib/utils.js";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "link";
  loading?: boolean;
  styles?: {
    container?: CSSProperties;
    button?: CSSProperties;
    loader?: CSSProperties;
  };
  classNames?: {
    container?: string;
    button?: string;
    loader?: string;
  };
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      variant = "contained",
      children = "Button Text",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn("button-container ui-relative ui-h-fit ui-w-fit", [
          props.classNames?.container,
        ])}
        style={props.styles?.container}
      >
        <button
          ref={ref}
          {...props}
          disabled={loading || props.disabled}
          className={cn(
            "button-element ui-rounded ui-px-4 ui-py-2 ui-transition-all",
            [props.classNames?.button],
            {
              "ui-bg-primary ui-text-primary-foreground disabled:ui-bg-primary/10":
                variant === "contained",
            },
            {
              "ui-border ui-border-primary ui-bg-primary-foreground ui-text-primary disabled:ui-border-primary/10 disabled:ui-text-primary/10":
                variant === "outlined",
            },
            {
              "ui-text-primary hover:ui-underline disabled:ui-border-primary/10 disabled:ui-text-primary/10":
                variant === "link",
            },
          )}
          style={props.styles?.button}
        >
          {children}
        </button>

        {loading ? (
          <FiLoader
            className={cn(
              "ui-absolute ui-bottom-0 ui-left-0 ui-right-0 ui-top-0 ui-z-10 ui-m-auto ui-h-5 ui-w-5 ui-animate-spin ui-text-primary",
              [props.classNames?.loader],
            )}
            style={props.styles?.loader}
          />
        ) : null}
      </div>
    );
  },
);

export default Button;
