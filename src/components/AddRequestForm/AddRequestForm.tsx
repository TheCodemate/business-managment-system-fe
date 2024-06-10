import { useState } from "react";
import { Switch } from "@/components/ui/switch";

import { CloseButton } from "../Buttons/CloseButton";
import { CustomRequestForm } from "./CustomRequestForm/CustomRequestForm";
import { SearchRequestForm } from "./SearchRequestForm/SearchRequstForm";

type Props = {
  closeHandler: () => void;
};

export const AddRequestForm = ({ closeHandler }: Props) => {
  const [isCustomRequestFormOpen, setIsCustomRequestFormOpen] = useState(true);

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
            onCheckedChange={() => {
              setIsCustomRequestFormOpen((prev) => !prev);
            }}
          />
          <label htmlFor="formTypeSwitch">
            {isCustomRequestFormOpen
              ? "Przełącz aby uzupełnić formularz ręcznie"
              : "Przełącz aby wybrać produkt z systemu"}
          </label>
        </div>

        {isCustomRequestFormOpen ? (
          <SearchRequestForm closeFormHandler={closeHandler} />
        ) : (
          <CustomRequestForm closeFormHandler={closeHandler} />
        )}
      </main>
    </div>
  );
};
