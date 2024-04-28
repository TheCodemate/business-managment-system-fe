import { Button } from "@/components/Buttons/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/Modal/Modal";
import { useState } from "react";
import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";

import { TechnicalRequestResponseType } from "@/types";
import { TechnicalRequestResponseForm } from "@/components/Forms/TechnicalRequestResponseForm/TechnicalRequestResponseForm";
import { useTechnicalRequests } from "@/services/queries";
import { Loading } from "@/components/Loading/Loading";
import { AssignmentInput } from "@/components/AssignmentInput/AssignmentInput";
import { AssigneeAvatar } from "@/components/Avatar/Avatar";

export const SupportTeamRequests = () => {
  const [isAddRequestFormOpen, setIsAddRequestFormOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [request, setRequest] = useState<TechnicalRequestResponseType>();

  const { data: requests, isPending } = useTechnicalRequests();

  const closeModal = () => {
    setIsAddRequestFormOpen(false);
  };

  const closePreviewRequestModal = () => {
    setIsPreviewModalOpen(false);
  };

  const openPreviewRequestModal = (
    requestDetail: TechnicalRequestResponseType
  ) => {
    setRequest(requestDetail);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Lista wszystkich zapytań zgłoszonych przez zespół sprzedazowy."
        title="Panel zapytań"
        buttonVisible={false}
      />

      <main className="flex flex-col justify-stretch w-full h-full">
        <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
          <TableCaption>A list of your all requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Od</TableHead>
              <TableHead>Czas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="flex justify-center items-center">
                Przydzielone do
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests ? (
              requests.map((request) => {
                return (
                  <TableRow className="bg-bgPrimary rounded-lg h-[120px]">
                    <TableCell className="min-w-[120px] max-w-[190px] font-medium">
                      {request.technicalRequestId}
                    </TableCell>
                    <TableCell>
                      {request.userId ? (
                        <>
                          <p className="font-bold">{`${request.userId}`}</p>
                        </>
                      ) : (
                        <p>Data not provided</p>
                      )}
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
                        status={
                          request.requestStatus.technicalRequestStatusName
                        }
                      />
                    </TableCell>
                    <TableCell className="min-w-[200px] gorw-1">
                      <div className="flex justify-center w-full">
                        {request.resolved ? (
                          <AssigneeAvatar
                            requestId={request.technicalRequestId}
                            assignedTo={
                              request.technicalRequestResolvedBy.userAccountId
                            }
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
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={
                          request.requestStatus.technicalRequestStatusName ===
                          "resolved"
                        }
                        isLoading={isPending}
                        onClick={() => openPreviewRequestModal(request)}
                        content="Rozwiąż"
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <Loading color="#141414" />
            )}
          </TableBody>
        </Table>
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeModal}>
        <AddRequestForm closeHandler={closeModal} />
      </Modal>

      <Modal isOpen={isPreviewModalOpen} toggleModal={closePreviewRequestModal}>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <TechnicalRequestResponseForm
            request={request}
            onCloseHandler={closePreviewRequestModal}
          />
        </div>
      </Modal>
    </div>
  );
};
