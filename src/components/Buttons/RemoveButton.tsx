import { ButtonHTMLAttributes } from "react";
import CloseIcon from "@mui/icons-material/Close";
type RemoveButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "styles"
>;

export const RemoveButton = (props: RemoveButtonProps) => {
  return (
    <button
      className=" flex justify-center items-center  p-1 bg-redPrimary rounded-lg"
      {...props}
    >
      <CloseIcon sx={{ color: "#FBFBFB", width: 24, height: 24 }} />
    </button>
  );
};
