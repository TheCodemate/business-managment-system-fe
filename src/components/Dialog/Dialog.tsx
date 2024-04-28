import { ReactElement } from "react";
import { DialogContextProvider } from "./context";
import { Content, Title, CloseDialogButton } from "./components";
import { Actions } from "./Actions/Actions";

type Props = {
  children: ReactElement | ReactElement[];
  onCloseHandler: () => void;
  confirmationHandler: () => void;
  closeButtonVisible?: boolean;
};

export const Dialog = ({
  children,
  onCloseHandler,
  closeButtonVisible = true,
}: Props) => {
  const stopPropagationHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <DialogContextProvider>
      <div
        onClick={(e) => stopPropagationHandler(e)}
        className="flex flex-col min-w-[320px] max-w-[600px] bg-bgPrimary p-12 rounded-lg"
      >
        {closeButtonVisible ? (
          <CloseDialogButton onClick={onCloseHandler} />
        ) : null}
        {children}
      </div>
    </DialogContextProvider>
  );
};

Dialog.Content = Content;
Dialog.AcceptButton = Actions.AcceptButton;
Dialog.RejectButton = Actions.RejectButton;
Dialog.Actions = Actions;
Dialog.Title = Title;
Dialog.CloseButton = CloseDialogButton;
