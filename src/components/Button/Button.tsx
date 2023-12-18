import React, { ReactElement } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

type Props = {
  icon: string;
  content: string;
  onClick: () => void;
};

const icons: Record<string, ReactElement> = {
  add: <PersonAddAlt1Icon />,
};

export const Button = ({ icon, content, onClick }: Props) => {
  return (
    <button
      className="flex px-5 py-3 bg-primary flex-nowrap gap-2"
      onClick={onClick}
    >
      {icons[icon]}
      <p className="whitespace-nowrap">{content}</p>
    </button>
  );
};
