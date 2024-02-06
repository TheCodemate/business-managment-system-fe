import React from "react";
import { CustomerType } from "../../types";
import { TableRow, TableCell } from "../../components/Table/Table";

type CustomerCardProps = {
  customer: CustomerType;
  onClickHandler: (customer: CustomerType) => void;
};

export const CustomerCard = ({
  customer,
  onClickHandler,
}: CustomerCardProps) => {
  return (
    <TableRow
      key={customer.customerId}
      className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-105 transition-all"
      onClick={() => onClickHandler(customer)}
    >
      <TableCell className="p-4">{customer.companyName}</TableCell>
      <TableCell className="p-4">{customer.vatNo}</TableCell>
      <TableCell className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-12 h-12 overflow-hidden">
            <img
              width={"100%"}
              height={"100%"}
              src="https://avataaars.io/?avatarStyle=Transparent&topType=Eyepatch&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
          </div>
          <div className="flex flex-col">
            <span>{`${customer.contactPerson.firstName} ${customer.contactPerson.lastName}`}</span>
            <span>{customer.contactPerson.email}</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};
