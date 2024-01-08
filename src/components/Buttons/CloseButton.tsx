import CloseIcon from "@mui/icons-material/Close";

type Props = {
  onClick: () => void;
};

export const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center max-w-max max-h-max mb-2 rounded-lg bg-primary self-end"
    >
      <CloseIcon sx={{ color: "#FBFBFB", width: 24, height: 24 }} />
    </button>
  );
};
