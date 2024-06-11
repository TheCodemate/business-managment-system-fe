import { Checkbox } from "@/components/ui/checkbox";
import {
  TechnicalRequestTypeTypes,
  TechnicalResponseRequestType,
} from "@/types";

const labels = [
  {
    id: "price",
    label: "Cena detaliczna PLN (brutto)",
  },
  {
    id: "purchasePrice",
    label: "Cena zakupu PLN (netto z transportem)",
  },
  {
    id: "availability",
    label: "Chcę wiedzieć czy produkt jest dostępny w fabryce",
  },
  {
    id: "productionDate",
    label: "Sprawdzam kiedy produkt będzie produkowany",
  },
  {
    id: "substitute",
    label: "Poszukuję zamiennika",
  },
  {
    id: "technicalDocumentation",
    label: "Potrzebuję kartę techniczną",
  },
  {
    id: "technicalResponseText",
    label: "Odpowiedź",
  },
] as const;

type SelectedRequestTypesPreview = {
  requestTypes: TechnicalRequestTypeTypes;
  technicalRequestResponse: TechnicalResponseRequestType;
};

export const SelectedRequestTypesPreview = ({
  requestTypes,
  technicalRequestResponse,
}: SelectedRequestTypesPreview) => {
  return (
    <div className="flex flex-col text-sm gap-4 flex-wrap mb-4">
      {requestTypes.map((requestType) => (
        <div
          key={requestType.technicalRequestType.typeName}
          className="flex flex-col gap-1"
        >
          <div className="flex gap-2">
            <Checkbox checked={true} disabled />
            <label className="text-sm font-normal">
              {
                labels.find(
                  (label) =>
                    label.id === requestType.technicalRequestType.typeName
                )?.label
              }
            </label>
          </div>
          <div className="text-confirmAlternate font-bold mb-2">
            {technicalRequestResponse
              ? technicalRequestResponse[
                  requestType.technicalRequestType.typeName
                ]
              : null}
          </div>
        </div>
      ))}
    </div>
  );
};
