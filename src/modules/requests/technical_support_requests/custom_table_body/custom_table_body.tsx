import { useState } from "react";

import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/Modal/Modal";

import { useDisclosure } from "@/modules/hooks/useDisclosure";

import { RequesterDataField } from "./requester_data_field";
import { AssignmentField } from "./assignment_field";
import { ActionsField } from "./actions_field";

import { TechnicalRequestResponseType } from "@/types";
import { RequestPreview } from "../../components/request_preview/request_preview";
import { TechnicalSupportResponseForm } from "../technical_support_response_form/technical_support_response_form";

export const CustomTableBody = ({
  requests,
  isLoading,
}: {
  requests?: TechnicalRequestResponseType[];
  isLoading: boolean;
}) => {
  const {
    isOpen: isPreviewModalOpen,
    openHandler: openPreviewModal,
    closeHandler: closePreviewModal,
  } = useDisclosure();
  const [requestId, setRequestId] = useState("");

  const closePreviewRequestModal = () => {
    closePreviewModal();
  };

  const openPreviewRequestModal = (requestId: string) => {
    setRequestId(requestId);
    openPreviewModal();
  };

  if (!requests || requests.length <= 0) {
    return <p>W tej chwili nie ma zadnych zapytań</p>;
  }

  return (
    <>
      <TableBody>
        {requests.map((request) => {
          return (
            <TableRow
              key={request.technicalRequestId}
              className="bg-bgPrimary rounded-lg h-[120px]"
            >
              <TableCell className="min-w-[120px] max-w-[190px] font-medium">
                {request.technicalRequestId}
              </TableCell>
              <TableCell>
                <RequesterDataField
                  firstName={request.userAccount.firstName}
                  lastName={request.userAccount.lastName}
                />
              </TableCell>
              <TableCell>
                <Timer
                  createdAt={request.createdAt}
                  timeCap={120}
                  resolved={request.resolved}
                  resolvedAt={request.resolvedAt}
                  expiredAt={request.expiresAt}
                />
              </TableCell>
              <TableCell>
                <StatusIndicator
                  status={request.requestStatus.technicalRequestStatusName}
                />
              </TableCell>
              <TableCell className="min-w-[200px] gorw-1">
                <AssignmentField request={request} />
              </TableCell>
              <TableCell>
                <ActionsField
                  clickHandler={() =>
                    openPreviewRequestModal(request.technicalRequestId)
                  }
                  isLoading={isLoading}
                  isResolved={request.resolved}
                />
              </TableCell>

              {/* Warunek nie powoduje dynamicznego renderowani kompnentu. Pomimo ze request.resolved w 3 przypadkach jest false, i tak wyświetla się RequestPreviewModal. W przypadku dodania ! przed request.resolved dla wszystkich kejsow renderuje sie TechnicalRequestResponseForm */}
              {request.resolved ? (
                <Modal
                  key={request.technicalRequestId}
                  isOpen={isPreviewModalOpen}
                  toggleModal={closePreviewRequestModal}
                >
                  <RequestPreview
                    requestId={requestId}
                    onCloseHandler={closePreviewRequestModal}
                  />
                </Modal>
              ) : (
                <Modal
                  key={request.technicalRequestId}
                  isOpen={isPreviewModalOpen}
                  toggleModal={closePreviewRequestModal}
                >
                  <TechnicalSupportResponseForm
                    requestId={requestId}
                    onCloseHandler={closePreviewRequestModal}
                  />
                </Modal>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
