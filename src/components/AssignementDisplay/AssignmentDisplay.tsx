import { Assignees } from "@/types";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AssigneeAvatar } from "../Avatar/Avatar";

type Props = {
  assignees: Assignees;
  technicalRequestId: string;
};

export const AssignmentDisplay = ({ technicalRequestId, assignees }: Props) => {
  return (
    <div className="relative inline-flex reverse justify-start p-1 rounded-md  min-w-[150px] min-h-[36px] grow-1  border font-bold text-neutral-300">
      {assignees.length > 0 ? (
        assignees.map((assignee) => {
          return (
            <AssigneeAvatar
              key={assignee.userAccount.userId}
              requestId={technicalRequestId}
              userFirstName={assignee.userAccount.firstName}
              userLastName={assignee.userAccount.lastName}
              userId={assignee.userAccount.userId}
              removable={false}
            />
          );
        })
      ) : (
        <PersonAddAlt1Icon />
      )}
    </div>
  );
};
