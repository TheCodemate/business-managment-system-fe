import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  isOpen: boolean;
  toggleModal: (e: MouseEvent) => void;
};

export const Modal = ({ children, isOpen, toggleModal }: Props) => {
  if (!isOpen) {
    return null;
  }

  const handleToggler = (e: MouseEvent) => {
    toggleModal(e);
  };

  return (
    <div
      className="fixed top-0 left-0 z-10  bg-opacity-90 bg-textPrimary w-full h-full overflow-y-auto"
      onClick={(e) => handleToggler(e)}
    >
      {children}
    </div>
  );
};
