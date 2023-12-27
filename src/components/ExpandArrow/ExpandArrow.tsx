import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
  left: boolean;
  onClick?: () => void;
};

export const ExpandArrow = ({ onClick, left }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-bgPrimary absolute top-9 right-0 w-6 h-6 translate-x-[50%] flex justify-center items-center shadow-sm"
    >
      {left ? (
        <ChevronLeftIcon sx={{ color: "#6225AF" }} />
      ) : (
        <ChevronRightIcon sx={{ color: "#6225AF" }} />
      )}
    </button>
  );
};
