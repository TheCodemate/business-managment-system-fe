import { InputHTMLAttributes } from "react";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "style"
>;

export const Input = ({ ...props }: InputProps) => {
  return (
    <>
      <label htmlFor="search" className="hidden">
        Search
      </label>
      <input
        placeholder="Search..."
        name="search"
        type="text"
        className="rounded-full bg-alternate border-solid border-details border pl-8 py-1 w-3/12 min-w-[250px]"
        {...props}
      />
    </>
  );
};
