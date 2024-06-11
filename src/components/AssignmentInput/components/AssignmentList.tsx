import { AssigneeAvatar } from "@/components/Avatar/Avatar";
import { Assignees } from "@/types";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

type AssignmentListProps = {
  assigneesList: Assignees;
  technicalRequestId: string;
};

export const AssigneesList = ({
  assigneesList,
  technicalRequestId,
}: AssignmentListProps) => {
  return assigneesList.length > 0 ? (
    assigneesList.map((assignee) => (
      <AssigneeAvatar
        userFirstName={assignee.userAccount.firstName}
        userLastName={assignee.userAccount.lastName}
        userId={assignee.userAccount.userId}
        requestId={technicalRequestId}
      />
    ))
  ) : (
    <PersonAddAlt1Icon />
  );
};
