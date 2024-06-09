import { useTechnicalRequestById } from "../../use_technical_request_by_id";

import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { FilePreview } from "@/components/FilePreview/FilePreview";
import { Loading } from "@/components/Loading/Loading";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { ProductInfo } from "../product_info";
import { CustomFormSection } from "../custom_form_section";
import { SelectedRequestTypesPreview } from "./selected_request_types_preview";
import { CustomerContactInfoField } from "../customer_contact_info_field";

type Props = {
  onCloseHandler: () => void;
  requestId: string;
};

export const RequestPreview = ({ onCloseHandler, requestId }: Props) => {
  const { data: request, isPending } = useTechnicalRequestById(requestId);

  if (isPending) {
    return <Loading color={"#141414"} />;
  }

  if (!request) {
    return <p>Brak danych</p>;
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
              Zapytanie nr {request.technicalRequestId}
            </span>

            <StatusIndicator
              status={request.requestStatus.technicalRequestStatusName}
            />
          </div>
          <CloseButton onClick={onCloseHandler} />
        </header>

        <div className="flex flex-col p-8">
          <CustomFormSection headerTitle="Informacje o produkcie">
            <ProductInfo
              collectionName={request.collectionName}
              color={request.color}
              finish={request.finish}
              format={request.format}
              producer={request.producer}
              productCode={request.productCode}
              quantity={request.quantity}
              unit={request.unit}
            />
          </CustomFormSection>

          <CustomFormSection headerTitle="Typ zapytania">
            <SelectedRequestTypesPreview
              requestTypes={request.requestTypes}
              technicalRequestResponse={request.technicalRequestResponse}
            />
          </CustomFormSection>

          <CustomFormSection
            headerTitle="Załączone pliki"
            shouldRender={request.technicalRequestFiles.length > 0}
          >
            <FilePreview files={request.technicalRequestFiles} />
          </CustomFormSection>

          <CustomFormSection
            headerTitle="Dodatkowe uwagi"
            shouldRender={!!request.additionalInfo}
          >
            <p>{request.additionalInfo}</p>
          </CustomFormSection>

          <CustomFormSection headerTitle="Dane kontaktowe">
            <CustomerContactInfoField
              contactPerson={request.contactPerson}
              contactPersonEmail={request.contactPersonEmail}
              contactPersonPhone={request.contactPersonPhone}
            />
          </CustomFormSection>
        </div>
      </div>
    </div>
  );
};
