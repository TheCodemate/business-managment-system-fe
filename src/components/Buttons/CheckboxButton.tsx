import React, { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  content: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "styles"> &
  ReturnType<UseFormRegister<FieldValues>>;

export const CheckboxButton = React.forwardRef<HTMLInputElement, Props>(
  ({ id, content, ...rest }, ref) => {
    return (
      <label
        htmlFor={id}
        className="flex justify-center items-center focus:ring-red-500 gap-2 "
      >
        <input
          {...rest}
          defaultChecked={true}
          className="appearance-none relative w-5 h-5 border-2 border-primary rounded-lg bg-bgPrimary shrink-0 checked:bg-primary checked:border-0"
          type="checkbox"
          ref={ref}
        />

        {content}
      </label>
    );
  }
);
