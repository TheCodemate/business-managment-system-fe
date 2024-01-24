import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

type VariantsType = "basic" | "outlined";

type Props = {
  variant?: VariantsType;
  label: string;
  error: string | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style"> &
  ReturnType<UseFormRegister<FieldValues>>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ error, label, variant = "basic", ...rest }, ref) => {
    const { name } = rest;
    const variants = {
      basic:
        "border-b border-elementsColor basis-full min-h-9 mb-1  bg-bgPrimary pl-4",
      outlined:
        "border rounded-lg border-details min-h-9 mb-1 bg-bgPrimary pl-4 ",
    };

    return (
      <div className="flex flex-col min-h-16 w-full">
        <label
          className="text-xs text-textPrimary text-left mb-1"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          {...rest}
          className={variants[variant]}
          aria-describedby={`${name}-error`}
          aria-invalid={error ? "true" : "false"}
          ref={ref}
        />
        {error ? (
          <span
            role="alert"
            id={`${name}-error`}
            className="text-xs text-redPrimary mb-2"
            aria-hidden
          >
            {error ? error : null}
          </span>
        ) : null}
      </div>
    );
  }
);
