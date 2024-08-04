import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  headersList: string[];
};

export const CustomTableHeader = ({ headersList }: Props) => {
  return (
    <TableHeader>
      <TableRow>
        {headersList.map((headerTitle) => (
          <TableHead key={headerTitle}>{headerTitle}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
