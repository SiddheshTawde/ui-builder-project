import React, { ButtonHTMLAttributes } from "react";
import PropTypes from "prop-types";
import { FiLoader } from "react-icons/fi";
import { cn } from "../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "link";
  loading?: boolean;
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
      <div className="button-container ui-relative ui-h-fit ui-w-fit">
        <button
          ref={ref}
          {...props}
          disabled={loading || props.disabled}
          className={cn(
            "button-element ui-rounded ui-px-4 ui-py-2 ui-transition-all",
            {
              "ui-bg-indigo-500 ui-text-indigo-50 disabled:ui-bg-indigo-500/10":
                variant === "contained",
            },
            {
              "disabled:ui-text-primary/10 ui-border ui-border-indigo-500 ui-bg-indigo-50 ui-text-indigo-500 disabled:ui-border-indigo-500/10":
                variant === "outlined",
            },
            {
              "ui-text-indigo-500 hover:ui-underline disabled:ui-border-indigo-500/10 disabled:ui-text-indigo-500/10":
                variant === "link",
            },
          )}
        >
          {children}
        </button>

        {loading ? (
          <FiLoader className="ui-absolute ui-bottom-0 ui-left-0 ui-right-0 ui-top-0 ui-z-10 ui-m-auto ui-h-5 ui-w-5 ui-animate-spin ui-text-indigo-500" />
        ) : null}
      </div>
    );
  },
);

Button.defaultProps = {
  variant: "contained",
  loading: false,
};

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "outlined", "link"]),
  loading: PropTypes.bool,
};

export default Button;
