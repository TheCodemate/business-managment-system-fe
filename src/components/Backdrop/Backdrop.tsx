import { ReactElement, useState } from "react";

type OpenHandlerType = () => void;

type Props = {
  children: (isOpenHandler: OpenHandlerType) => ReactElement;
};

export const Backdrop = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  if (isOpen) return null;

  return (
    <div
      onClick={toggleHandler}
      className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-backdropDimmed"
    >
      {children(toggleHandler)}
    </div>
  );
};
