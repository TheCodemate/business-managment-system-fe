import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Loading } from "../Loading/Loading";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TechnicalRequestResponseType } from "@/types";
import { AssigneeAvatar } from "./Avatar";
import { useAssignment } from "@/services/mutations";
import { useUsers } from "@/services/queries";

type UserListProps = {
  users: { email: string; userId: string }[]; //has to be typed
  technicalRequestId: string;
};

const UsersList = ({ users, technicalRequestId }: UserListProps) => {
  const { isPending, mutate: assignUser } = useAssignment();

  const assignToRequest = async (
    technicalRequestId: string,
    assigneeId: string
  ) => {
    assignUser({ requestId: technicalRequestId, assignId: assigneeId });
  };

  return (
    <>
      {isPending ? (
        <Loading color="#141414" />
      ) : (
        <div className="">
          <ul className="flex flex-col gap-12 !min-w-[300px] !min-h[600px] !bg-bgPrimary">
            {users.map((user) => {
              return (
                <li
                  onClick={() =>
                    assignToRequest(technicalRequestId, user.userId)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <AssigneeAvatar
                        assignedTo={"8e3fc3a9-836f-46ad-8216-22d419715fa8"}
                        requestId={technicalRequestId}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <p className="text-nowrap">user.email</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

type Props = {
  data: TechnicalRequestResponseType;
  technicalRequestId: string;
};
export const AssignmentAvatar = ({ technicalRequestId, data }: Props) => {
  const { data: users, isPending: isUsersPending } = useUsers();
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative inline-flex reverse justify-start p-1 rounded-md  min-w-[150px] min-h-[36px] grow-1 hover:border-neutral-300  border font-bold text-neutral-300 cursor-pointer">
          {data.assignees.length > 0 ? (
            data.assignees.map((assignee) => (
              <AssigneeAvatar
                assignedTo={assignee.userAccount.userId}
                requestId={technicalRequestId}
              />
            ))
          ) : (
            <PersonAddAlt1Icon />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] min-h[600px] bg-bgPrimary">
        {isUsersPending ? (
          <Loading color="#141414" />
        ) : users ? (
          <UsersList technicalRequestId={technicalRequestId} users={users} />
        ) : (
          "No users available to be assigned"
        )}
      </PopoverContent>
    </Popover>
  );
};
