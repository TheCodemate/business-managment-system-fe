import CloseIcon from "@mui/icons-material/Close";

type Props = {
  onClick?: () => void;
};

export const CloseButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className="bg-primary w-8 h-8">
      <CloseIcon className="text-alternate" />
    </button>
  );
};
