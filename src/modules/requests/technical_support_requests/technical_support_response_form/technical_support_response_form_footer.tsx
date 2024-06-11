import { Button } from "@/components/ui/button";

export const ResponseFormFooter = ({
  formName,
  closeHandler,
}: {
  formName: string;
  closeHandler: () => void;
}) => {
  return (
    <footer className="flex gap-4 justify-end border-t-neutral-200 border-t border-t-details pt-4">
      <Button
        className="font-bold  text-neutral600"
        variant={"outline"}
        onClick={closeHandler}
      >
        Anuluj
      </Button>
      <Button
        type="submit"
        form={formName}
        className="text-alternate font-bold"
      >
        Wyślij
      </Button>
    </footer>
  );
};
