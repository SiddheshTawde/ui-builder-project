import {
  CSSProperties,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";
import { clsx } from "clsx";
import { cn } from "../lib/utils";
import { v4 as uuidv4 } from "uuid";

import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number" | "url" | "search";
  showPassword?: boolean;
  togglePassword?: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  styles?: {
    container?: CSSProperties;
    input?: CSSProperties;
    label?: CSSProperties;
    errorText?: CSSProperties;
    helperText?: CSSProperties;
  };
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    errorText?: string;
    helperText?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = "",
      loading = false,
      label = "Input Label",
      helperText = "Small description for the above input.",
      ...props
    },
    ref,
  ) => {
    const input_id = uuidv4();
    return (
      <div
        className={cn("ui-group ui-flex ui-w-full ui-flex-col", [
          props.classNames?.container,
        ])}
        style={props.styles?.container}
      >
        {label ? (
          <label
            htmlFor={input_id}
            className={clsx(
              "ui-mb-1 ui-px-1 ui-text-sm ui-font-semibold",
              [props.classNames?.label],
              {
                "ui-text-red-500": error,
              },
            )}
            style={props.styles?.label}
          >
            {label}
          </label>
        ) : null}

        <div className="ui-relative ui-w-full">
          <input
            {...props}
            id={input_id}
            type={props.showPassword ? "text" : props.type || "text"}
            className={clsx(
              "ui-w-full ui-border ui-bg-transparent ui-px-4 ui-py-2 ui-outline-none focus:ui-ring",
              [props.classNames?.input],
              {
                "ui-border-red-600": error,
              },
            )}
            style={props.styles?.input}
            value={props.value}
            onChange={props.onChange}
            disabled={loading || props.disabled}
          />

          {props.type === "password" ? (
            <button
              className="ui-absolute ui-bottom-0 ui-right-4 ui-top-0 ui-z-10 ui-m-auto ui-h-fit ui-w-fit"
              onClick={() => {
                if (props.togglePassword) {
                  props.togglePassword(!props.showPassword);
                }
              }}
            >
              {props.showPassword ? (
                <EyeIcon className="ui-h-5 ui-w-5" />
              ) : (
                <EyeSlashIcon className="ui-h-5 ui-w-5" />
              )}
            </button>
          ) : null}
        </div>

        {error ? (
          <div
            className={cn(
              "ui-mt-1 ui-flex ui-items-center ui-gap-2 ui-px-1 ui-text-sm ui-text-red-500",
              [props.classNames?.errorText],
            )}
            style={props.styles?.errorText}
          >
            <ExclamationTriangleIcon className="ui-h-4 ui-w-4" />
            <span>{error}</span>
          </div>
        ) : null}
        {helperText ? (
          <div
            className={cn(
              "ui-mt-1 ui-flex ui-items-center ui-gap-2 ui-px-1 ui-text-sm ui-text-transparent/60",
              [props.classNames?.helperText],
            )}
            style={props.styles?.helperText}
          >
            <span>{helperText}</span>
          </div>
        ) : null}
      </div>
    );
  },
);

export default Input;
