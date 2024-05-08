import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUsers } from "@/services/queries";
import { Assignees } from "@/types";
import { AssigneesList } from "./components/AssignmentList";
import { Loading } from "../Loading/Loading";
import { UsersToBeAssignedList } from "./components/UsersToBeAssignedList";

type Props = {
  assignees: Assignees;
  technicalRequestId: string;
};

export const AssignmentInput = ({ technicalRequestId, assignees }: Props) => {
  const { data: usersToBeAssigned, isPending: isUsersPending } = useUsers();
  return (
    <Popover>
      <PopoverTrigger className="">
        <div className="relative inline-flex  reverse justify-start p-1 rounded-md  min-w-[150px] min-h-[36px] grow-1 hover:border-neutral-300  border font-bold text-neutral-300 cursor-pointer">
          <AssigneesList
            assigneesList={assignees}
            technicalRequestId={technicalRequestId}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-bgPrimary p-0 py-4">
        {isUsersPending ? (
          <Loading color="#141414" />
        ) : usersToBeAssigned ? (
          <UsersToBeAssignedList
            technicalRequestId={technicalRequestId}
            users={[...usersToBeAssigned].filter(
              (user) =>
                !assignees.find(
                  (assignee) => assignee.userAccount.userId === user.userId
                )
            )}
          />
        ) : (
          "No users available to be assigned"
        )}
      </PopoverContent>
    </Popover>
  );
};
