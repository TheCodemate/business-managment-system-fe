import {
  TechnicalRequestResponseType,
  TechnicalResponseRequestType,
  technicalResponseRequestSchema,
} from "@/types";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputHTMLAttributes, useState } from "react";
import { usePostResponse } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/Dialog/Dialog";
import { delay } from "@/utils/delay";
import { AxiosError } from "axios";

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

type Props = {
  onCloseHandler: () => void;
  request: TechnicalRequestResponseType;
};

const generateInput = (props: DynamicInputProps) => {
  switch (props.name) {
    case "technicalDocumentation":
      return <Input className="bg-bgPrimary" type="file" {...props} />;

    default:
      return <Input className="bg-bgPrimary" type="text" {...props} />;
  }
};

type DynamicInputProps = InputHTMLAttributes<HTMLInputElement>;

const DynamicInput = ({ ...props }: DynamicInputProps) => {
  return generateInput(props);
};

export const TechnicalRequestResponseForm = ({
  onCloseHandler,
  request,
}: Props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [validData, setValidData] = useState<TechnicalResponseRequestType>(
    {} as TechnicalResponseRequestType
  );
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: postResponse, isPending } = usePostResponse();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      technicalRequestId: request.technicalRequestId,
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

  const openConfirmationHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onSubmit = (values: TechnicalResponseRequestType) => {
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
      postResponse({ ...validData });
      await delay(3000, () => closeConfirmationHandler());
      setIsLoading(false);
      closeConfirmationHandler();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div
      className="min-w-[360px] max-w-[1080px] min-h-[300px] xl:min-w-[920px] lg:min-w-[760px] md:min-w-[600px]  bg-alternate rounded-xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {request ? (
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
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600 mb-2">
                Informacje o produkcie
              </h2>
              <p className="">
                <span className="font-bold">Producent</span>
                {` ${request.producer}`}
              </p>
              <p>
                <span className="font-bold">Kod</span>
                {` ${request.productCode}`}
              </p>
              <p>
                <span className="font-bold">Produkt</span>{" "}
                {`${request.collectionName} ${request.color} ${request.finish}
          ${request.format}`}
              </p>
              <p>
                <span className="font-bold">Ilość</span>{" "}
                {`${request.quantity} ${request.unit}`}
              </p>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-lg text-neutral600 mb-2">
                Typ zapytania
              </h2>
              <form id="responseForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 flex-wrap mb-4">
                  {request.requestTypes.map((type) => {
                    return (
                      <div
                        key={type.technicalRequestType.typeId}
                        className="flex flex-col gap-1 items-start"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={true} disabled />
                          <label className="text-sm font-normal">
                            {
                              items.find(
                                (item) =>
                                  item.id === type.technicalRequestType.typeName
                              )?.label
                            }
                          </label>
                        </div>
                        <Controller
                          name={type.technicalRequestType.typeName}
                          control={control}
                          render={({ field }) => <DynamicInput {...field} />}
                        />
                      </div>
                    );
                  })}
                </div>
              </form>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600">
                Dodatkowe uwagi
              </h2>
              <div>
                <p>{request.additionalInfo}</p>
              </div>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600 mb-2">
                Dane kontaktowe
              </h2>
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Imię:</span>
                  <span>{request.contactPerson}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Telefon:</span>
                  <span>{request.contactPersonPhone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Email</span>
                  <span>{request.contactPersonEmail}</span>
                </div>
              </div>
            </section>
            <footer className="flex gap-4 justify-end border-t-neutral-200 border-t border-t-details pt-4">
              <Button
                className="font-bold  text-neutral600"
                variant={"outline"}
                onClick={onCloseHandler}
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                form="responseForm"
                className="text-alternate font-bold"
              >
                Wyślij
              </Button>
            </footer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {isConfirmationOpen && (
                <Dialog
                  onCloseHandler={closeConfirmationHandler}
                  confirmationHandler={confirmationHandler}
                >
                  <Dialog.Content>
                    Zanim prześlesz odpowiedź upewnij się, ze o niczmy nie
                    zapomniałeś. Jezeli uzupelniles wszystkie pola kliknij
                    "Akceptuj"
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Dialog.RejectButton onClick={closeConfirmationHandler} />
                    <Dialog.AcceptButton onClick={confirmationHandler} />
                  </Dialog.Actions>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>There is no data available</p>
      )}
    </div>
  );
};
