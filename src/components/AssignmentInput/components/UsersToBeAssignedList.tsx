import { Loading } from "../../Loading/Loading";

import { AssigneeAvatar } from "../../Avatar/Avatar";
import { useAssignment } from "@/services/mutations";
import { UserToBeAssignedType } from "@/types";

type UserListProps = {
  users: UserToBeAssignedType[];
  technicalRequestId: string;
};

export const UsersToBeAssignedList = ({
  users,
  technicalRequestId,
}: UserListProps) => {
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
