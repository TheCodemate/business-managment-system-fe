import { CustomerType } from "../../../../types";
import { Tabs } from "../../../../components/Tabs/Tabs";

type Props = {
  data: CustomerType;
};

export const CustomerDetails = ({ data }: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col justify-stretch bg-bgPrimary rounded-lg min-w-[340px] max-w-[1020px] min-h-[600px]"
    >
      <header className="p-8">
        <h2 className="text-3xl font-bold">{data?.companyName}</h2>
      </header>
      <Tabs />
    </div>
  );
};
