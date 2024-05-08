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
      ) : users.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {users.map((user) => {
            return (
              <li
                className="hover:bg-details hover:cursor-pointer px-4 py-2 transition-all"
                onClick={() => assignToRequest(technicalRequestId, user.userId)}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <AssigneeAvatar
                      removable={false}
                      assignedTo={user.email}
                      requestId={technicalRequestId}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-nowrap">{user.email}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="pxs-4">Brak uytkowników do przypisania</p>
      )}
    </>
  );
};
