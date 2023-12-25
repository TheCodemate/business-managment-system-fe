import { NavLink } from "react-router-dom";

import { Customer } from "../../../../../types";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export type TableRowProps = {
  customer: Customer;
  id: number;
};

export const TableRow = ({ customer, id }: TableRowProps) => {
  const { last_name, email, phone, vatNo } = customer;

  return (
    <tr
      key={id}
      className="w-full bg-bgPrimary text-textPrimary rounded-xl overflow-hidden"
    >
      <td className="py-6 px-3">{id}</td>
      <td className="py-6 px-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-12 h-12 overflow-hidden">
            {/* has to be replaced with avatarLink incoming from API */}
            <img
              width={"100%"}
              height={"100%"}
              src="https://avataaars.io/?avatarStyle=Transparent&topType=Eyepatch&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
          </div>
          <div className="flex flex-col">
            <span>{last_name}</span>
            <span>{email}</span>
          </div>
        </div>
      </td>
      <td className="py-6 px-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-12 h-12 overflow-hidden">
            {/* has to be replaced with avatarLink incoming from API */}
            <img
              width={"100%"}
              height={"100%"}
              src="https://avataaars.io/?avatarStyle=Transparent&topType=Eyepatch&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
          </div>
          <div className="flex flex-col">
            <span>{last_name}</span>
            <span>{email}</span>
          </div>
        </div>
      </td>
      <td className="py-6 px-3">{vatNo}</td>
      <td className="py-6 px-3">{phone}</td>
      <td className="py-6 px-3">
        <div className="flex">
          <div className="flex gap-4 items-center justify-center">
            <NavLink
              to={`edit/${customer.id}`}
              className=" flex items-center justify-center rounded-full w-8 h-8 bg-bluePrimary text-blueSecondary cursor-pointer"
            >
              <EditIcon />
            </NavLink>
            <button className="rounded-full w-8 h-8 bg-redPrimary text-redSecondary cursor-pointer">
              <CloseIcon />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
