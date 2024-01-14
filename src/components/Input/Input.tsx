import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { InputNames } from "../Forms/types";

type Props = {
  name: InputNames;
  label: string;
  register: UseFormRegister<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style">;

export const Input = ({ error, label, name, register, ...rest }: Props) => {
  return (
    <div className="flex flex-col min-h-16 w-full">
      <label className="text-xs text-textPrimary text-left" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="border-b border-elementsColor basis-full min-h-9 mb-1  bg-bgPrimary pl-4"
        type="email"
        aria-describedby="email-error"
        aria-invalid={error ? "true" : "false"}
        {...rest}
        {...register(name)}
      />
      {error ? (
        <span
          role="alert"
          id="email-error"
          className="text-xs text-redPrimary mb-2"
          aria-hidden
        >
          {error.message?.toString()}
        </span>
      ) : null}

    </div>
  );
};
