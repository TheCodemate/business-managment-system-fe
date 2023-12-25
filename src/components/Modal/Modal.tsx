import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  isOpen: boolean;
  toggleModal: () => void;
};

export const Modal = ({ children, isOpen, toggleModal }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 opacity-30 bg-textPrimary w-full h-full"
      onClick={toggleModal}
    >
      {children}
    </div>
  );
};
