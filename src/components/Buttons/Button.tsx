import { ButtonHTMLAttributes } from "react";
import { Loading } from "../Loading/Loading";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconTypes } from "@/types";

type Props = {
  content: string;
  variant: string;
  icon: IconTypes;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

const icons = {
  add: null,
  addRequest: <AddOutlinedIcon />,
  null: null,
};

export const Button = ({ content, icon, ...props }: Props) => {
  return (
    <button
      className="flex items-center font-bold text-nowrap bg-primary text-alternate hover:cursor-pointer w-full px-6 py-2 rounded-lg hover:bg-details transition-all"
      {...props}
    >
      {props.disabled ? (
        <Loading color={"#FBFBFB"} />
      ) : (
        <p>
          {content} {icons[icon]}
        </p>
      )}
    </button>
  );
};
