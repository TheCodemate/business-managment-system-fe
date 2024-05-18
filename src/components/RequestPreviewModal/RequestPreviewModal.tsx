import { CloseButton } from "../Buttons/CloseButton";
import { Loading } from "../Loading/Loading";
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";
import { Checkbox } from "../ui/checkbox";
import { useTechnicalRequestById } from "@/services/queries";

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
  timeCount: Date;
  requestId: string;
};

export const RequestPreviewModal = ({ onCloseHandler, requestId }: Props) => {
  const { data: request, isPending } = useTechnicalRequestById(requestId);

  if (isPending) {
    return <Loading color={"#141414"} />;
  }

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
                <span className="font-bold">Producent:</span>
                {` ${request.producer}`}
              </p>
              <p>
                <span className="font-bold">Kod:</span>
                {` ${request.productCode}`}
              </p>
              <p>
                <span className="font-bold">Produkt:</span>
                {` ${request.collectionName} ${request.color} ${request.finish}
          ${request.format}`}
              </p>
              <p>
                <span className="font-bold">Ilość:</span>{" "}
                {` ${request.quantity} ${request.unit}`}
              </p>
            </section>
            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-lg text-neutral600 mb-2">
                Typ zapytania
              </h2>
              <div className="flex flex-col text-sm gap-4 flex-wrap mb-4">
                {request.requestTypes.map((requestType) => (
                  <div
                    key={requestType.technicalRequestType.typeName}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex gap-2">
                      <Checkbox checked={true} disabled />
                      <label className="text-sm font-normal">
                        {
                          items.find(
                            (item) =>
                              item.id ===
                              requestType.technicalRequestType.typeName
                          )?.label
                        }
                      </label>
                    </div>
                    <div className="text-confirmAlternate font-bold mb-2">
                      {request.technicalRequestResponse
                        ? request.technicalRequestResponse[
                            requestType.technicalRequestType.typeName
                          ]
                        : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {request.technicalRequestFiles.length > 0 ? (
              <section className="flex flex-col mb-4">
                <h2 className="font-bold text-xl text-neutral600">
                  Załączone pliki
                </h2>
                <div>
                  <ul className="flex">
                    {request.technicalRequestFiles.map((file) => (
                      <li className="hover:cursor-pointer" key={file.fileUrl}>
                        <img
                          height="100px"
                          width="50px"
                          src={file.fileUrl}
                          alt=""
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}

            <section className="flex flex-col mb-4">
              <h2 className="font-bold text-xl text-neutral600">
                Dodatkowe uwagi
              </h2>
              <div>
                <p>
                  {request.additionalInfo
                    ? request.additionalInfo
                    : "Brak uwag"}
                </p>
              </div>
            </section>
            <section className="flex flex-col">
              <h2 className="font-bold text-xl text-neutral600 mb-2">
                Dane kontaktowe
              </h2>
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Imię:</span>
                  <span>
                    {request.contactPerson
                      ? request.contactPerson
                      : "Nie podano"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Telefon:</span>
                  <span>
                    {request.contactPersonPhone
                      ? request.contactPersonPhone
                      : "Nie podano"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm mb-1">Email</span>
                  <span>
                    {request.contactPersonEmail
                      ? request.contactPersonEmail
                      : "Nie podano"}
                  </span>
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
