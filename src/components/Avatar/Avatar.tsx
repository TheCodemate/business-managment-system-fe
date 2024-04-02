import { AssignmentAvatar } from "./AssignmentAvatar";
import { getInitials } from "@/utils/getInitials";

type Props = {
  assignedTo?: string;
  url?: string;
};

export const Avatar = ({ assignedTo, url }: Props) => {
  return (
    <div className="flex justify-center items-center rounded-[100%] w-14 h-14 bg-sky-50 border-sky-500 border-4 font-semibold text-sky-500 cursor-pointer text-2xl">
      {url ? url : assignedTo ? getInitials(assignedTo) : <AssignmentAvatar />}
    </div>
  );
};
