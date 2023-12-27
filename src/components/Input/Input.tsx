import { InputHTMLAttributes } from "react";

type InputProps = { label: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "style"
>;

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <>
      <label htmlFor={props.name} className="hidden">
        {label}
      </label>
      <input
        className="rounded-full bg-alternate border-solid border-details border pl-8 py-1 w-3/12 min-w-[250px]"
        {...props}
      />
    </>
  );
};
