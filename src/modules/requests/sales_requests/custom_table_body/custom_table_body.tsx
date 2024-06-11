import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TechnicalRequestResponseType } from "@/types";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { CustomerField } from "./customer_field";
import { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/Buttons/Button";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import { AssignmentField } from "./assignment_field";
import { RequestPreview } from "../../components/request_preview/request_preview";

export const CustomTableBody = ({
  requests,
}: {
  requests?: TechnicalRequestResponseType[];
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
    return <p>Nie masz zadnych zapytań</p>;
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
              <TableCell className="min-w-[120px]">
                {request.technicalRequestId}
              </TableCell>
              <TableCell className="min-w-[120px]">
                <CustomerField
                  contactPerson={request.contactPerson}
                  contactPersonEmail={request.contactPersonEmail}
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Timer
                  expiredAt={request.expiresAt}
                  createdAt={request.createdAt}
                  resolved={request.resolved}
                  resolvedAt={request.resolvedAt}
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <StatusIndicator
                  status={request.requestStatus.technicalRequestStatusName}
                />
              </TableCell>
              <TableCell className="min-w-[200px] items-center justify-center grow-1 h-full">
                <AssignmentField request={request} />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Button
                  onClick={() => {
                    openPreviewRequestModal(request.technicalRequestId);
                  }}
                  content="Podgląd"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <Modal isOpen={isPreviewModalOpen} toggleModal={closePreviewRequestModal}>
        <RequestPreview
          requestId={requestId}
          onCloseHandler={closePreviewRequestModal}
        />
      </Modal>
    </>
  );
};
