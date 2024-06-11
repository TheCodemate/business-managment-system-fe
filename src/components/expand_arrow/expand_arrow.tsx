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
      className="rounded-[100%] bg-bgPrimary absolute top-9 right-0 w-6 h-6 translate-x-[50%] flex justify-center items-center shadow-sm"
    >
      {left ? (
        <ChevronLeftIcon sx={{ color: "#141414" }} />
      ) : (
        <ChevronRightIcon sx={{ color: "#141414 " }} />
      )}
    </button>
  );
};
