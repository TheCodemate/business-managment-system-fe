import React from "react";
import { AssignmentInput } from "@/components/AssignmentInput/AssignmentInput";
import { AssigneeAvatar } from "@/components/Avatar/Avatar";
import { TechnicalRequestResponseType } from "@/types";

type Props = {
  request: TechnicalRequestResponseType;
};

export const AssignmentField = ({ request }: Props) => {
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
        <AssignmentInput
          technicalRequestId={request.technicalRequestId}
          assignees={request.assignees}
        />
      )}
    </div>
  );
};
