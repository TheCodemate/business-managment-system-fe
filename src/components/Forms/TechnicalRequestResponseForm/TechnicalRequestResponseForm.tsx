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

//has to be removed when API connected and swaped for real items props
const items = [
  {
    id: "price",
    label: "Cena brutto",
  },
  {
    id: "purchasePrice",
    label: "Cena netto zakupu",
  },
  {
    id: "availability",
    label: "Dostępność",
  },
  {
    id: "productionDate",
    label: "Termin produkcji",
  },
  {
    id: "substitute",
    label: "Porzukiwanie zamiennika",
  },
  {
    id: "technicalDocumentation",
    label: "Karta techniczna",
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
      return <Input type="file" {...props} />;

    default:
      return <Input className="bg-transparent" type="text" {...props} />;
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
          ${request.height}x${request.width}x${request.thickness}`}
              </p>
              <p>
                <span className="font-bold">Ilość</span> {`${request.quantity}`}
              </p>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-lg text-neutral600 mb-2">
                Typ zapytania
              </h2>
              <form id="responseForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 flex-wrap mb-4">
                  {request.requestTypes.map((type) => {
                    return (
                      <div className="flex flex-col gap-1 items-start">
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
                Additional details
              </h2>
              <div>
                <p>{request.additionalInfo}</p>
              </div>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600 mb-2">
                Client contact details
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
            <footer className="flex gap-4 justify-end border-t-neutral-200 border-t pt-4">
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
                  <Dialog.Actions>
                    <Dialog.AcceptButton onClick={confirmationHandler} />
                    {/* <Dialog.RejectButton /> */}
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
