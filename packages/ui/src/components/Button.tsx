import { ButtonHTMLAttributes, CSSProperties } from "react";
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

export const ButtonDefault: ButtonProps = {
  variant: "contained",
  children: "Button Text",
};

const Button = (props: ButtonProps) => {
  return (
    <div
      className={cn("button-container ui-relative ui-h-fit ui-w-fit", [
        props.classNames?.container,
      ])}
      style={props.styles?.container}
    >
      <button
        {...props}
        disabled={props.loading || props.disabled}
        className={cn(
          "button-element ui-rounded ui-px-4 ui-py-2 ui-transition-all",
          [props.classNames?.button],
          {
            "ui-bg-primary ui-text-primary-foreground disabled:ui-bg-primary/10":
              props.variant === "contained",
          },
          {
            "ui-border ui-border-primary ui-bg-primary-foreground ui-text-primary disabled:ui-border-primary/10 disabled:ui-text-primary/10":
              props.variant === "outlined",
          },
          {
            "ui-text-primary hover:ui-underline disabled:ui-border-primary/10 disabled:ui-text-primary/10":
              props.variant === "link",
          },
        )}
        style={props.styles?.button}
      >
        {props.children}
      </button>

      {props.loading ? (
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
};

export default Button;
