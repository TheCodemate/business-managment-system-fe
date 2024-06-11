import { Checkbox } from "@/components/ui/checkbox";
import { TechnicalRequestTypeTypes } from "@/types";
import { Control, Controller } from "react-hook-form";
import { DynamicInput } from "./dynamic_input";
import { DefaultValuesType } from "./technical_support_response_form";

const items = [
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

type RequestTypeResponseInputsListProps = {
  requestTypes: TechnicalRequestTypeTypes;
  control: Control<DefaultValuesType>;
};

export const RequestTypeResponseInputsList = ({
  requestTypes,
  control,
}: RequestTypeResponseInputsListProps) => {
  return (
    <div className="flex flex-col gap-4 flex-wrap mb-4 bg-pink-400">
      {requestTypes.map(({ technicalRequestType }) => {
        return (
          <div
            key={technicalRequestType.typeId}
            className="flex flex-col gap-1 items-start"
          >
            <div className="flex items-center gap-2">
              <Checkbox checked={true} disabled />
              <label className="text-sm font-normal">
                {
                  items.find(
                    (item) => item.id === technicalRequestType.typeName
                  )?.label
                }
              </label>
            </div>
            <Controller
              name={technicalRequestType.typeName}
              control={control}
              render={({ field }) => <DynamicInput {...field} />}
            />
          </div>
        );
      })}
    </div>
  );
};
