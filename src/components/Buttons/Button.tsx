import { ButtonHTMLAttributes } from "react";
import { Loading } from "../Loading/Loading";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconTypes } from "@/types";

type Props = {
  content: string;
  icon?: IconTypes;
  isLoading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

const icons = {
  add: null,
  addRequest: <AddOutlinedIcon />,
  null: null,
};

export const Button = ({ content, icon, ...props }: Props) => {
  return (
    <button
      className="flex justify-center items-center font-bold text-nowrap bg-primary text-alternate hover:cursor-pointer w-full px-6 py-2 rounded-lg hover:bg-details transition-all disabled:bg-details disabled:text-textDetail disabled:border-textDetail disabled:cursor-not-allowed"
      {...props}
    >
      {props.isLoading ? (
        <Loading color={"#FBFBFB"} />
      ) : (
        <p className="flex items-center justify-center">
          {content} {icon ? icons[icon] : null}
        </p>
      )}
    </button>
  );
};
