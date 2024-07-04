import { Loading } from "../Loading/Loading";
import { Button } from "../ui/button";

export type Props = {
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
}: Props) => {
  return (
    <div
      data-testid="dialog-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex flex-col gap-6 min-w-[360px] max-w-[800px] bg-alternate p-6 rounded-xl shadow-xl"
    >
      <div className="flex flex-col gap-4">
        {headerText && <h3 className="font-bold text-xl">{headerText}</h3>}
        {bodyText && <p>{bodyText}</p>}
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
          data-testid="accept-button"
          disabled={isLoading}
          className="text-alternate font-bold min-w-[120px]"
          onClick={acceptHandler}
        >
          {isLoading && (
            <Loading data-testid="loader" size={20} color="#FFFFFF" />
          )}
          {acceptButtonText}
        </Button>
      </div>
    </div>
  );
};
