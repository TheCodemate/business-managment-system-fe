import { useState } from "react";
import {
  Controller,
  useForm,
  Form,
  Control,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePostResponse } from "@/services/mutations";
import { Checkbox } from "@/components/ui/checkbox";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Dialog } from "@/components/Dialog/Dialog";
import { Loading } from "@/components/Loading/Loading";
import { FilePreview } from "@/components/FilePreview/FilePreview";
import { Modal } from "@/components/Modal/Modal";

import { technicalResponseRequestSchema } from "@/types";
import { throwError } from "@/utils/throwError";
import { useTechnicalRequestById } from "../../use_technical_request_by_id";
import { CustomFormSection } from "../../components/custom_form_section";
import { ResponseFormFooter } from "./technical_support_response_form_footer";
import { ProductInfo } from "../../components/product_info";
import { CustomerContactInfoField } from "../../components/customer_contact_info_field";
import { RequestTypeResponseInputsList } from "./request_type_response_inputs_list";

type Props = {
  onCloseHandler: () => void;
  requestId: string;
};

export type DefaultValuesType = {
  technicalRequestId: string;
  price: string;
  purchasePrice: string;
  availability: string;
  productionDate: string;
  substitute: string;
  technicalDocumentation: string;
  technicalResponseText: string;
};

export const TechnicalSupportResponseForm = ({
  onCloseHandler,
  requestId,
}: Props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [validData, setValidData] = useState<DefaultValuesType | null>(null);

  const { data: technicalRequestById, isPending: isRequestByIdPending } =
    useTechnicalRequestById(requestId);

  const [isLoading, setIsLoading] = useState(false);
  const { mutate: postResponse } = usePostResponse();
  const { control, reset } = useForm<DefaultValuesType>({
    defaultValues: {
      technicalRequestId: requestId,
      price: "",
      purchasePrice: "",
      availability: "",
      productionDate: "",
      substitute: "",
      technicalDocumentation: "",
      technicalResponseText: "",
    },
    resolver: zodResolver(technicalResponseRequestSchema),
  });

  const closeConfirmationHandler = () => {
    onCloseHandler();
    setIsConfirmationOpen(false);
  };

  const toggleConfirmationHandler = () => {
    setIsConfirmationOpen((prev) => !prev);
  };

  const openConfirmationHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onSubmit = (values: FieldValues) => {
    try {
      setValidData(values);
      openConfirmationHandler();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error(
        "Unexpected error ocurred while submitting new request. Try again later."
      );
    }
  };

  const confirmationHandler = async () => {
    try {
      setIsLoading(true);

      if (validData) {
        postResponse(validData);
      }
      setIsLoading(false);
      closeConfirmationHandler();
      reset();
    } catch (error) {
      throwError({ error, message: "Unexpected error" });
    }
  };

  if (isRequestByIdPending) {
    return (
      <div>
        <Loading color="#141414" />
      </div>
    );
  }

  if (!technicalRequestById) {
    return <p>There is no data available</p>;
  }

  return (
    <div
      className="min-w-[360px] max-w-[1080px] min-h-[300px] xl:min-w-[920px] lg:min-w-[760px] md:min-w-[600px]  bg-alternate rounded-xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <header className="flex bg-neutral100 px-6 py-3 justify-between items-center rounded-xl">
          <div className="flex gap-2 items-center justify-center">
            <span className="text-sm font-bold text-neutral600">
              Zapytanie nr {technicalRequestById.technicalRequestId}
            </span>

            <StatusIndicator
              status={
                technicalRequestById.requestStatus.technicalRequestStatusName
              }
            />
          </div>
          <CloseButton onClick={onCloseHandler} />
        </header>

        <div className="flex flex-col p-8">
          <CustomFormSection headerTitle="Informacje o produkcie">
            <ProductInfo
              collectionName={technicalRequestById.collectionName}
              color={technicalRequestById.color}
              finish={technicalRequestById.finish}
              format={technicalRequestById.format}
              producer={technicalRequestById.producer}
              productCode={technicalRequestById.productCode}
              quantity={technicalRequestById.quantity}
              unit={technicalRequestById.unit}
            />
          </CustomFormSection>
          <CustomFormSection headerTitle="Typ zapytania">
            <Form
              id="responseForm"
              onSubmit={({ data }) => {
                onSubmit(data);
              }}
              control={control}
            >
              <RequestTypeResponseInputsList
                control={control}
                requestTypes={technicalRequestById.requestTypes}
              />
            </Form>
          </CustomFormSection>
          <CustomFormSection
            shouldRender={!!technicalRequestById.additionalInfo}
            headerTitle="Dodatkowe uwagi"
          >
            <p>{technicalRequestById.additionalInfo}</p>
          </CustomFormSection>

          <CustomFormSection
            shouldRender={technicalRequestById.technicalRequestFiles.length > 0}
            headerTitle="Załącz pliki"
          >
            <FilePreview files={technicalRequestById.technicalRequestFiles} />
          </CustomFormSection>

          <CustomFormSection headerTitle="Dane kontaktowe">
            <CustomerContactInfoField
              contactPerson={technicalRequestById.contactPerson}
              contactPersonEmail={technicalRequestById.contactPersonEmail}
              contactPersonPhone={technicalRequestById.contactPersonPhone}
            />
          </CustomFormSection>
          <CustomFormSection headerTitle="Dane kontaktowe">
            <div className="flex justify-between w-full items-center"></div>
          </CustomFormSection>
          <ResponseFormFooter
            formName="responseForm"
            closeHandler={closeConfirmationHandler}
          />

          <Modal
            isOpen={isConfirmationOpen}
            toggleModal={toggleConfirmationHandler}
          >
            <Dialog
              isLoading={isLoading}
              acceptHandler={confirmationHandler}
              rejectHandler={toggleConfirmationHandler}
              acceptButtonText="Wyślij"
              rejectButtonText="Sprawdź"
              bodyText="Czy na pewno zawarłeś wszystkie odpowiedzi?"
              headerText="Zatwierdź odpowiedź"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};
