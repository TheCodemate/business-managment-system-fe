import { ButtonHTMLAttributes } from "react";
import { Loading } from "../Loading/Loading";

type Props = {
  content: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

export const Button = ({ content, ...props }: Props) => {
  return (
    <button
      className="text-white font-bold bg-primary text-textAlternate hover:cursor-pointer w-full px-6 py-2 rounded-lg"
      {...props}
    >
      {props.disabled ? <Loading color={"#FBFBFB"} /> : <p>{content}</p>}
    </button>
  );
};
