import { Loading } from "../Loading/Loading";
import { Button } from "../ui/button";

type DialogProps = {
  rejectHandler: () => void;
  acceptHandler: () => void;
  isLoading?: boolean;
  headerText: string;
  bodyText: string;
  acceptButtonText: string;
  rejectButtonText: string;
};

export const Dialog = ({
  rejectHandler,
  rejectButtonText,
  acceptHandler,
  acceptButtonText,
  isLoading,
  headerText,
  bodyText,
}: DialogProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex flex-col gap-6 min-w-[360px] max-w-[800px] bg-alternate p-6 rounded-xl shadow-xl"
    >
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-xl">{headerText}</h3>
        <p>{bodyText}</p>
      </div>
      <div className="flex justify-end gap-6">
        <Button
          className="font-bold text-neutral600 min-w-[120px]"
          variant={"outline"}
          onClick={rejectHandler}
        >
          {rejectButtonText}
        </Button>
        <Button
          disabled={isLoading}
          className="text-alternate font-bold min-w-[120px]"
          onClick={acceptHandler}
        >
          {isLoading ? <Loading size={20} color="#FFFFFF" /> : acceptButtonText}
        </Button>
      </div>
    </div>
  );
};
