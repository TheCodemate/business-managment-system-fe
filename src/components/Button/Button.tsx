import { icons } from "../../data";
import { IconTypes } from "../../types";

type Props = {
  icon?: IconTypes;
  content: string;
  onClick: () => void;
  variant: "basic" | "search";
};

const variants = {
  basic: `flex px-5 py-3 bg-primary flex-nowrap gap-2`,
  search: "flex px-5 py-1 bg-primary flex-nowrap rounded-full",
};

export const Button = ({ icon = "null", content, onClick, variant }: Props) => {
  return (
    <button className={variants[variant]} onClick={onClick}>
      {icons[icon]}
      <p className="whitespace-nowrap">{content}</p>
    </button>
  );
};
