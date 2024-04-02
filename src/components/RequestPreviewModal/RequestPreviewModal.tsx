import { ResponseRequestType } from "@/types";
import { CloseButton } from "../Buttons/CloseButton";
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";
import { Checkbox } from "../ui/checkbox";

//has to be removed when API connected and swaped for real items props
const items = [
  {
    id: "price",
    label: "Cena brutto",
  },
  {
    id: "priceNet",
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
] as const;

type Props = {
  onCloseHandler: () => void;
  timeCount: Date;
  request: ResponseRequestType | null;
};

export const RequestPreviewModal = ({ onCloseHandler, request }: Props) => {
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
                Zapytanie nr {request.requestId}
              </span>

              <StatusIndicator status={request.status} />
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
              <div className="flex gap-2 flex-wrap mb-4">
                {request.requestTypes.map((type) => (
                  <div className="flex gap-1 items-center">
                    <Checkbox checked={true} disabled />
                    <label className="text-sm font-normal">
                      {items.find((item) => item.id === type)?.label}
                    </label>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600">
                Additional details
              </h2>
              <div>
                <p>{request.additionalInfo}</p>
              </div>
            </section>
            <section className="flex flex-col">
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
                  <span>{request.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Email</span>
                  <span>{request.email}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p>There is no data available</p>
      )}
    </div>
  );
};
