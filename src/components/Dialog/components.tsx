import { CloseButton } from "../Buttons/CloseButton";
import { useDialogContext } from "./context";

type CloseButtonProps = {
  onClick: () => void;
};

export const CloseDialogButton = ({ onClick }: CloseButtonProps) => {
  const context = useDialogContext();
  return <CloseButton onClick={onClick} />;
};

type ContentProps = {
  children: string;
};

export const Content = ({ children }: ContentProps) => {
  const context = useDialogContext();
  return <p className="w-full mb-3">{children}</p>;
};

type TitleProps = {
  children: string;
};

export const Title = ({ children }: TitleProps) => {
  const context = useDialogContext();
  return <h2 className="w-full flex-1 mb-6 text-xl font-bold">{children}</h2>;
};
