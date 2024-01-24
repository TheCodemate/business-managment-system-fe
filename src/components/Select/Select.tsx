import { InputNames } from "../Forms/types";
import React, { SelectHTMLAttributes } from "react";

type Props = {
  label: string;
  options: string[];
  name: InputNames;
  error: string | undefined;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "style">;

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ label, options, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col min-h-16 w-full">
        <label htmlFor={id} className="text-xs text-textPrimary text-left mb-1">
          {label}
        </label>
        <select
          {...rest}
          className="border rounded-lg border-details min-h-9 mb-1 bg-bgPrimary px-4"
          ref={ref}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
);
