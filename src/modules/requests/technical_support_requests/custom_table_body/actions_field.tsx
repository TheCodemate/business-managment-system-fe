import { Button } from "@/components/Buttons/Button";

type Props = {
  clickHandler: () => void;
  isLoading: boolean;
  isResolved: boolean;
};

export const ActionsField = ({
  clickHandler,
  isLoading,
  isResolved,
}: Props) => {
  return (
    <>
      {isResolved ? (
        <Button
          isLoading={isLoading}
          onClick={clickHandler}
          content="Podgląd"
        />
      ) : (
        <Button
          isLoading={isLoading}
          onClick={clickHandler}
          content="Rozwiąż"
        />
      )}
    </>
  );
};
