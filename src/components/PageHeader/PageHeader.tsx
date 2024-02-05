import { Button } from "../Buttons/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { IconTypes } from "../../types";

type Props = {
  title: string;
  content: string;
  buttonContent: string;
  icon?: IconTypes;
  onClick: () => void;
};

export const PageHeader = ({
  content,
  title,
  buttonContent,
  icon,
  onClick,
}: Props) => {
  return (
    <header className="flex flex-col gap-5 justify-center bg-bgPrimary p-12 sm:flex-row sm:justify-between sm:gap-10">
      <div className="flex flex-col justify-start sm:max-w-[60%] ">
        <div className="flex items-center mb-8">
          <PersonSearchIcon />
          <h2 className="text-fontPrimary text-2xl text font-bold">{title}</h2>
        </div>
        <p className="text-fontPrimary text-sm">{content}</p>
      </div>
      <div className="flex items-center">
        <Button
          variant="basic"
          onClick={onClick}
          icon={icon}
          content={buttonContent}
        />
      </div>
    </header>
  );
};
