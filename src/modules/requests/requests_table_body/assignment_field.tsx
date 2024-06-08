import { AssignmentDisplay } from "@/components/AssignementDisplay/AssignmentDisplay";
import { AssigneeAvatar } from "@/components/Avatar/Avatar";
import { TechnicalRequestResponseType } from "@/types";

export const AssignmentField = ({
  request,
}: {
  request: TechnicalRequestResponseType;
}) => {
  return (
    <div className="flex justify-center w-full">
      {request.resolved ? (
        <AssigneeAvatar
          requestId={request.technicalRequestId}
          userFirstName={
            request.technicalRequestResolvedBy.userAccount.firstName
          }
          userLastName={request.technicalRequestResolvedBy.userAccount.lastName}
          userId={request.technicalRequestResolvedBy.userAccount.userAccountId}
          removable={false}
          size={"large"}
        />
      ) : (
        <AssignmentDisplay
          technicalRequestId={request.technicalRequestId}
          assignees={request.assignees}
        />
      )}
    </div>
  );
};
