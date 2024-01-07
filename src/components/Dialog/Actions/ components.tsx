import { useActionsContext } from "./context";

type AcceptButtonProps = {
  onClick: () => void;
};

export const AcceptButton = ({ onClick }: AcceptButtonProps) => {
  const context = useActionsContext();
  return (
    <button
      className="border border-primary bg-primary text-alternate font-bold rounded-m p-2 rounded-lg"
      onClick={onClick}
    >
      Accept
    </button>
  );
};
type RejectButtonProps = {
  onClick: () => void;
};
export const RejectButton = ({ onClick }: RejectButtonProps) => {
  const context = useActionsContext();
  return (
    <button
      className="border border-primary bg-alternate text-primary font-bold rounded-m p-2 rounded-lg"
      onClick={onClick}
    >
      Reject
    </button>
  );
};
