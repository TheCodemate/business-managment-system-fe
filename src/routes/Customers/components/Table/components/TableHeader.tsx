type Props = {
  children: string;
};

export const TableHeader = ({ children }: Props) => {
  return (
    <th className="py-10 px-3 pb-6 min-w-min whitespace-nowrap" scope="col">
      {children}
    </th>
  );
};
