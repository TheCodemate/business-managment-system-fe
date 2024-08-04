import { MouseEvent, ReactElement } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactElement;
  isOpen: boolean;
  toggleModal: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Modal = ({ children, isOpen, toggleModal }: Props) => {
  const handleToggler = (e: MouseEvent<HTMLButtonElement>) => {
    toggleModal(e);
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <button
      data-testid="modal"
      className="fixed top-0 left-0 bg-opacity-90 bg-textPrimary w-full h-full overflow-y-auto flex justify-center items-center"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleToggler(event);
      }}
    >
      <div className="absolute top-0 lg:top-[5%] left-1/2 -translate-x-1/2 max-w-[1020px]">
        {children}
      </div>
    </button>,
    document.body
  );
};
