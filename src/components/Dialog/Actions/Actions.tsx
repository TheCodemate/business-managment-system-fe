import { ReactElement } from "react";
import { ActionsContextProvider } from "./context";
import { AcceptButton, RejectButton } from "./ components";

type Props = {
  children: ReactElement | ReactElement[];
};

export const Actions = ({ children }: Props) => {
  return (
    <ActionsContextProvider>
      <div className="flex justify-end gap-4">{children}</div>
    </ActionsContextProvider>
  );
};

Actions.AcceptButton = AcceptButton;
Actions.RejectButton = RejectButton;
