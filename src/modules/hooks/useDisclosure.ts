import { useState } from "react";

export const useDisclosure = (initialValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue || false);
  const closeHandler = () => {
    setIsOpen(false);
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    closeHandler,
    openHandler,
    toggleHandler,
  };
};
