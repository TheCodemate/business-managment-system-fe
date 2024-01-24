import { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

export const TableHead = ({ children }: Props) => {
  return (
    <thead className="thead-light text-left h-20 text-sm text-textPrimary font-light">
      <tr>{children}</tr>
    </thead>
  );
};
