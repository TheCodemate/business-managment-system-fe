import { Switch } from "@/components/ui/switch";

import { CloseButton } from "../../../../components/Buttons/CloseButton";
import { CustomRequestForm } from "./custom_request_form";
import { SearchRequestForm } from "./search_request_form";
import { useDisclosure } from "@/modules/hooks/useDisclosure";

type Props = {
  closeHandler: () => void;
};

export const AddRequestForm = ({ closeHandler }: Props) => {
  const { isOpen, toggleHandler } = useDisclosure(true);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="max-w-full min-w-[360px] bg-alternate rounded-xl overflow-y-scroll"
    >
      <header className="flex bg-neutral100 px-6 py-3 justify-between items-center bg-bgSecondary">
        <span className="text-sm font-bold text-primary">Nowe zapytanie</span>
        <CloseButton onClick={closeHandler} />
      </header>
      <main className="p-6">
        <div className="flex gap-4">
          <Switch
            name="formTypeSwitch"
            className="mb-6"
            onCheckedChange={toggleHandler}
          />
          <label htmlFor="formTypeSwitch">
            {isOpen
              ? "Przełącz aby uzupełnić formularz ręcznie"
              : "Przełącz aby wybrać produkt z systemu"}
          </label>
        </div>

        {isOpen ? (
          <SearchRequestForm closeFormHandler={closeHandler} />
        ) : (
          <CustomRequestForm closeFormHandler={closeHandler} />
        )}
      </main>
    </div>
  );
};
